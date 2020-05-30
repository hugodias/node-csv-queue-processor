import axios from "axios";

import { Processor } from "./processor";
import { ProcessQueue } from "./queue";
import { App } from "./app";

const staticDirectory = `${__dirname}/static`;
const inputFile = `${staticDirectory}/input.csv`;
const output = `${staticDirectory}/output.csv`; // Optional. If null write to stdout

const processor = new Processor({
  HTTPModule: axios,
  baseURL: "http://www.mocky.io",
  path: "/v2/5ed247d93200005f005ca173",
  output,
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
  output,
});

app.run();
