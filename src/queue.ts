import * as BetterQueue from "better-queue";
import { Processor } from "./processor";

interface BatchConfig {
  batchSize: number;
  batchDelay: number;
  batchDelayTimeout: number;
  afterProcessDelay: number;
}
export class ProcessQueue {
  private queue: any;

  constructor(private processor: Processor, private batchConfig: BatchConfig) {
    this.queue = new BetterQueue(async (batch: any, callback: Function) => {
      if (batch instanceof Array) {
        await Promise.all(batch.map((input: any) => this.processor.run(input)));
      } else {
        await this.processor.run(batch);
      }

      callback(null, () => console.log("Done"));
    }, this.batchConfig);
  }

  public push(data) {
    this.queue.push(data);
  }
}
