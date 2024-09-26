"use client"
import { useEffect, useState } from "react";
import { create, findOne, paginate, remove } from "../actions/tool";
import { message } from "antd";
import { useRouter } from "next/navigation";

export default function useToolAirdrop() {
  const [toolAirdrops, setToolAirdrops] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const { back } = useRouter()

  useEffect(() => {
    fetch()
  }, []);
  
  const fetch = async () => {
    setLoading(true)
    try {
      const result = await paginate();
      if(result) setToolAirdrops(result)
    } catch (error) {
      message.error(`${error}`)
    } finally {
      setLoading(false)
    }
  };

  const findById = async (id: string) => {
    setLoading(true)
    try {
      const result = await findOne(id)
      return { data: result }
    } catch (error) {
      message.error(`${error}`)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (userId: string, values: any) => {
    setLoading(true)
    try {
      const data = {
        ...values,
        requestId: JSON.stringify(values?.requestId),
        userId: userId,
      };
      
      const result = await create(data);
      message.success(`Running JOB ${result.nameTool}!`)
    } catch (error) {
      message.error(`${error}`)
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (id: string) => {
    setLoading(true)
    try {
      await remove(id)
      message.success("Removed successfully!")
      back()
    } catch (error) {
      message.error(`${error}`)
    } finally {
      setLoading(false)
    }
  }

  return {
    toolAirdrops,
    refetch: fetch,
    create: handleCreate,
    remove: handleRemove,
    findById,
  };
}
