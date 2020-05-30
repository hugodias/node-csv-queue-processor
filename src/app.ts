import * as fs from "fs";
import * as csv from "csv-parser";
import { ProcessQueue } from "./queue";

interface AppDependencies {
  inputFile: string;
  output?: string;
  queue: ProcessQueue;
}

export class App {
  constructor(private dependencies: AppDependencies) {}

  private truncateOutputFile() {
    fs.truncate(this.dependencies.output, 0, function (err) {
      if (err) throw err;
    });
  }

  private readCSVFile(inputFile: string) {
    return fs.createReadStream(inputFile).pipe(csv());
  }

  public run(): void {
    if (this.dependencies.output) {
      this.truncateOutputFile();
    }

    this.readCSVFile(this.dependencies.inputFile).on("data", (data) => {
      this.dependencies.queue.push(data);
    });
  }
}
