import { Vector2 } from '../vector2';
import { Entity, EntityConfiguration } from './entity';
import { Movable } from './movable';

/**
 * Living entity class.
 * 
 * A living entity is an entity that can move.
 */
export abstract class LivingEntity extends Entity implements Movable {

  public speed: number;

  /**
   * Creates a new living entity.
   * 
   * @param position Position
   * @param size Size
   * @param speed Speed
   */
  public constructor(position: Vector2, size: Vector2, speed: number) {
    super(position, size);
    this.speed = speed;
  }
}

/**
 * Living entity configuration interface.
 */
export interface LivingEntityConfiguration extends EntityConfiguration {
  speed: number;
}
