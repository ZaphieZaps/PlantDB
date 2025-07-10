// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddPlantForm from './components/AddPlantForm';
import PlantList from './components/PlantList';
import bg from './assets/bg-plants.png'; // Your custom background image
import './App.css';

function App() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/plants');
        setPlants(res.data);
      } catch (error) {
        console.error('🌱 Error fetching plants:', error);
      }
    };

    fetchPlants();
  }, []);

  const handleAdd = (newPlant) => {
    setPlants((prev) => [...prev, newPlant]);
  };

  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <header>
        <div className="header-overlay">
          <h1>🌿 South African PlantDB</h1>
          <p className="subtitle">
            A digital archive of traditional botanical knowledge
          </p>
        </div>
      </header>

      <main>
        <AddPlantForm onAdd={handleAdd} />
        <PlantList plants={plants} />
      </main>
    </div>
  );
}

export default App;
