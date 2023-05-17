import { Controller } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices';
import { SUBSCRIBED_TOPIC } from './client.module';

export interface SampleTestMessage {
  name: string;
  age: number;
}

@Controller()
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @EventPattern(SUBSCRIBED_TOPIC)
  async receiveSampleTest(@Payload() message: SampleTestMessage,  @Ctx() context: KafkaContext): Promise<void> {
    const originalMessage = context.getMessage();
    const heartbeat = context.getHeartbeat();
    const { headers, key, offset, timestamp } = originalMessage;

    const { name, age } = message;

    console.log('>> topic, partition ::', context.getTopic(), context.getPartition());
    console.log('>> headers, timestamp, key, offset ::', headers, timestamp, key, offset);

    // const producer = context.getProducer();
    // await producer.send();

    // await heartbeat();

    await this.consumerService.doSomething(name, age);
  }
}
