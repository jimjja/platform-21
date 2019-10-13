function randomNumber(maxNumber = 0) {
  return Math.floor(Math.random() * maxNumber + 1);
}

export { randomNumber };
