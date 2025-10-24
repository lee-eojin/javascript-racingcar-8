import RaceController from './controllers/RaceController.js';
import ConsoleInputReader from './console/ConsoleInputReader.js';
import ConsoleOutputWriter from './console/ConsoleOutputWriter.js';

class App {
  #controller;
  #inputReader;
  #outputWriter;

  constructor() {
    this.#controller = new RaceController();
    this.#inputReader = new ConsoleInputReader();
    this.#outputWriter = new ConsoleOutputWriter();
  }

  async run() {
    const names = await this.#inputReader.readNames();
    const roundCount = await this.#inputReader.readRoundCount();

    this.#controller.initCars(names);
    this.#outputWriter.printResultMessage();

    this.#controller.playGame(roundCount, (cars) => {
      this.#outputWriter.printRoundResult(cars);
    });

    this.#outputWriter.printWinners(this.#controller.getWinners());
  }
}

export default App;
