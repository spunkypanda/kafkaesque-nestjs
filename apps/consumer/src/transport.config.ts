import { registerAs } from '@nestjs/config';
import * as ip from 'ip';

// const host = process.env.HOST_IP || ip.address();
const host = 'localhost'

const kafkaOptions = {
  connectionString: process.env.KAFKA_CONNECTION_STRING || `${host}:9092`,
  // connectionString: process.env.KAFKA_CONNECTION_STRING || `${host}:8082`,
  connectionTimeout: process.env.KAFKA_CONNECTION_TIMEOUT ? parseInt(process.env.KAFKA_CONNECTION_TIMEOUT) : 60000,
  requestTimeout: process.env.KAFKA_REQUEST_TIMEOUT ? parseInt(process.env.KAFKA_REQUEST_TIMEOUT) : 60000,
  maxInFlightRequests: process.env.KAFKA_MAX_IN_FLIGHT_REQUESTS ? parseInt(process.env.KAFKA_MAX_IN_FLIGHT_REQUESTS) : 1,
  retryOptions: {
    /**
     * Note: Retry Mechanism Explained
     * https://kafka.js.org/docs/retry-detailed
     */
    maxRetryTime: process.env.KAFKA_MAX_RETRY_TIME ? parseInt(process.env.KAFKA_MAX_RETRY_TIME) : 60000,
    initialRetryTime: process.env.KAFKA_INITIAL_RETRY_TIME ? parseInt(process.env.KAFKA_INITIAL_RETRY_TIME) : 300,
    factor: process.env.KAFKA_RETRY_FACTOR ? parseFloat(process.env.KAFKA_RETRY_FACTOR) : 0.2,
    multiplier: process.env.KAFKA_RETRY_MULTIPLIER ? parseFloat(process.env.KAFKA_RETRY_MULTIPLIER) : 2,
    retries: process.env.KAFKA_RETRY_MAX_RETRIES ? parseInt(process.env.KAFKA_RETRY_MAX_RETRIES) : 10,
  },
};

export default registerAs('transport', () => {
  const config = {
    KAFKA: kafkaOptions,
  };

  return config;
});
