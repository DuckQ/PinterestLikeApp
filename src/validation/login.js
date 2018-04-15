export default function validateInput(data) {
  let errors = {};

  if (!data.identifier) {
    errors.identifier = 'This field is required';
  };

  if (!data.password) {
    errors.password = 'This field is required';
  };

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };
  
  return {
    errors,
    isValid: isEmpty(errors)
  }
}