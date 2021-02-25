/**
 * Updatable interface.
 */
export interface Updatable {
  /**
   * Make an update.
   * 
   * This method is called at every tick in the game loop.
   * 
   * @param loopCount Loop count since the loop starts
   */
  update(loopCount?: number): void;
}
