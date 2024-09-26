"use client";
import { useEffect, useState } from "react";
import { UserForm } from "@/components";
import { useUser } from "@/hooks";

export default function DetailUserPage({ params }: { params: { id: string } }) {
  const { findById, remove, update, create, loading } = useUser();
  const [initialValues, setInitialValues] = useState<any>({});
  const id = params?.id;

  useEffect(() => {
    if (id && id !== "create") {
      findById(id).then((data) => {
        const values = {
          ...data?.data,
        };
        setInitialValues(values || {});
      });
    }
  }, []);

  const handleSubmit = async (values: any) => {
    if (id && id !== "create") {
      await update(id, values);
    } else {
      await create(values);
    }
  };

  return (
    <div className="bg-white p-[40px] rounded-[6px]">
      <UserForm
        id={id !== "create" ? id : undefined}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onRemove={remove}
        loading={loading}
      />
    </div>
  );
}
