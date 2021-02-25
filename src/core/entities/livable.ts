/**
 * Livable interface.
 * 
 * This interface is used to make entity liveable.
 */
export interface Livable {
  health: number;
  /**
   * Checks if the entity is alive.
   * 
   * @returns True if the entity is alive, false otherwise
   */
  isAlive(): boolean;
}
