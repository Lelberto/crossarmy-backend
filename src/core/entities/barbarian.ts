import { Vector2 } from '../vector2';
import { EntityType } from './entity';
import { LivingEntity, LivingEntityConfiguration } from './living-entity';

export class Barbarian extends LivingEntity {

  public speedMultiplier: number;

  public constructor(position: Vector2, size: Vector2, color: string) {
    super(position, size, color, 0.9);
    this.speedMultiplier = 0.0;
  }

  public importConfiguration(config: BarbarianConfiguration): void {
    this.speedMultiplier = config.speedMultiplier;
  }

  public exportConfiguration(): BarbarianConfiguration {
    return {
      type: EntityType.BARBARIAN,
      speed: this.speed,
      speedMultiplier: this.speedMultiplier
    }
  }
}

/**
 * Barbarian configuration interface.
 */
export interface BarbarianConfiguration extends LivingEntityConfiguration {
  speedMultiplier: number;
}
