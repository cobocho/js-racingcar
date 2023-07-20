const { MOVE_STANDARD } = require('../constants.js');
const { getRandomNumber } = require('../utils.js');

class Car {
  #name;

  #distance;

  constructor(name) {
    this.#name = name;
    this.#distance = 1;
  }

  get name() {
    return this.#name;
  }

  get distance() {
    return this.#distance;
  }

  isMoved() {
    const randomNumber = getRandomNumber();
    const isMoved = randomNumber > MOVE_STANDARD;
    if (isMoved) return true;
    return false;
  }

  move() {
    this.#distance += 1;
  }
}

module.exports = Car;
