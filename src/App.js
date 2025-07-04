import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddPlantForm from './components/AddPlantForm';
import PlantList from './components/PlantList';
import './App.css';

const App = () => {
  const [plants, setPlants] = useState([]);

  const fetchPlants = async () => {
    try {
      const res = await axios.get('http://localhost:5000/plants');
      setPlants(res.data);
    } catch (err) {
      console.error('Error fetching plants:', err.message);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  return (
    <div className="app">
      <AddPlantForm onAdd={fetchPlants} />
      <PlantList plants={plants} />
    </div>
  );
};

export default App;


