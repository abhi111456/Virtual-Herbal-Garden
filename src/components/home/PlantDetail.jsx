import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import * as THREE from "three";
import { Card, CardContent } from "../ui/card";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const PlantDetail = () => {
  const location = useLocation();
  const { plant } = location.state || {};
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Load favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("favoritePlants")) || [];
    } catch {
      return [];
    }
  });

  // Load comments from localStorage
  const [comments, setComments] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("plantComments")) || [];
    } catch {
      return [];
    }
  });

  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (!plant || !containerRef.current) return;

    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(500, 500);
    containerRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      plant.image,
      (texture) => {
        const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
        const geometry = new THREE.BoxGeometry(2, 2, 0.1);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const animate = () => {
          mesh.rotation.x = rotation.y * 0.01;
          mesh.rotation.y = rotation.x * 0.01;
          renderer.render(scene, camera);
          requestAnimationFrame(animate);
        };
        animate();
      },
      undefined,
      (error) => console.error("Error loading image:", error)
    );

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [plant, rotation]);

  if (!plant) {
    return <p className="text-center text-gray-500">No plant details available.</p>;
  }

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    setRotation({
      x: (clientX - left - width / 2) / 15,
      y: (clientY - top - height / 2) / 15,
    });
  };

  const handleMouseLeave = () => setRotation({ x: 0, y: 0 });

  // Handle adding/removing from favorites
  const toggleFavorite = () => {
    let updatedFavorites;
    if (favorites.some((fav) => fav.id === plant.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== plant.id);
    } else {
      updatedFavorites = [...favorites, plant];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favoritePlants", JSON.stringify(updatedFavorites));
  };

  // Handle adding a new comment
  const addComment = () => {
    if (!newComment.trim()) return;
    const updatedComments = [...comments, { text: newComment, id: Date.now() }];
    setComments(updatedComments);
    localStorage.setItem("plantComments", JSON.stringify(updatedComments));
    setNewComment("");
  };

  return (
    <div className="p-6 text-center mt-12 flex flex-col items-center justify-center min-h-screen">
      <Card className="max-w-4xl w-full p-6 shadow-lg rounded-xl border border-gray-200 flex flex-col items-center">
        <h1 className="text-5xl font-bold text-green-700 mb-4">{plant.name}</h1>

        {/* Favorite Button */}
        <button onClick={toggleFavorite} className="text-red-500 text-2xl mb-2">
          {favorites.some((fav) => fav.id === plant.id) ? <FaHeart /> : <FaRegHeart />}
        </button>

        {/* Three.js Container */}
        <div
          className="relative mx-auto w-full max-w-2xl rounded-xl overflow-hidden flex justify-center"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ height: "500px" }}
        ></div>

        <CardContent className="text-center">
          <p className="text-lg text-gray-600 mt-6 leading-relaxed">{plant.description}</p>
        </CardContent>

        {/* Medicinal Uses Section */}
        <div className="text-left mt-8 p-6 bg-green-50 rounded-xl border border-green-200 shadow-md">
          <h2 className="text-2xl font-semibold text-green-800">Medicinal Uses</h2>
          <p className="text-gray-700 mt-4 leading-relaxed">
            {plant.medicinalUses || "This plant has various traditional medicinal uses."}
          </p>
        </div>

        {/* Comments Section */}
        <div className="mt-8 w-full max-w-2xl p-6 bg-gray-100 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800">Comments</h2>
          <div className="mt-4 space-y-2">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="p-3 bg-white rounded-md shadow">
                  {comment.text}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-l-md"
              placeholder="Add a comment..."
            />
            <button onClick={addComment} className="bg-green-600 text-white p-2 rounded-r-md">
              Post
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}; 
export default PlantDetail;
