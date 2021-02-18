import { Vector2 } from '../vector2';
import { Archer, ArcherConfiguration } from './archer';
import { Barbarian, BarbarianConfiguration } from './barbarian';
import { Entity, EntityConfiguration, EntityType } from './entity';

/**
 * Entity factory class.
 */
export class EntityFactory {

  /**
   * Creates an entity from it configuration.
   * 
   * @param position Entity position
   * @param size Entity size
   * @param color Entity color
   * @param config Entity configuration
   */
  public static create(position: Vector2, size: Vector2, color: string, config: EntityConfiguration): Entity {
    switch (config.type) {
      case EntityType.BARBARIAN:
        return EntityFactory.createBarbarian(position, size, color, config as BarbarianConfiguration);
      case EntityType.ARCHER:
        return EntityFactory.createArcher(position, size, color, config as ArcherConfiguration);
      default: return null;
    }
  }

  /**
   * Creates a barbarian from it configuration.
   * 
   * @param position Barbarian position
   * @param size Barbarian size
   * @param color Barbarian color
   * @param config Barbarian configuration
   */
  private static createBarbarian(position: Vector2, size: Vector2, color: string, config: BarbarianConfiguration): Barbarian {
    const entity = new Barbarian(position, size, color);
    entity.speed = config.speed || entity.speed;
    entity.speedMultiplier = config.speedMultiplier || entity.speedMultiplier;
    return entity;
  }

  /**
   * Creates a archer from it configuration.
   * 
   * @param position Archer position
   * @param size Archer size
   * @param color Archer color
   * @param config Archer configuration
   */
  private static createArcher(position: Vector2, size: Vector2, color: string, config: ArcherConfiguration): Archer {
    const entity = new Archer(position, size, color);
    entity.speed = config.speed || entity.speed;
    entity.shootSpeed = config.shootSpeed || entity.shootSpeed;
    return entity;
  }

  private constructor() {}
}
