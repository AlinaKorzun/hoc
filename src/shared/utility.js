export const updatedObject = (oldObject, updatedProps) => {
  return {
      ...oldObject,
      ...updatedProps
  }
};

export const checkValidity = (value, rules) => {
    let isValid = true;

    if (!rules) {
        return true;
    }
    if (rules.required) {
        isValid = value.trim() !== '' && isValid
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.minLength && isValid
    }
    if (rules.isEmail) {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        isValid = pattern.test(value) && isValid
    }
    return isValid
};