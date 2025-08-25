import React, { useEffect, useState } from 'react';
import axios from 'axios';

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/jobs');
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`);
      setJobs(jobs.filter(job => job.id !== id));
    } catch (err) {
      console.error('Error deleting job:', err);
      alert('Failed to delete job');
    }
  };

  return (
    <ul style={{ maxWidth: '600px', margin: '20px auto', padding: '0' }}>
      {jobs.map((job) => (
        <li key={job.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', backgroundColor: '#fff' }}>
          <strong>{job.title}</strong> — ₹{job.salary || 'N/A'}
          <br />
          <span>{job.company} • {job.location} • {job.type}</span>
          <br />
          <span>{job.remote ? 'Remote' : 'Onsite'}</span>
          <br />
          <button onClick={() => handleDelete(job.id)} style={{ marginTop: '8px', padding: '6px 12px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px' }}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default JobList;
