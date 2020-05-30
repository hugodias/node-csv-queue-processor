import { AxiosStatic, AxiosInstance, AxiosResponse } from "axios";
import * as fs from "fs";

export interface InputProps {
  name: string;
  url: string;
}

export interface ServerResponse {
  data: ServerData;
}

export interface ServerData {
  response: string;
}

interface ProcessorDependencies {
  HTTPModule: AxiosStatic;
  baseURL: string;
  path: string;
  output: "stdout" | string;
}

export class Processor {
  private apiClient: AxiosInstance;

  constructor(private dependencies: ProcessorDependencies) {
    this.apiClient = dependencies.HTTPModule.create({
      baseURL: dependencies.baseURL,
    });
  }

  public async run(input: InputProps): Promise<void> {
    const { data } = await this.apiClient.post<AxiosResponse<ServerData>>(
      this.dependencies.path,
      input
    );

    if (this.dependencies.output === "stdout") {
      console.log(data);
    } else {
      this.writeToFile(data);
    }
  }

  private writeToFile(data: ServerData): void {
    const outputPath = `${__dirname}/static/${this.dependencies.output}`;
    const output = `${data.response}\n`;
    console.log("write");
    fs.appendFile(outputPath, output, function (err) {
      if (err) throw err;
      console.log(`appended`);
    });
  }
}
