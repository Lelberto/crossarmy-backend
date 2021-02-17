import { Entity } from './entities/entity';
import { Vector2 } from './vector2';

/**
 * Army class.
 * 
 * An army is the base of the game.
 */
export class Army {

  public readonly size: Vector2;
  public entities: Entity[];

  /**
   * Creates a new army.
   * 
   * @param size Size
   */
  public constructor(size: Vector2) {
    this.size = size;
    this.entities = [];
  }
}
