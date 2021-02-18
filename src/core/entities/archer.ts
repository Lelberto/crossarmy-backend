import { Vector2 } from '../vector2';
import { EntityType } from './entity';
import { LivingEntity, LivingEntityConfiguration } from './living-entity';

export class Archer extends LivingEntity {

  public shootSpeed: number;

  public constructor(position: Vector2, size: Vector2, color: string) {
    super(position, size, color, 1.0);
    this.shootSpeed = 2.0;
  }

  public importConfiguration(config: ArcherConfiguration): void {
    this.shootSpeed = config.shootSpeed;
  }

  public exportConfiguration(): ArcherConfiguration {
    return {
      type: EntityType.ARCHER,
      speed: this.speed,
      shootSpeed: this.shootSpeed
    }
  }
}

export interface ArcherConfiguration extends LivingEntityConfiguration {
  shootSpeed: number;
}
