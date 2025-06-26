import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ productId, onReviewAdded }) => {
  const [form, setForm] = useState({
    username: '',
    comment: '',
    rating: 5,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const submitReview = async () => {
    setError('');
    setLoading(true);
    try {
      await axios.post(`http://localhost:9090/api/reviews/${productId}`, form);
      setForm({ username: '', comment: '', rating: 5 });
      onReviewAdded();
    } catch (err) {
      setError('Failed to submit review.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 mb-4 border rounded shadow-sm bg-light">
      <h5 className="mb-3">Leave a Review</h5>
      <input
        name="username"
        placeholder="Your name"
        className="form-control mb-2"
        value={form.username}
        onChange={handleChange}
      />
      <textarea
        name="comment"
        placeholder="Your comment"
        className="form-control mb-2"
        rows={3}
        value={form.comment}
        onChange={handleChange}
      />
      <select
        name="rating"
        className="form-select mb-3"
        value={form.rating}
        onChange={handleChange}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <option key={star} value={star}>
            {star} Star{star > 1 && 's'}
          </option>
        ))}
      </select>
      {error && <div className="text-danger mb-2">{error}</div>}
      <button
        className="btn"
        style={{
          padding: '0.75rem 2rem',
          fontSize: '1rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={submitReview}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </div>
  );
};

export default ReviewForm;
