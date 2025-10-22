class Car {
  #name;
  #position;

  constructor(name) {
    this.#name = name;
    this.#position = 0;
  }

  move() {
    this.#position++;
  }

  getName() {
    return this.#name;
  }

  getPosition() {
    return this.#position;
  }

  getPositionString() {
    return "-".repeat(this.#position);
  }
}

export default Car;
