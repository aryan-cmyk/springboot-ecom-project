import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

const ProductReviewsPage = () => {
  const { productId } = useParams();
  const [refresh, setRefresh] = useState(false);

  const refreshReviews = () => setRefresh(prev => !prev);

  return (
    <div className="container mt-4">
      <h3>Reviews for Product #{productId}</h3>
      <ReviewForm productId={productId} onReviewAdded={refreshReviews} />
      <ReviewList productId={productId} refresh={refresh} />
    </div>
  );
};

export default ProductReviewsPage;
