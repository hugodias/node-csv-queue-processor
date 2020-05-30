import axios from "axios";

import { Processor } from "./processor";
import { ProcessQueue } from "./queue";
import { App } from "./app";

const inputFile = "input.csv";

/**
 * Optional output file name.
 *
 * If null, write to stdout
 */
const outputFile = "output.csv";

const processor = new Processor({
  HTTPModule: axios,
  baseURL: "http://www.mocky.io",
  path: "/v2/5ed247d93200005f005ca173",
  output: outputFile,
});

const queue = new ProcessQueue(processor, {
  batchSize: 1,
  batchDelay: 2000,
  batchDelayTimeout: 2000,
  afterProcessDelay: 3000,
});

const app = new App({
  queue,
  inputFile,
  outputFile,
});

app.run();
