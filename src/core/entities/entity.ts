import { Vector2 } from '../vector2';

/**
 * Entity class.
 * 
 * An entity is an object in the army.
 */
export abstract class Entity {

  public position: Vector2;
  public size: Vector2;

  /**
   * Creates a new entity.
   * 
   * @param position Position
   * @param size Size
   */
  public constructor(position: Vector2, size: Vector2) {
    this.position = position;
    this.size = size;
  }

  /**
   * Imports entity configuration.
   * 
   * @param config Entity configuration
   */
  public abstract importConfiguration(config: EntityConfiguration): void;

  /**
   * Exports entity configuration.
   * 
   * @returns Entity configuration
   */
  public abstract exportConfiguration(): EntityConfiguration;
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
 * Entity type enumeration.
 */
export enum EntityType {
  BARBARIAN = 0,
  ARCHER = 1
}
