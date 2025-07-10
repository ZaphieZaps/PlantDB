import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddPlantForm from './components/AddPlantForm';
import PlantList from './components/PlantList';
import bg from './assets/bg-plants.png'; // ✅ your background image

function App() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const fetchPlants = async () => {
      const res = await axios.get('http://localhost:5000/api/plants');
      setPlants(res.data);
    };
    fetchPlants();
  }, []);

  const handleAdd = (newPlant) => {
    setPlants([...plants, newPlant]);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        padding: '2rem',
      }}
    >
      <h1 style={{ textAlign: 'center', color: '#2e7d32' }}>
        🌿 South African PlantDB
      </h1>
      <AddPlantForm onAdd={handleAdd} />
      <PlantList plants={plants} />
    </div>
  );
}

export default App;



