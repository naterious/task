import { Config } from './index';
import { ServerConfig } from '../../core/contracts';

export default (config: Config) => (): ServerConfig => ({
  port: config.get('application.port'),
});