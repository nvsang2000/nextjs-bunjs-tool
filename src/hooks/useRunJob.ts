"use client";
import { message } from "antd";
import { useRouter } from "next/navigation";
import useToolAirdrop from "./useToolAirdrop";
import { jobMoonbix, jobOKX } from "@/actions/job";
import { useState } from "react";

export default function useRunJob() {
  const { create } = useToolAirdrop();
  const [loading, setLoading] = useState<boolean>(false);
  const { back } = useRouter();

  const runJobOKX = async (userId: string, values: any) => {
    setLoading(true);
    try {
      await create(userId, values);
      await jobOKX(values);
      back();
    } catch (error) {
      message.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  const runJobMoonBix = async (userId: string, values: any) => {
    setLoading(true);
    try {
      await create(userId, values);
      await jobMoonbix(values);
      back();
    } catch (error) {
      message.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    runJobOKX,
    runJobMoonBix
  };
}
