import express from 'express';

export type ExpressServer = () => express.Application;

export default () => express();
