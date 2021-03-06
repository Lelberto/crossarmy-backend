import mongooseToJson from '@meanie/mongoose-to-json';
import { Document, Model, Mongoose, Schema } from 'mongoose';
import ServiceContainer from '../services/service-container';
import { ArmyInstance } from './army-model';
import Attributes from './model';

/**
 * User attributes interface.
 */
export interface UserAttributes extends Attributes {
  email: string;
  name: string;
  password: string;
  refreshToken?: string;
  armies?: ArmyInstance[];
}

/**
 * User instance interface.
 */
export interface UserInstance extends UserAttributes, Document {}

/**
 * Creates the user model.
 * 
 * @param container Services container
 * @param mongoose Mongoose instance
 */
export default function createModel(container: ServiceContainer, mongoose: Mongoose): Model<UserInstance> {
  return mongoose.model('User', createUserSchema(container), 'users');
}

/**
 * Creates the user schema.
 * 
 * @param container Services container
 * @returns User schema
 */
function createUserSchema(container: ServiceContainer) {
  const schema = new Schema({
    email: {
      type: Schema.Types.String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: (email: string) => /\S+@\S+\.\S+/.test(email),
        message: 'Invalid email'
      }
    },
    name: {
      type: Schema.Types.String,
      required: [true, 'Name is required'],
      unique: [true, 'Name already exists']
    },
    password: {
      type: Schema.Types.String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password is too small'],
      select: false
    },
    refreshToken: {
      type: Schema.Types.String,
      default: null,
      select: false
    }
  }, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });

  schema.virtual('armies', {
    ref: 'Army',
    localField: '_id',
    foreignField: 'owner'
  });

  // Password hash validation
  schema.pre('save', async function (this: UserInstance, next) {
    if (this.isNew && this.password != null) { // Validates the password only if filled
      try {
        this.password = await container.crypto.hash(this.password, parseInt(process.env.HASH_SALT, 10));
        return next();
      } catch (err) {
        return next(err);
      }
    }
  });

  schema.plugin(mongooseToJson);

  return schema;
}
