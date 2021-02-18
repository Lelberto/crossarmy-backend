import { Vector2 } from '../vector2';

/**
 * Entity class.
 * 
 * An entity is an object in the army.
 */
export abstract class Entity {

  public position: Vector2;
  public size: Vector2;
  public color: string;

  /**
   * Creates a new entity.
   * 
   * @param position Position
   * @param size Size
   * @param color Color
   */
  public constructor(position: Vector2, size: Vector2, color: string) {
    this.position = position;
    this.size = size;
    this.color = color;
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
