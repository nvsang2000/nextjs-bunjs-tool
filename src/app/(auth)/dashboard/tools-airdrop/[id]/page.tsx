"use client";

import { useEffect, useState } from "react";
import { ToolAirdropForm } from "@/components";
import { useAuth, useRunJob, useToolAirdrop } from "@/hooks";
import { TOOL_AIRDROP } from "@/constants";
import { parseSafe } from "@/helpers";

export default function DetailBlogPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const { findById, remove } = useToolAirdrop();
  const { runJobOKX } = useRunJob();
  const [initialValues, setInitialValues] = useState<any>({});
  const id = params?.id;

  useEffect(() => {
    if (id && id !== "create") {
      findById(id).then((data) => {
        const values = {
          ...data?.data,
          requestId: parseSafe(data?.data?.requestId),
        };
        setInitialValues(values || {});
      });
    }
  }, []);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    const { nameTool } = values;
    if (nameTool === TOOL_AIRDROP.TOOL_OKX)
      await runJobOKX(currentUser.id, values);
  };

  return (
    <div className="bg-white p-[40px] rounded-[6px]">
      <ToolAirdropForm
        id={id !== "create" ? id : undefined}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onRemove={remove}
        loading={loading}
      />
    </div>
  );
}
