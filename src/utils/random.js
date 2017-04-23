export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function pickRandom(collection) {
  const i = randomInt(0, collection.length);
  return collection[i];
}
