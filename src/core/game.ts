import ServiceContainer from '../services/service-container';
import { Army } from './army/army';
import { Updatable } from './updatable';

/**
 * Game class.
 * 
 * This class is the engine of games.
 * Every battle between armies is a game and there is one game loop by battle.
 */
export class Game implements Updatable {

  public readonly armies: Army[];
  private container: ServiceContainer;
  private _status: Status;
  private loopCount: number;

  /**
   * Creates a new game.
   * 
   * @param container Services container
   * @param armies Armies to battle between
   */
  public constructor(container: ServiceContainer, armies: Army[]) {
    this.container = container;
    this._status = Status.INIT;
    this.loopCount = 0;
    this.armies = armies;
  }

  /**
   * Starts the game.
   */
  public start(): void {
    if (this._status === Status.INIT) {
      this.container.scheduler.runTask('game-loop', this.update.bind(this), 1);
    }
    this._status = Status.IN_PROGRESS;
  }

  /**
   * Stops the game.
   */
  public stop(): void {
    this._status = Status.STOPPED;
    this.container.scheduler.stopTask('game-loop');
  }

  public update(): void {
    for (const army of this.armies) {
      army.update(++this.loopCount);
    }
  }

  public get status(): Status {
    return this._status;
  }
}

/**
 * Game status.
 */
export enum Status {
  INIT = 0,
  IN_PROGRESS = 1,
  STOPPED = 2
}
