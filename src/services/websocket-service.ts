import { Server, Socket } from 'socket.io';
import Service from './service';
import ServiceContainer from './service-container';

/**
 * Websocket service class.
 * 
 * This service is used to manage the websocket server.
 */
export default class WebsocketService extends Service {

  private srv: Server;

  /**
   * Creates a new websocket service.
   * 
   * @param container Services container
   */
  public constructor(container: ServiceContainer) {
    super(container);
    this.srv = null;
  }

  /**
   * Starts the websocket server.
   * 
   * @param port Listening port
   */
  public start(port: number): void {
    if (!this.srv) {
      this.srv = new Server(port, {
        pingInterval: 60000,
        pingTimeout: 600000
      });
      this.createEvents();
    }
  }

  /**
   * Stops the websocket server.
   */
  public stop(): void {
    if (this.srv) {
      this.srv.close();
      this.srv = null;
    }
  }

  /**
   * Creates the websocket events.
   */
  private createEvents(): void {
    this.srv.on('connect', socket => {
      this.container.log.info(`Socket connected : ${socket.handshake.address}`);

      // When the socket disconnects
      socket.on('disconnect', () => {
        socket.leaveAll();
        this.container.log.info(`Socket disconnected : ${socket.handshake.address}`);
      });
    });
  }

  /**
   * Sends an event to all sockets in a room (including the sender socket).
   * 
   * @param socket Sender socket
   * @param room Room ID
   * @param event Event to send
   * @param data Data to send
   */
  private broadcast(socket: Socket, room: string, event: string, data: unknown): void {
    socket.emit(event, data);
    socket.broadcast.to(room).emit(event, data);
  }
}

/**
 * Socket events enumeration.
 */
export enum SocketEvent {

}

/**
 * Socket error enumeration.
 */
enum SocketError {

}