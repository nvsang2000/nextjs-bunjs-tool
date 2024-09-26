"use server";
import runJobOKX from "./job/okx";
const cron = require("node-cron");
export async function jobOKX(values: any) {
  const { requestId } = values;

  cron.schedule(
    "0 * * * * *",
    async () => {
      console.log("Running a job at 00 00 00 AM every day * * *");
      runJobOKX(requestId).catch((err) => {
        console.error(err);
        process.exit(1);
      });
    },
    { timezone: "Asia/Saigon" }
  );
}

export async function jobMoonbix(values: any) {
  const { requestId } = values;

  cron.schedule(
    "0 * * * * *",
    async () => {
      console.log("Running a job at 00 00 00 AM every day * * *");
      runJobOKX(requestId).catch((err) => {
        console.error(err);
        process.exit(1);
      });
    },
    { timezone: "Asia/Saigon" }
  );
}