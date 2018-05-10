import React from 'react';
import { Link } from 'react-router-dom';

const ImageItem = ({id, _id, image_url, onClick, savedImage}) => {

  const imageSaved = (
    <div className="pushpin-block saved">
      <div className="pushpin-text">saved!</div>
    </div>
  );

  const imageNotSaved = (
    <div className="pushpin-block" onClick={onClick}>
      <div className="pushpin"><img src="/files/pushpin.svg" alt=""/><img src="/src/files/pushpin.svg" alt=""/></div>
      <div className="pushpin-text">save</div>
    </div>
  );

  return (
    <div className={'grid-item'} >
      <div className="post-wrapper">
        <div className="image-container">
          <img src={image_url} alt=""/> 
        </div>
        <Link to={`/post/${id || _id}`}><div className="post-link"></div></Link>
        <a href={image_url} target="_blank"><div className="text-block">Original image</div></a>
        {savedImage !== undefined && !!savedImage ? imageSaved : imageNotSaved}
      </div>
    </div>
  )

};

export default ImageItem;
