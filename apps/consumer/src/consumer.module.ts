import { Module } from '@nestjs/common';
import { ConsumerController } from './consumer.controller';
import { ConsumerService } from './consumer.service';
import { Client, ClientsModule, Transport } from '@nestjs/microservices';

import { kafkaConfig } from './client.module';

@Module({
  imports: [
    ClientsModule.register([kafkaConfig]),
  ],
  controllers: [ConsumerController],
  providers: [ConsumerService],
})
export class ConsumerModule {}
