"use server";
import runJobOKX from "./job/okx";

export async function jobOKX(values: any) {
  const { requestId } = values;

  setTimeout(() => {
    runJobOKX(requestId).catch((err) => {
      console.error(err);
      process.exit(1);
    });
  }, 1000);
}
