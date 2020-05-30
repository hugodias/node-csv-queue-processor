import * as fs from "fs";
import * as csv from "csv-parser";
import { ProcessQueue } from "./queue";

interface AppDependencies {
  inputFile: string;
  outputFile?: string;
  queue: ProcessQueue;
}

export class App {
  constructor(private dependencies: AppDependencies) {}

  private truncateOutputFIle(outputFile: string) {
    fs.truncate(outputFile, 0, function (err) {
      if (err) throw err;
    });
  }

  private readCSVFile(inputFile: string) {
    return fs.createReadStream(inputFile).pipe(csv());
  }

  public run(): void {
    const inputFile = `${__dirname}/static/${this.dependencies.inputFile}`;

    if (this.dependencies.outputFile) {
      const outputFile = `${__dirname}/static/${this.dependencies.outputFile}`;
      this.truncateOutputFIle(outputFile);
    }

    this.readCSVFile(inputFile).on("data", (data) => {
      this.dependencies.queue.push(data);
    });
  }
}
