import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div>
      <h2>About us</h2>
      <Link
        to={{
          pathname: "/",
          search: "-fromAbout",
        }}
      >
        Go back to Main Page
      </Link>
    </div>
  );
}

export default About;
