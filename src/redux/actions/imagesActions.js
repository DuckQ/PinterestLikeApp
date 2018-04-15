export const loadImages = (images) => ({
  type: 'LOAD_IMAGES',
  images
});

export const startLoadImages = () => {
  return (dispatch) => {
      return fetch('http://localhost:3000/api/images')
      .then(response => response.json())
      .then(response => {
        const allImages = [];
        response.images.map(obj => {
          allImages.push(obj)
        });
        dispatch(loadImages(allImages));
      })
  }
}

export const startLoadImagesWithTag = (tag) => {
  return (dispatch) => {
    return fetch(`http://localhost:3000/api/images/tag/${tag}`)
    .then(response => response.json())
    .then(response => {
      const imagesWithTag =[];
      response.images.map(obj => {
        imagesWithTag.push(obj)
      });
      dispatch(loadImages(imagesWithTag));
    })
  }
}


