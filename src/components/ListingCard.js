import React, { useState } from "react";

function ListingCard({ listing, onDelete }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <li className="card">
      <div className="image">
        <span className="price">$0</span>
        <img src={listing.image} alt={listing.description} />
      </div>
      <div className="details">
        <button
          className={`emoji-button favorite ${isFavorite ? "active" : ""}`}
          onClick={handleFavoriteToggle}
        >
          {isFavorite ? "★" : "☆"}
        </button>
        <strong>{listing.description}</strong>
        <span> · {listing.location}</span>
        <button
          className="emoji-button delete"
          onClick={() => onDelete(listing.id)}
        >
          🗑
        </button>
      </div>
    </li>
  );
}

export default ListingCard;
