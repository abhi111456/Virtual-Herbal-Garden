// import React, { useState, useEffect } from "react";
// import { Card, CardContent } from "../ui/card"; // Ensure correct import

// const GardenPlanner = () => {
//   const [garden, setGarden] = useState([]);

//   // Load garden from local storage when the component mounts
//   useEffect(() => {
//     const storedGarden = JSON.parse(localStorage.getItem("garden")) || [];
//     setGarden(storedGarden);
//   }, []);

//   const addToGarden = (plant) => {
//     if (!garden.some((p) => p.id === plant.id)) {
//       const updatedGarden = [...garden, plant];
//       setGarden(updatedGarden);
//       localStorage.setItem("garden", JSON.stringify(updatedGarden));
//     }
//   };

//   const removeFromGarden = (id) => {
//     const updatedGarden = garden.filter((plant) => plant.id !== id);
//     setGarden(updatedGarden);
//     localStorage.setItem("garden", JSON.stringify(updatedGarden));
//   };

//   return (
//     <div className="p-6 text-center">
//       <h2 className="text-2xl font-bold text-green-700">My Garden</h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
//         {garden.length > 0 ? (
//           garden.map((plant) => (
//             <Card key={plant.id} className="p-4 border rounded-lg">
//               <img
//                 src={plant.image}
//                 alt={plant.name}
//                 className="rounded-lg w-full h-40 object-cover"
//               />
//               <CardContent>
//                 <h3 className="mt-2">{plant.name}</h3>
//                 <button
//                   onClick={() => removeFromGarden(plant.id)}
//                   className="text-red-500 mt-2"
//                 >
//                   Remove
//                 </button>
//               </CardContent>
//             </Card>
//           ))
//         ) : (
//           <p className="text-gray-500">No plants in your garden.</p>
//         )}
//       </div>

//       {/* Sample Add Plant Button */}
//       <button
//         className="mt-4 p-2 bg-green-500 text-white rounded"
//         onClick={() =>
//           addToGarden({ id: 1, name: "Rose", image: "/rose.jpg" })
//         }
//       >
//         Add Rose to Garden
//       </button>
//     </div>
//   );
// };

// export default GardenPlanner;
