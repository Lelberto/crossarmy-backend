import { Army } from './army';
import { ArmyInstance } from '../../models/army-model';
import { Vector2 } from '../vector2';
import { EntityFactory } from '../entities/entity-factory';
import ServiceContainer from '../../services/service-container';
import { UserInstance } from '../../models/user-model';

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
    const army = new Army(armyModel.id, new Vector2(armyModel.size.x, armyModel.size.y));
    for (const entityModel of armyModel.entities) {
      army.spawn(EntityFactory.create(new Vector2(entityModel.position.x, entityModel.position.y), new Vector2(entityModel.size.x, entityModel.size.y), entityModel.config));
    }
    return army;
  }

  /**
   * Creates a new army.
   * 
   * @param container Services container
   * @param owner Army owner
   * @param size Army size
   */
  public static async createNew(container: ServiceContainer, owner: UserInstance, size: Vector2): Promise<Army> {
    const armyModel = await container.db.armies.create({
      owner,
      size: { x: size.x, y: size.y },
      entities: []
    });
    return new Army(armyModel.id, size);
  }

  /**
   * Saves an army.
   * 
   * @param container Services container
   * @param army Army to save
   */
  public static async save(container: ServiceContainer, army: Army): Promise<void> {
    const armyModel = await container.db.armies.findById(army.id);
    if (armyModel != null) {
      armyModel.size = { x: army.size.width, y: army.size.height };
      armyModel.entities = army.entities.map(entity => ({
        position: { x: entity.position.x, y: entity.position.y },
        size: { x: entity.size.width, y: entity.size.height },
        config: entity.exportConfiguration()
      }));
      await armyModel.save();
    }
  }

  private constructor() {}
}
