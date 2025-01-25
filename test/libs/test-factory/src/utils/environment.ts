import { randomUUID } from 'crypto';

const rabbitmqHost = 'localhost';
const mongodbHost = 'localhost';

const basicBearer = `fiapx:fiapx`;
export const virtualEnvironment = randomUUID().split('-').at(0);
export const rabbitmqURL = `http://${basicBearer}@${rabbitmqHost}:15672`;

export const environment = {
  CI: 'true',
  NODE_ENV: 'testing',
  MONGO_URL: `mongodb://${basicBearer}@${mongodbHost}:27017/${virtualEnvironment}?authSource=admin`,
  AMQP_URL: `amqp://${basicBearer}@${rabbitmqHost}:5672/${virtualEnvironment}`,
  PROVIDER_MAILER_SEND_API_KEY: 'dummy',
  PROVIDER_MAILER_SEND_DOMAIN: 'dummy',
};
