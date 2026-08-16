import React, { useState } from 'react';

// value: 1-10. Each star represents 2 points; left half = odd, right half = even.
const HalfStarRating = ({ value = 0, onChange, disabled = false }) => {
  const [hoverValue, setHoverValue] = useState(0);
  const display = hoverValue || value;

  const handleMove = (e, starIndex) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeftHalf = x < rect.width / 2;
    setHoverValue(starIndex * 2 - (isLeftHalf ? 1 : 0));
  };

  const handleClick = (e, starIndex) => {
    if (disabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeftHalf = x < rect.width / 2;
    const newValue = starIndex * 2 - (isLeftHalf ? 1 : 0);
    onChange(newValue);
  };

  const fillPercent = (starIndex) => {
    const starFloor = (starIndex - 1) * 2; // points before this star
    const withinStar = display - starFloor; // 0,1,2 typically
    if (withinStar <= 0) return 0;
    if (withinStar === 1) return 50;
    return 100;
  };

  return (
    <span
      className={`half-star-rating ${disabled ? 'disabled' : ''}`}
      onMouseLeave={() => setHoverValue(0)}
    >
      {[1, 2, 3, 4, 5].map((starIndex) => (
        <span
          key={starIndex}
          className="half-star"
          onMouseMove={(e) => handleMove(e, starIndex)}
          onClick={(e) => handleClick(e, starIndex)}
        >
          <span className="half-star-back">★</span>
          <span
            className="half-star-front"
            style={{ width: `${fillPercent(starIndex)}%` }}
          >
            ★
          </span>
        </span>
      ))}
      <span className="half-star-value">{display}/10</span>
    </span>
  );
};

export default HalfStarRating;