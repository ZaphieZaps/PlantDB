import React, { useState } from 'react';
import axios from 'axios';

const AddPlantForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [description, setDescription] = useState('');
  const [region, setRegion] = useState('');
  const [uses, setUses] = useState('');
  const [tradition, setTradition] = useState('');
  const [commercial, setCommercial] = useState('');
  const [citation, setCitation] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('species', species);
    formData.append('description', description);
    formData.append('region', region);
    formData.append('uses', uses); // will be split in backend
    formData.append('tradition', tradition);
    formData.append('commercial', commercial);
    formData.append('citation', citation);
    if (file) formData.append('image', file);

    try {
      const res = await axios.post('http://localhost:5000/api/plants', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      onAdd(res.data);

      // Reset form fields
      setName('');
      setSpecies('');
      setDescription('');
      setRegion('');
      setUses('');
      setTradition('');
      setCommercial('');
      setCitation('');
      setFile(null);

      alert('🌿 Plant added successfully!');
    } catch (err) {
      console.error('Error adding plant:', err);
      alert('Something went wrong while adding the plant.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Plant Name" value={name} onChange={e => setName(e.target.value)} required />
      <input type="text" placeholder="Species" value={species} onChange={e => setSpecies(e.target.value)} required />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input type="text" placeholder="Region (e.g. Eastern Cape)" value={region} onChange={e => setRegion(e.target.value)} />
      <input type="text" placeholder="Medicinal Uses (comma-separated)" value={uses} onChange={e => setUses(e.target.value)} />
      <textarea placeholder="Traditional Knowledge / Notes" value={tradition} onChange={e => setTradition(e.target.value)} />
      <input type="text" placeholder="Commercial Applications" value={commercial} onChange={e => setCommercial(e.target.value)} />
      <input type="url" placeholder="Citation Link (optional)" value={citation} onChange={e => setCitation(e.target.value)} />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button type="submit">Add Plant</button>
    </form>
  );
};

export default AddPlantForm;


