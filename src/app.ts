import ServiceContainer from './services/service-container';

ServiceContainer.getInstance().srv.start().catch(console.error);
