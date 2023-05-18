import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { DbEvent } from './types';
import { KafkaClientProxyName, SUBSCRIBED_TOPIC } from './client.module';
import { Observable } from 'rxjs';

@Injectable()
export class ConsumerService implements OnModuleInit {
  constructor(
    @Inject(KafkaClientProxyName) private readonly client: ClientKafka,
  ) {}

  async onModuleInit () {
    this.client.subscribeToResponseOf(SUBSCRIBED_TOPIC);
    await this.client.connect();
  }

  doSomething(evt: DbEvent): Observable<string> {
    const payload = JSON.stringify(evt);
    console.log(payload);
    return this.client.emit('info', payload);
  }
}
