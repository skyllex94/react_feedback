import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as deleteIcon } from "../assets/svg/deleteIcon.svg";
import bedIcon from "../assets/svg/bedIcon.svg";
import bathtubIcon from "../assets/svg/bathtubIcon.svg";

function ListingItem({ listing, id }) {
  // Regulart expression for adding commas every 3 numbers
  //   const regex = /\B(?=(\d{3})+(?!\d))/g;
  //   const regPrice = listing.regularPrice
  //     .toString()
  //     .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <li className="categoryListing">
      <Link
        to={`/category/${listing.type}/${id}`}
        className="categoryListingLink"
      >
        <img
          src={listing.imageUrls[0]}
          alt={listing.name}
          className="categoryListingImg"
        />
        <div className="categoryListingDetails">
          <p className="categoryListingLocation">{listing.location}</p>
          <p className="categoryListingName">{listing.name}</p>

          <p className="categoryListingPrice">
            $
            {listing.offer
              ? listing.regularPrice.toLocaleString()
              : listing.regularPrice.toLocaleString()}
          </p>
        </div>
      </Link>
    </li>
  );
}

export default ListingItem;
