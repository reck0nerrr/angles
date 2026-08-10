import React, { useState } from 'react';
import { submitRating } from '../api/ratingApi';
import HalfStarRating from './HalfStarRating';

const StarRating = ({ trackId, albumId, initialRate = 0 }) => {
  const [rate, setRate] = useState(initialRate);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = async (newValue) => {
    const previous = rate;
    setRate(newValue);
    setSaving(true);
    setError(null);
    try {
      await submitRating({ trackId, albumId, rate: newValue });
    } catch (err) {
      setRate(previous);
      setError('Could not save rating');
    } finally {
      setSaving(false);
    }
  };

  return (
    <span className={saving ? 'saving' : ''} title={error || ''}>
      <HalfStarRating value={rate} onChange={handleChange} disabled={saving} />
    </span>
  );
};

export default StarRating;