"use client"
import { useEffect, useState } from "react";
import { create, findOne, paginate, remove, update } from "../actions/users";
import { message } from "antd";
import { useRouter } from "next/navigation";


export default function useUser() {
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const { back, refresh } = useRouter()

  useEffect(() => {
    fetch()
  }, []);
  
  const fetch = async () => {
    setLoading(true)
    try {
      const result = await paginate();
      if(result) setUsers(result)
    } catch (error) {
      message.error("Error server")
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
      return undefined
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async(payload: any) => {
    setLoading(true)
    try {
      await create(payload)
      message.success("Create successfully!")
      back()
    } catch (error) {
      message.error(`${error}`)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async(id: string, payload: any) => {
    setLoading(true)
    const user = await findOne(id)
    if(!user) return message.error('Not fund!')
    try {
      await update(id, payload)
      message.success("Create successfully!")
      refresh()
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
      message.error(`Not found ID: ${id}!`)
    } finally {
      setLoading(false)
    }
  }

  return {
    users,
    loading,
    findById,
    refetch: fetch,
    create: handleCreate,
    update: handleUpdate,
    remove: handleRemove,  
  };
}
