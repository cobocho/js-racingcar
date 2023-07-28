const Validator = require('./Validator.js');
const Car = require('./model/Car.js');
const Track = require('./model/Track.js');
const WinnerChecker = require('./model/WinnerChecker.js');
const View = require('./view/View.js');
const { splitByStandard } = require('./utils.js');

class App {
  #track;

  #winnerChecker;

  #cars = [];

  constructor() {
    this.#track = new Track();
    this.#winnerChecker = new WinnerChecker();
  }

  init() {
    this.#reset();
    this.#getCarNames();
  }

  #getCarNames() {
    const input = View.getUserInput(this.#checkValidatedNames);
    console.log(input);
  }

  #checkValidatedNames(input) {
    const nameList = splitByStandard(input);

    try {
      Validator.isValidNames(nameList);

      this.#setCars(nameList);
      this.#startRacing();
    } catch (err) {
      View.renderError(err.message);
      process.exit();
    }
  }

  #setCars(names) {
    names.forEach((name) => this.#cars.push(new Car(name)));
  }

  #startRacing() {
    View.renderLineBreak();
    View.renderStartComment();

    while (!this.#track.isEndRound()) {
      this.#processRound();
    }

    this.#finishRacing();
  }

  #processRound() {
    this.#cars.forEach((car) => {
      car.moveByRandomNumber();
      View.renderCarDistance(car);
    });

    this.#track.increaseRound();
    View.renderLineBreak();
  }

  #finishRacing() {
    this.#winnerChecker.addResult(this.#cars);
    const { winners } = this.#winnerChecker;
    View.renderResult(winners);

    process.exit();
  }

  #reset() {
    this.#cars = [];
    this.#track.reset();
    this.#winnerChecker.reset();
  }
}

module.exports = App;
