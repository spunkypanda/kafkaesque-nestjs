import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { ConsumerModule } from './consumer.module';
import { kafkaConfig } from './client.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ConsumerModule, kafkaConfig);

  await app.listen()
}
bootstrap();
