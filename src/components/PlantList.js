import React from 'react';

const PlantList = ({ plants }) => {
  return (
    <div className="plant-list">
      {plants.map((plant) => (
        <div key={plant._id} className="plant-card">
          {plant.imageUrl && (
            <img src={plant.imageUrl} alt={plant.name} className="plant-image" />
          )}
          <h3>{plant.name}</h3>
          <p><strong>Species:</strong> {plant.species}</p>
          <p><strong>Region:</strong> {plant.region}</p>
          <p><strong>Description:</strong> {plant.description}</p>
          <p><strong>Uses:</strong> {plant.uses?.join(', ')}</p>
          <p><strong>Traditional Notes:</strong> {plant.tradition}</p>
          <p><strong>Commercial Uses:</strong> {plant.commercial}</p>
          {plant.citation && (
            <p><a href={plant.citation} target="_blank" rel="noreferrer">📚 View Citation</a></p>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlantList;

