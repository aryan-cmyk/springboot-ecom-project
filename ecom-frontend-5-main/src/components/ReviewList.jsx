import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewList = ({ productId, refresh }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:9090/api/reviews/${productId}`);
      setReviews(res.data);
    } catch (err) {
      console.error('Failed to fetch reviews', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId, refresh]);

  return (
    <div className="mt-4">
      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((r, i) => (
          <div key={r.id || i} className="p-3 mb-3 border rounded bg-white shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <strong>{r.username}</strong>
              <span className="text-warning fw-bold">{r.rating} ★</span>
            </div>
            <p className="mb-1">{r.comment}</p>
            <small className="text-muted">{new Date(r.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
