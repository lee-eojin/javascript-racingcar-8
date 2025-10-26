import RaceController from './controllers/RaceController.js';
import ConsoleInputReader from './console/ConsoleInputReader.js';
import ConsoleOutputWriter from './console/ConsoleOutputWriter.js';

class App {
  async run() {
    const controller = new RaceController();
    const inputReader = new ConsoleInputReader();
    const outputWriter = new ConsoleOutputWriter();

    const names = await inputReader.readNames();
    const roundCount = await inputReader.readRoundCount();

    controller.initCars(names);
    outputWriter.printResultMessage();

    controller.playGame(roundCount, (cars) => {
      outputWriter.printRoundResult(cars);
    });

    outputWriter.printWinners(controller.getWinners());
  }
}

export default App;
