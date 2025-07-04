import React, { useState } from 'react';
import axios from 'axios';

const AddPlantForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    description: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('species', formData.species);
      data.append('description', formData.description);
      if (formData.image) {
        data.append('image', formData.image);
      }

      await axios.post('http://localhost:5000/plants', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      onAdd();
      setFormData({ name: '', species: '', description: '', image: null });
    } catch (err) {
      console.error('❌ Error adding plant:', err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="form">
      <h2>🌸 Add a Plant</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="species"
        placeholder="Species"
        value={formData.species}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
      />
      <button type="submit">Add Plant</button>
    </form>
  );
};

export default AddPlantForm;

