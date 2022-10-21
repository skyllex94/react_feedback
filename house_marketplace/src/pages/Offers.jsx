import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useState } from "react";
import ListingItem from "./ListingItem";

function Offers() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingRef = collection(db, "listings");

        // Create a query
        const q = query(
          listingRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc", limit(10))
        );

        // Execute query
        const querySnap = await getDocs(q);
        const listings = [];

        // For each query element that is returned
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error("Could not retrieve listings.");
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="category">
      <header className="pageHeader">Offers</header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <main>
          <ul className="categoryListings">
            {listings.map((curr) => (
              <ListingItem listing={curr.data} id={curr.id} key={curr.id} />
            ))}
          </ul>
        </main>
      ) : (
        <p>No current Offers</p>
      )}
    </div>
  );
}

export default Offers;
