export const updateImages = (images) => ({
  type: 'UPDATE_IMAGES',
  images
});

export const startUpdateImages = (quantity, position) => {
  return (dispatch, getState) => {
    const { images } = getState();
    const partOfImages = [];
    if (quantity === null ) {
      const slicedArray = images.slice(position, position+5);
      partOfImages.push(...slicedArray);
    } else {
      const slicedArray = images.slice(position, quantity);
      partOfImages.push(...slicedArray);
    }
    dispatch(updateImages(partOfImages))
  }
}

export const clearImages = () => ({
  type: 'CLEAR_IMAGES'
});

export const updatePosition = () => ({
  type: 'UPDATE_POSITION'
});

export const setDefaultPosition = () => ({
  type: 'SET_DEFAULT_POSITION'
});

