import { Controller } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices';
import { SUBSCRIBED_TOPIC } from './client.module';
import { DbEvent } from './types';
import { firstValueFrom } from 'rxjs';

export interface SampleTestMessage {
  event: DbEvent;
}

@Controller()
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @EventPattern(SUBSCRIBED_TOPIC)
  async receiveSampleTest(@Payload() message: SampleTestMessage,  @Ctx() context: KafkaContext): Promise<any> {
    const originalMessage = context.getMessage();
    const { headers, key, offset, timestamp } = originalMessage;

    try {
      const { event } = message;

      console.log('>> topic, partition ::', context.getTopic(), context.getPartition());
      console.log('>> headers, timestamp, key, offset ::', headers, timestamp, key, offset);

      // const producer = context.getProducer();
      // await producer.send();

      await firstValueFrom(this.consumerService.doSomething(event));

      const heartbeat = context.getHeartbeat();
      await heartbeat();

      return {
        headers: {},
        key: 'sample',
        value: { message: 'hello world' },
      };
    } catch (err) {
      console.error(err);
    }
  }
}
