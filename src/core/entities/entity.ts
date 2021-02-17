import { Army } from '../army';
import { Vector2 } from '../vector2';

/**
 * Entity class.
 * 
 * An entity is an object in the army.
 */
export abstract class Entity {

  public army: Army;
  public position: Vector2;
  public size: Vector2;

  /**
   * Creates a new entity.
   * 
   * @param army Army
   * @param position Position
   * @param size Size
   */
  public constructor(army: Army, position: Vector2, size: Vector2) {
    this.army = army;
    this.position = position;
    this.size = size;
    this.army.entities.push(this);
  }

  /**
   * Gets the entity configuration.
   * 
   * @returns Entity configuration
   */
  public abstract getConfiguration(): EntityConfiguration;
}

/**
 * Entity configuration interface.
 * 
 * An entity configuration is an object stored in database that contains the configuration for an entity.
 */
export interface EntityConfiguration {
  type: EntityType;
}

/**
 * Entity type.
 */
export type EntityType =
    'human'
  | 'zombie';
