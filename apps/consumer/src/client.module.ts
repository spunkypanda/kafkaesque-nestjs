import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { RetryOptions } from 'kafkajs';

import transportConfig from './transport.config';

const kafkaConnectionURL = transportConfig().KAFKA.connectionString;
const retryOptions = transportConfig().KAFKA.retryOptions as RetryOptions;
const kafkaConnectionTimeout = transportConfig().KAFKA.connectionTimeout as number;
const kafkaRequestTimeout = transportConfig().KAFKA.requestTimeout as number;
const maxInFlightRequests = transportConfig().KAFKA.maxInFlightRequests as number;

export const SUBSCRIBED_TOPIC = 'cafe';

export const KafkaClientProxyName = 'KAFKA_CLIENT_PROXY';

export const kafkaConfig: ClientProviderOptions = {
  name: KafkaClientProxyName,
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'consumer',
      brokers: [kafkaConnectionURL],
      connectionTimeout: kafkaConnectionTimeout,
      requestTimeout: kafkaRequestTimeout,
      retry: retryOptions,
    },
    consumer: {
      groupId: 'consumer',
      maxInFlightRequests,
    },
  },
};      
