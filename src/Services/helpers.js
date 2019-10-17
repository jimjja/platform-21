function randomNumber(maxNumber = 0) {
  return Math.floor(Math.random() * maxNumber + 1);
}

function debounce(callback, wait) {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  };
}

export { randomNumber, debounce };
