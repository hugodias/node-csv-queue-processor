# Node CSV Queue Processor

## Why?

I have seen myself doing the same kind of task over and over. This script solves the following problems:

1. You need to read a CSV file and process each row doing an request to a API
1. You need to the same step 1 and also write the results in a different CSV file

## How?

```bash
$ git clone https://github.com/hugodias/node-csv-queue-processor.git
$ yarn install
```

1. Insert the data you need on `src/input.csv`
1. Configure the batches on `src/index.ts#L14-19`
1. Configure the API endpoint on `src/index.ts#L7-12`
1. Run `yarn run dev`

### How it works

1. The script parse de CSV file and sends to a queue
1. On each bach, each result is processed by the Processor class
1. The Processor class do a post request to the API
1. The Processo writes the result on a different CSV file named output.csv
