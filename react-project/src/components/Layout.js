// Card.js
/*import React from 'react';

const Card = ({ city, description, imageUrl }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt={city} />
      <div className="card-body">
        <h5 className="card-title">{city}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
};

export default Card;
*/

import React from "react";
//import Footer from "./FooterCard";
//import Header from "./HeaderCard";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
const Layout = ({ children, city, des}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="des" content={des} />
        <title>{city}</title>
      </Helmet>
      <main style={{ minHeight: "70vh"}}>
        <Toaster />

        {children}
      </main>
    </div>
  );
};

Layout.defaultProps = {
  city: 'default',
  dess: 'dummy text'
};

export default Layout;