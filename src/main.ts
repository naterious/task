import { Application } from 'express';
import cg from './cg';

// @ts-ignore
const main: () => Application = () => {
  const {
    startServer,
  } = cg();

  return startServer();
};

main();
