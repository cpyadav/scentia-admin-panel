export const hasNullOrUndefinedOrEmpty = (array) => array.some(value => {
    return value === undefined || value === null || value === '';
  });

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? 'Invalid email address' : undefined
