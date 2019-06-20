import { Config } from './index';
import { SystemConfig } from '../../core/contracts';

export default (config: Config) => (): SystemConfig => ({
  environment: config.get('environment'),
});