import { IConfig } from 'config';

import config from 'config';
import server from './server';
import system from './system';
import api from './api';

import {
  ServerConfig,
  SystemConfig,
  ApiConfig,
} from '../../core/contracts';

export type Config = IConfig;

export interface InfrastructureConfig {
  getServerConfig: () => ServerConfig;
  getSystemConfig: () => SystemConfig;
  getApiConfig: () => ApiConfig;
}

export default (): InfrastructureConfig => {
  const getServerConfig = server(config);
  const getSystemConfig = system(config);
  const getApiConfig = api(config);

  return {
    getServerConfig,
    getSystemConfig,
    getApiConfig,
  };
};
