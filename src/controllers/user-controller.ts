import { Request, Response } from 'express';
import { UserInstance } from '../models/user-model';
import ServiceContainer from '../services/service-container';
import Controller, { Link } from './controller';

/**
 * Users controller class.
 * 
 * Root path : `/users`
 */
export default class UserController extends Controller {

  /**
   * Creates a new users controller.
   * 
   * @param container Services container
   */
  public constructor(container: ServiceContainer) {
    super(container, '/users');
    this.registerEndpoint({ method: 'GET', uri: '/info', handlers: [this.container.auth.authenticateHandler, this.container.auth.isAuthenticatedHandler, this.infoHandler] });
    this.registerEndpoint({ method: 'GET', uri: '/', handlers: this.listHandler });
    this.registerEndpoint({ method: 'GET', uri: '/:id', handlers: this.getHandler });
    this.registerEndpoint({ method: 'POST', uri: '/', handlers: this.createHandler });
    this.registerEndpoint({ method: 'PUT', uri: '/:id', handlers: this.modifyHandler });
    this.registerEndpoint({ method: 'PATCH', uri: '/:id', handlers: this.updateHandler });
    this.registerEndpoint({ method: 'DELETE', uri: '/:id', handlers: this.deleteHandler });
    this.registerEndpoint({ method: 'GET', uri: '/:id/armies', handlers: this.listArmiesHandler });
    this.registerEndpoint({ method: 'POST', uri: '/:id/armies', handlers: this.createArmyHandler });
    this.registerEndpoint({ method: 'PATCH', uri: '/:id/armies/:armyId', handlers: this.updateArmyHandler });
  }

  /**
     * Returns the authenticated user.
     * 
     * Path : `GET /users/info`
     * 
     * @param req Express request
     * @param res Express response
     * @async
     */
    public async infoHandler(req: Request, res: Response): Promise<Response> {
      try {
          const authUser: UserInstance = res.locals.authUser;
          if (authUser == null) {
              return res.status(404).json(this.container.errors.formatErrors({
                  error: 'not_found',
                  error_description: 'User not found'
              }));
          }
          return res.status(200).json({ user: authUser });
      } catch (err) {
          return res.status(500).send(this.container.errors.formatServerError());
      }
  }

  /**
   * Lists all users.
   * 
   * Path : `GET /users`
   * 
   * @param req Express request
   * @param res Express response
   * @async
   */
  public async listHandler(req: Request, res: Response): Promise<Response> {
    try {
      return res.status(200).send({ users: await this.db.users.find().populate('armies') });
    } catch (err) {
      return res.status(500).send(this.container.errors.formatServerError(err));
    }
  }

  /**
   * Gets a specific user.
   * 
   * Path : `GET /users/:id`
   * 
   * @param req Express request
   * @param res Express response
   * @async
   */
  public async getHandler(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.db.users.findById(req.params.id).populate('armies');
      if (user == null) {
        return res.status(404).send(this.container.errors.formatErrors({
          error: 'not_found',
          error_description: 'User not found'
        }));
      }
      return res.status(200).send({ user });
    } catch (err) {
      return res.status(500).send(this.container.errors.formatServerError(err));
    }
  }

  /**
   * Creates a new user.
   * 
   * Path : `POST /users`
   * 
   * @param req Express request
   * @param res Express response
   * @async
   */
  public async createHandler(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.db.users.create({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
      });
      return res.status(201).send({
        id: user.id,
        links: [{
          rel: 'Gets the created user',
          action: 'GET',
          href: `${req.protocol}://${req.get('host')}${this.rootUri}/${user.id}`
        }] as Link[]
      });
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).send(this.container.errors.formatErrors(...this.container.errors.translateMongooseValidationError(err)));
      }
      return res.status(500).send(this.container.errors.formatServerError(err));
    }
  }

  /**
   * Modifies an user.
   * 
   * Path : `PUT /users/:id`
   * 
   * @param req Express request
   * @param res Express response
   * @async
   */
  public async modifyHandler(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.db.users.findById(req.params.id);
      if (user == null) {
        return res.status(404).send(this.container.errors.formatErrors({
          error: 'not_found',
          error_description: 'User not found'
        }));
      }
      user.email = req.body.email;
      user.name = req.body.name;
      user.password = req.body.password;
      await user.save();
      return res.status(200).send({
        id: user.id,
        links: [{
          rel: 'Gets the modified user',
          action: 'GET',
          href: `${req.protocol}://${req.get('host')}${this.rootUri}/${user.id}`
        }] as Link[]
      });
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).send(this.container.errors.formatErrors(...this.container.errors.translateMongooseValidationError(err)));
      }
      return res.status(500).send(this.container.errors.formatServerError(err));
    }
  }

  /**
   * Updates an user.
   * 
   * Path : `PATCH /users/:id`
   * 
   * @param req Express request
   * @param res Express response
   * @async
   */
  public async updateHandler(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.db.users.findById(req.params.id);
      if (user == null) {
        return res.status(404).send(this.container.errors.formatErrors({
          error: 'not_found',
          error_description: 'User not found'
        }));
      }
      if (req.body.email != null) {
        user.email = req.body.email;
      }
      if (req.body.name != null) {
        user.name = req.body.name;
      }
      if (req.body.password != null) {
        user.password = req.body.password;
      }
      await user.save();
      return res.status(200).send({
        id: user.id,
        links: [{
          rel: 'Gets the updated user',
          action: 'GET',
          href: `${req.protocol}://${req.get('host')}${this.rootUri}/${user.id}`
        }] as Link[]
      });
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).send(this.container.errors.formatErrors(...this.container.errors.translateMongooseValidationError(err)));
      }
      return res.status(500).send(this.container.errors.formatServerError(err));
    }
  }

  /**
   * Deletes an user.
   * 
   * Path : `DELETE /users/:id`
   * 
   * @param req Express request
   * @param res Express response
   * @async
   */
  public async deleteHandler(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.db.users.findByIdAndDelete(req.params.id);
      if (user == null) {
        return res.status(404).send(this.container.errors.formatErrors({
          error: 'not_found',
          error_description: 'User not found'
        }));
      }
      return res.status(204).send();
    } catch (err) {
      return res.status(500).send(this.container.errors.formatServerError(err));
    }
  }

  /**
   * Lists all armies of an user.
   * 
   * Path : `GET /users/:id/armies`
   * 
   * @param req Express request
   * @param res Express response
   * @async
   */
  public async listArmiesHandler(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.db.users.findById(req.params.id).populate('armies');
      if (user == null) {
        return res.status(404).send(this.container.errors.formatErrors({
          error: 'not_found',
          error_description: 'User not found'
        }));
      }
      return res.status(200).send({ armies: user.armies });
    } catch (err) {
      return res.status(500).send(this.container.errors.formatServerError(err));
    }
  }

  /**
   * Creates a new army.
   * 
   * Path : `POST /users/:id/armies`
   * 
   * @param req Express request
   * @param res Express response
   * @async
   */
  public async createArmyHandler(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.db.users.findById(req.params.id).populate('armies');
      if (user == null) {
        return res.status(404).send(this.container.errors.formatErrors({
          error: 'not_found',
          error_description: 'User not found'
        }));
      }
      const army = await this.db.armies.create({
        owner: user,
        size: req.body.size
      });
      return res.status(201).send({ id: army.id });
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).send(this.container.errors.formatErrors(...this.container.errors.translateMongooseValidationError(err)));
      }
      return res.status(500).send(this.container.errors.formatServerError(err));
    }
  }

  /**
   * Updates an army.
   * 
   * Path : `PATCH /users/:id/armies/:armyId`
   * 
   * @param req Express request
   * @param res Express response
   * @async
   */
  public async updateArmyHandler(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.db.users.findById(req.params.id).populate('armies');
      if (user == null) {
        return res.status(404).send(this.container.errors.formatErrors({
          error: 'not_found',
          error_description: 'User not found'
        }));
      }
      const army = await this.db.armies.findById(req.params.armyId);
      if (army == null) {
        return res.status(404).send(this.container.errors.formatErrors({
          error: 'not_found',
          error_description: 'Army not found'
        }));
      }
      if (req.body.size != null) {
        army.size = req.body.size;
      }
      if (req.body.entities != null) {
        army.entities = req.body.entities;
      }
      await army.save();
      return res.status(200).send({ id: army.id });
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).send(this.container.errors.formatErrors(...this.container.errors.translateMongooseValidationError(err)));
      }
      return res.status(500).send(this.container.errors.formatServerError(err));
    }
  }
}
