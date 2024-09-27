"use server";
import runJobOKX from "./job/okx";
import runJobMoonBix from "./job/moonbix";
const { spawn } = require('child_process');

const cron = require("node-cron");
export async function jobOKX(values: any) {
  const { requestId } = values;

  runJobOKX(requestId).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

export async function jobMoonbix(values: any) {
  const { requestId } = values;

  const client = new runJobMoonBix();
  client.main(requestId).catch((err) => {
    client.log(err.message, "error");
    process.exit(1);
  });

}
