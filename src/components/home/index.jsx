import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import Input from "../ui/Input";
import { motion } from "framer-motion";
import Footer from "./Footer";
import Chatbot from "./Chatbot";

const UNSPLASH_API_KEY = "LlUYQn6NuuAWvMZ1IC1gAXfIZjFVAOVGRNPJf3oI4Zc";
const BASE_URL = "https://api.unsplash.com/search/photos";

const categories = ["All", "Medicinal", "Edible", "Aromatic", "Rare"];

const Home = () => {
  const [search, setSearch] = useState("");
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}?query=plants&per_page=26&client_id=${UNSPLASH_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        const images = data.results.map((item) => ({
          name: item.alt_description || "Unknown Plant",
          image: item.urls.regular,
          description: item.description || "No description available",
          category: categories[Math.floor(Math.random() * categories.length)], // Random category assignment
        }));
        setPlants(images);
        setFilteredPlants(images);
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  useEffect(() => {
    const searchResults = plants.filter((plant) =>
      plant.name.toLowerCase().includes(search.toLowerCase())
    );

    const categoryResults =
      selectedCategory === "All"
        ? searchResults
        : searchResults.filter((plant) => plant.category === selectedCategory);

    setFilteredPlants(categoryResults);
  }, [search, selectedCategory, plants]);

  return (
    <div className="p-6 text-center mt-12">
      <h1 className="text-4xl font-bold text-green-700">Virtual Garden</h1>
      <p className="text-gray-600 mb-6">Explore beautiful plants in your digital garden.</p>

      {/* Search Bar */}
      <Input
        type="text"
        placeholder="Search plants..."
        className="w-1/2 mx-auto border p-2 rounded-lg"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category Filters */}
      <div className="flex justify-center mt-4 space-x-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === category ? "bg-green-700 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Plant Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {filteredPlants.map((plant, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            onClick={() => navigate(`/plant/${index}`, { state: { plant } })}
          >
            <Card>
              <CardContent className="p-4">
                <img
                  src={plant.image}
                  alt={plant.name}
                  className="rounded-lg w-full h-40 object-cover cursor-pointer"
                />
                <h2 className="text-lg font-semibold mt-2">{plant.name}</h2>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
        <Chatbot/>
      <Footer />
    </div>
  );
};

export default Home;
