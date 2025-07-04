import React from 'react';

const PlantList = ({ plants }) => {
  return (
    <div className="plant-list">
      <h2>🌱 Your Plants</h2>
      {plants.map((plant, index) => (
        <div className="plant-card" key={index}>
          {plant.image && (
            <img src={`http://localhost:5000${plant.image}`} alt={plant.name} className="plant-image" />
          )}
          <h3>{plant.name} — <em>{plant.species}</em></h3>
          <p>{plant.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PlantList;

