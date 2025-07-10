// src/components/AddPlantForm.js
import React, { useState } from 'react';
import './AddPlantForm.css';

function AddPlantForm() {
  const [formData, setFormData] = useState({
    plantName: '',
    species: '',
    description: '',
    region: '',
    medicinalUses: '',
    traditionalKnowledge: '',
    commercialApplications: '',
    citationLink: '',
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    try {
      const response = await fetch('http://localhost:5000/api/plants', {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        alert('🌱 Plant added successfully!');
        // Clear form
        setFormData({
          plantName: '',
          species: '',
          description: '',
          region: '',
          medicinalUses: '',
          traditionalKnowledge: '',
          commercialApplications: '',
          citationLink: '',
          image: null,
        });
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      console.error('❌ Submission error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <form className="plant-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="form-group">
        <label>🌿 Plant Name</label>
        <input type="text" name="plantName" value={formData.plantName} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>🔬 Species</label>
        <input type="text" name="species" value={formData.species} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>📝 Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>📍 Region (e.g. Eastern Cape)</label>
        <input type="text" name="region" value={formData.region} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>🌱 Medicinal Uses (comma-separated)</label>
        <input type="text" name="medicinalUses" value={formData.medicinalUses} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>📚 Traditional Knowledge Notes</label>
        <textarea name="traditionalKnowledge" value={formData.traditionalKnowledge} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>🏢 Commercial Applications</label>
        <textarea name="commercialApplications" value={formData.commercialApplications} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>🔗 Citation Link (optional)</label>
        <input type="text" name="citationLink" value={formData.citationLink} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>📸 Upload Image</label>
        <input type="file" name="image" onChange={handleFileChange} />
      </div>

      <button type="submit">➕ Add Plant</button>
    </form>
  );
}

export default AddPlantForm;


