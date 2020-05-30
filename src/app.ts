import * as fs from "fs";
import * as csv from "csv-parser";
import { ProcessQueue } from "./queue";

interface AppDependencies {
  inputFile: string;
  outputFile?: string;
  queue: ProcessQueue;
}

export class App {
  private input: string;
  private output?: string;

  constructor(private dependencies: AppDependencies) {
    const staticDirectory = `${__dirname}/static`;

    this.input = `${staticDirectory}/${this.dependencies.inputFile}`;
    this.output = this.dependencies.outputFile
      ? `${staticDirectory}/${this.dependencies.outputFile}`
      : null;
  }

  private truncateOutputFile() {
    fs.truncate(this.output, 0, function (err) {
      if (err) throw err;
    });
  }

  private readCSVFile(inputFile: string) {
    return fs.createReadStream(inputFile).pipe(csv());
  }

  public run(): void {
    if (this.output) {
      this.truncateOutputFile();
    }

    this.readCSVFile(this.input).on("data", (data) => {
      this.dependencies.queue.push(data);
    });
  }
}
