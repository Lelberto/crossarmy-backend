import { Vector2 } from '../vector2';
import { Entity, EntityConfiguration } from './entity';
import { Livable } from './livable';
import { Movable } from './movable';

/**
 * Living entity class.
 * 
 * A living entity is an entity that can move.
 */
export abstract class LivingEntity extends Entity implements Livable, Movable {

  public health: number;
  public speed: number;

  /**
   * Creates a new living entity.
   * 
   * @param position Position
   * @param size Size
   * @param speed Speed
   * @param color Color
   */
  public constructor(position: Vector2, size: Vector2, color: string, speed: number) {
    super(position, size, color);
    this.speed = speed;
  }

  public abstract isAlive(): boolean;
}

/**
 * Living entity configuration interface.
 */
export interface LivingEntityConfiguration extends EntityConfiguration {
  speed: number;
}
