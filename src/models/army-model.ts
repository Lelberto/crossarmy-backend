import mongooseToJson from'@meanie/mongoose-to-json';
import { Mongoose, Model, Schema, Document } from 'mongoose';
import { EntityConfiguration } from '../core/entities/entity';
import ServiceContainer from '../services/service-container';
import Attributes from './model';
import { UserInstance } from './user-model';

/**
 * Army attributes interface.
 */
export interface ArmyAttributes extends Attributes {
  owner: UserInstance;
  size: { x: number, y: number };
  entities: EntityAttributes[];
}

/**
 * Entity attributes interface.
 */
export interface EntityAttributes {
  position: { x: number, y: number };
  size: { x: number, y: number };
  config: EntityConfiguration;
}

/**
 * Army instance interface.
 */
export interface ArmyInstance extends ArmyAttributes, Document {}

/**
 * Creates the army model.
 * 
 * @param container Services container
 * @param mongoose Mongoose instance
 */
export default function createModel(container: ServiceContainer, mongoose: Mongoose): Model<ArmyInstance> {
  return mongoose.model('Army', creatArmySchema(), 'armies');
}

/**
 * Creates the army schema.
 * 
 * @param container Services container
 * @returns Army schema
 */
function creatArmySchema() {
  const schema = new Schema({
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Owner is required']
    },
    size: {
      type: createSizeSubSchema(),
      required: [true, 'Size is required']
    },
    entities: {
      type: [{
        type: createEntitySubSchema(),
      }],
      default: []
    }
  });

  schema.plugin(mongooseToJson);

  return schema;
}

/**
 * Creates the size subschema.
 * 
 * @param container Services container
 * @returns Size schema
 */
function createSizeSubSchema() {
  const schema = new Schema({
    x: {
      type: Schema.Types.Number,
      required: [true, 'Size X is required']
    },
    y: {
      type: Schema.Types.Number,
      required: [true, 'Size Y is required']
    }
  }, {
    _id: false,
    id: false
  });
  return schema;
}

/**
 * Creates the entity subschema.
 * 
 * @param container Services container
 * @returns Entity schema
 */
function createEntitySubSchema() {
  const schema = new Schema({
    position: {
      type: createSizeSubSchema(),
      required: [true, 'Entity position is required']
    },
    size: {
      type: createSizeSubSchema(),
      required: [true, 'Entity size is required']
    },
    config: {
      type: Schema.Types.Mixed,
      required: [true, 'Entity configuration is required']
    }
  }, {
    _id: false,
    id: false
  });
  return schema;
}
