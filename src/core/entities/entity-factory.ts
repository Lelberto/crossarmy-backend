import { Vector2 } from '../vector2';
import { Entity, EntityConfiguration } from './entity';

/**
 * Entity factory class.
 */
export class EntityFactory {

  /**
   * Creates an entity from it configuration or new entity.
   * 
   * @param position Entity position
   * @param size Entity size
   * @param config Entity configuration
   */
  public static create(position: Vector2, size: Vector2, config?: EntityConfiguration): Entity {
    return null;
  }

  private constructor() {}
}
