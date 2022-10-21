import React from "react";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { useRef } from "react";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../firebase.config";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function CreateListing() {
  const [loading, setLoading] = useState(false);
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    offer: false,
    regularPrice: 0,
    discountPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountPrice,
    images,
    latitude,
    longitude,
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (discountPrice >= regularPrice) {
      setLoading(false);
      toast.error("Discounted price needs to be less than regular price");
      return;
    }
    if (images.length > 6) {
      setLoading(false);
      toast.error("Maximum 6 images, please");
      return;
    }

    let geolocation = {};
    let location;
    let addr = address.toString();

    // if (geolocationEnabled) {
    //   const response = await fetch(
    //     `https://maps.googleapis.com/maps/api/geocode/address=${addr}&key=AIzaSyDdu9GXw7M7xxZuK0V-tM1SszbeNHM2Tbc`
    //   );

    //   console.log(response);
    //   const data = await response.json();
    //   console.log(data);
    // } else {
    // geolocation.lat = latitude;
    // geolocation.lng = longitude;
    // location = address;
    // }

    // Store image in firebase

    // const storeImage = async (image) => {
    //   return new Promise((resolve, reject) => {
    //     const storage = getStorage();
    //     const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

    //     const storageRef = ref(storage, "images/" + fileName);

    //     const uploadTask = uploadBytesResumable(storageRef, image);

    //     uploadTask.on(
    //       "state_changed",
    //       (snapshot) => {
    //         const progress =
    //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //         console.log("Upload is " + progress + "% done");
    //         switch (snapshot.state) {
    //           case "paused":
    //             console.log("Upload is paused");
    //             break;
    //           case "running":
    //             console.log("Upload is running");
    //             break;
    //         }
    //       },
    //       (error) => {
    //         reject(error);
    //       },
    //       () => {
    //         // Handle successful uploads on complete
    //         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //           resolve(downloadURL);
    //         });
    //       }
    //     );
    //   });
    // };

    // const imgUrls = await Promise.all(
    //   [...images].map((image) => storeImage(image))
    // ).catch(() => {
    //   setLoading(false);
    //   toast.error("Errors not uploaded");
    //   return;
    // });

    const formDataCopy = {
      ...formData,
      timestamp: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "listings"), formDataCopy);

    toast.success("Listing added");
    setLoading(false);
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  };

  const onMutate = (e) => {
    let bool = null;

    if (e.target.value === "true") {
      bool = true;
    }
    if (e.target.value === "false") {
      bool = false;
    }

    if (e.target.files === "file") {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: bool ?? e.target.value,
      }));
    }
  };

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate("/signin");
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="profile">
      <header>
        <p className="pageHeader">Create a Listing</p>
      </header>

      <form onSubmit={onSubmit}>
        <label className="formLabel">Sell/Rent</label>
        <div className="formButtons">
          <button
            type="button"
            className={type === "sale" ? "formButtonActive" : "formButton"}
            id="type"
            value="sale"
            onClick={onMutate}
          >
            Sell
          </button>
          <button
            type="button"
            className={type === "rent" ? "formButtonActive" : "formButton"}
            id="type"
            value="rent"
            onClick={onMutate}
          >
            Rent
          </button>
        </div>

        <label className="formLabel">Name</label>

        <input
          type="text"
          className="formInputName"
          id="name"
          value={name}
          onChange={onMutate}
          required
        />

        <div className="formRooms flex">
          <div>
            <label className="formLabel">Bedrooms</label>
            <input
              className="formInputSmall"
              type="number"
              id="berdooms"
              value={bedrooms}
              onChange={onMutate}
              required
            />
          </div>
          <div>
            <label className="formLabel">Bathrooms</label>
            <input
              className="formInputSmall"
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={onMutate}
              required
            />
          </div>
        </div>

        <label className="formLabel">Parking spot</label>
        <div className="formButtons">
          <button
            className={parking ? "formButtonActive" : "formButton"}
            type="button"
            id="parking"
            value={true}
            onClick={onMutate}
          >
            Yes
          </button>
          <button
            className={
              !parking && parking !== null ? "formButtonActive" : "formButton"
            }
            type="button"
            id="parking"
            value={false}
            onClick={onMutate}
          >
            No
          </button>
        </div>

        <label className="formLabel"> Furnished</label>
        <div className="formButtons">
          <button
            className={furnished ? "formButtonActive" : "formButton"}
            type="button"
            id="furnished"
            value={true}
            onClick={onMutate}
          >
            Yes
          </button>
          <button
            className={
              !furnished && furnished !== null
                ? "formButtonActive"
                : "formButton"
            }
            type="button"
            id="furnished"
            value={false}
            onClick={onMutate}
          >
            No
          </button>
        </div>

        <label className="formLabel">Address</label>
        <textarea
          className="formInputAddress"
          type="text"
          id="address"
          value={address}
          onChange={onMutate}
          required
        />

        {!geolocationEnabled && (
          <div className="formLatLng flex">
            <div>
              <label className="formLabel">Latitude</label>
              <input
                className="formInputSmall"
                type="number"
                id="latitude"
                value={latitude}
                onChange={onMutate}
                required
              />
            </div>
            <div>
              <label className="formLabel">Longitude</label>
              <input
                className="formInputSmall"
                type="number"
                id="longitude"
                value={longitude}
                onChange={onMutate}
                required
              />
            </div>
          </div>
        )}

        <label className="formLabel">Offer</label>
        <div className="formButtons">
          <button
            className={offer ? "formButtonActive" : "formButton"}
            type="button"
            id="offer"
            value={true}
            onClick={onMutate}
          >
            Yes
          </button>
          <button
            className={
              !offer && offer !== null ? "formButtonActive" : "formButton"
            }
            type="button"
            id="offer"
            value={false}
            onClick={onMutate}
          >
            No
          </button>
        </div>

        <label className="formLabel">Regular Price</label>
        <div className="formPriceDiv">
          <input
            type="number"
            className="formInputSmall"
            id="regularPrice"
            value={regularPrice}
            onChange={onMutate}
            required
          />
          {type === "rent" && <p className="formPriceText">$ per month</p>}
        </div>

        {offer && (
          <React.Fragment>
            <label className="formLabel">Discounted Price</label>
            <input
              type="number"
              className="formInputSmall"
              id="discountPrice"
              value={discountPrice}
              onChange={onMutate}
              required
            />
          </React.Fragment>
        )}

        <label className="formLabel">Images</label>
        <p className="imagesInfo">First image to cover (max 6).</p>
        <input
          type="file"
          className="formInputFile"
          id="images"
          accept=".jpg,.png,.jpeg"
          multiple
          max="6"
          onChange={onMutate}
          required
        />

        <button className="primaryButton createListingButton" type="submit">
          Create Listing
        </button>
      </form>
    </div>
  );
}

export default CreateListing;
