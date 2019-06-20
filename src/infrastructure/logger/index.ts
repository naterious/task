import * as winston from 'winston';

const timeFormat = () => new Date().toLocaleString();

export default new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: timeFormat,
      colorize: 'all',
      level: 'info',
    }),
  ],
});
