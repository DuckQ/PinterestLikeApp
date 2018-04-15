import React from 'react';
import { Link } from 'react-router-dom';

const ImageItem = ({id, _id, image_url}) => (
  <div className={'grid-item'} >
    <Link to={`/post/${id || _id}`}>
      <div className="image-wrapper" ><img src={image_url} alt=""/></div>
    </Link>
  </div>
);

export default ImageItem;
