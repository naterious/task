import { Config } from './index';
import { ApiConfig } from '../../core/contracts';

export default (config: Config) => (): ApiConfig => ({
  url: config.get('api.url'),
});