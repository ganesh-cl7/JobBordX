import React, { useState } from 'react';
import axios from 'axios';

const JobForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    experience: '',
    skills: '',
    type: '',
    salary: '',
    remote: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/jobs', formData);
      alert('✅ Job submitted successfully!');
      setFormData({
        title: '',
        company: '',
        location: '',
        description: '',
        experience: '',
        skills: '',
        type: '',
        salary: '',
        remote: false
      });
    } catch (err) {
      console.error('❌ Submission error:', err);
      alert('Failed to submit job. Check console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Post a Job</h2>
      {['title', 'company', 'location', 'experience', 'skills', 'type', 'salary'].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field]}
          onChange={handleChange}
          required={['title', 'company', 'location', 'description'].includes(field)}
          style={inputStyle}
        />
      ))}
      <textarea
        name="description"
        placeholder="Job Description"
        value={formData.description}
        onChange={handleChange}
        required
        style={textareaStyle}
      />
      <label style={{ marginBottom: '10px' }}>
        <input
          type="checkbox"
          name="remote"
          checked={formData.remote}
          onChange={handleChange}
        /> Remote
      </label>
      <button type="submit" style={buttonStyle}>Submit</button>
    </form>
  );
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '400px',
  margin: '20px auto',
  padding: '20px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9'
};

const inputStyle = {
  marginBottom: '10px',
  padding: '8px',
  fontSize: '16px'
};

const textareaStyle = {
  marginBottom: '10px',
  padding: '8px',
  fontSize: '16px',
  height: '100px'
};

const buttonStyle = {
  padding: '10px',
  fontSize: '16px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default JobForm;
