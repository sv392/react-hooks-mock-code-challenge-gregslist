import React, { useState, useEffect } from "react";
import ListingCard from "./ListingCard";
import Search from "./Search";

function ListingsContainer() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await fetch("http://localhost:6001/listings");
      const data = await response.json();
      setListings(data);
      setFilteredListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  const handleDeleteListing = async (id) => {
    try {
      await fetch(`http://localhost:6001/listings/${id}`, {
        method: "DELETE",
      });
      fetchListings();
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = listings.filter((listing) =>
      listing.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredListings(filtered);
  };

  return (
    <main>
      <Search onSearch={handleSearch} />
      <ul className="cards">
        {filteredListings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            onDelete={handleDeleteListing}
          />
        ))}
      </ul>
    </main>
  );
}

export default ListingsContainer;
