import { Army } from './army';
import { ArmyInstance } from '../../models/army-model';
import { Vector2 } from '../vector2';
import { EntityFactory } from '../entities/entity-factory';

/**
 * Army factory class.
 */
export class ArmyFactory {

  /**
   * Creates an army from it model.
   * 
   * @param armyModel Army model
   */
  public static create(armyModel: ArmyInstance): Army {
    const army = new Army(new Vector2(armyModel.size.x, armyModel.size.y));
    for (const entityModel of armyModel.entities) {
      army.spawn(EntityFactory.create(new Vector2(entityModel.position.x, entityModel.position.y), new Vector2(entityModel.size.x, entityModel.size.y), entityModel.config));
    }
    return army;
  }

  /**
   * Creates a new army.
   * 
   * @param size Army size
   */
  public static createNew(size: Vector2): Army {
    return new Army(size);
  }

  private constructor() {}
}
