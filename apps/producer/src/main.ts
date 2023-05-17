import { NestFactory } from '@nestjs/core';
import { ProducerModule } from './producer.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // const app = await NestFactory.create(ProducerModule);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ProducerModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:8082'],
      },
    },
  });

  await app.init();
  // await app.listen(4000);
}
bootstrap();
