import React from 'react';
import { Link } from 'react-router-dom';

const ImageItem = ({id, _id, image_url}) => (
  <div className={'grid-item'} >
    <div className="post-wrapper">
      <div className="image-container">
        <img src={image_url} alt=""/> 
      </div>
      <Link to={`/post/${id || _id}`}><div className="test"></div></Link>
      <a href={image_url}><div className="text-block">Original image</div></a>
    </div>
  </div>
);

export default ImageItem;
