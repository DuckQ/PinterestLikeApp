export const loadImages = (images) => ({
  type: 'LOAD_IMAGES',
  images
});

export const startLoadImages = () => {
  return (dispatch) => {
      return fetch('https://pinterestlikeapp-server.herokuapp.com/api/images')
      .then(response => response.json())
      .then(response => {
        const allImages = [];
        // shuffle images
        // response.images
        // .map((a) => ({sort: Math.random(), value: a}))
        // .sort((a, b) => a.sort - b.sort)
        // .map(obj => {
        //   allImages.push(obj.value)
        // });
         response.images.map(obj => {
          allImages.push(obj)
        });
        dispatch(loadImages(allImages));
      })
  }
}

// load images with selected tag from search input on user request
export const startLoadImagesWithTag = (tag) => {
  return (dispatch) => {
    return fetch(`https://pinterestlikeapp-server.herokuapp.com/api/images/tag/${tag}`)
    .then(response => response.json())
    .then(response => {
      const imagesWithTag =[];
      // shuffle images
      // response.images
      // .map((a) => ({sort: Math.random(), value: a}))
      // .sort((a, b) => a.sort - b.sort)
      // .map(obj => {
      //   imagesWithTag.push(obj.value)
      // });
       response.images.map(obj => {
        imagesWithTag.push(obj)
      });
      dispatch(loadImages(imagesWithTag));
    })
  }
}

// load single image info for <PostDetailsPage /> component
export const loadSingleIMage = (id) => {
  return (dispatch) => {
    return fetch(`https://pinterestlikeapp-server.herokuapp.com/api/images/${id}`)
  }
}