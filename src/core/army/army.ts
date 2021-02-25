import { Entity } from '../entities/entity';
import { Updatable } from '../updatable';
import { Vector2 } from '../vector2';

/**
 * Army class.
 * 
 * An army is the base of the game.
 */
export class Army implements Updatable {

  public readonly id: string;
  public readonly size: Vector2;
  public entities: Entity[];

  /**
   * Creates a new army.
   * 
   * @param id ID
   * @param size Size
   */
  public constructor(id: string, size: Vector2) {
    this.id = id;
    this.size = size;
    this.entities = [];
  }

  /**
   * Spawns an entity.
   * 
   * @param entity Entity to spawn
   */
  public spawn(entity: Entity): void {
    this.entities.push(entity);
  }

  public update(loopCount: number): void {
    for (const entity of this.entities) {
      entity.update(loopCount);
    }
  }
}
