import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { KafkaClientProxyName, SUBSCRIBED_TOPIC } from './client.module';

@Injectable()
export class ConsumerService implements OnModuleInit {
  constructor(
    @Inject(KafkaClientProxyName) private readonly client: ClientKafka,
  ) {}

  async onModuleInit () {
    this.client.subscribeToResponseOf(SUBSCRIBED_TOPIC);
    await this.client.connect();
  }

  async doSomething(name: string, age: number): Promise<string> {
    const data = { name: name.toUpperCase(), age: age+1 };
    this.client.emit('info', JSON.stringify(data));
    return 'Hello World!';
  }
}
