import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'; 

const PageNotFound = () => (
  <Fragment>
    404 — <Link to="/">Go Home</Link>
  </Fragment>
);

export default PageNotFound;