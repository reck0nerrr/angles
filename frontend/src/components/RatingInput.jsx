import React, { useState, useEffect } from 'react';
import { submitRating } from '../api/ratingApi';
import HalfStarRating from './HalfStarRating';

const RatingInput = ({ albumId, trackId, initialRate = 0, initialComment = '', onRated }) => {
  const [rate, setRate] = useState(initialRate);
  const [comment, setComment] = useState(initialComment);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => { setRate(initialRate); }, [initialRate]);
  useEffect(() => { setComment(initialComment); }, [initialComment]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rate < 1) {
      setError('Pick a rating from 1 to 10 first');
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const result = await submitRating({ albumId, trackId, rate, comment });
      if (onRated) onRated(result);
    } catch (err) {
      setError(err.message || 'Could not submit rating');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="rating-input" onSubmit={handleSubmit}>
      <HalfStarRating value={rate} onChange={setRate} disabled={submitting} />
      <textarea
        className="rating-comment"
        placeholder="Add a comment (optional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={2}
      />
      {error && <p className="rating-error">{error}</p>}
      <button type="submit" className="rating-submit-btn" disabled={submitting}>
        {submitting ? 'Saving…' : 'Save Rating'}
      </button>
    </form>
  );
};

export default RatingInput;