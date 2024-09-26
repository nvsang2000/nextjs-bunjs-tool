"use server";
import prisma from "../lib/connectPrisma";
import bcrypt from "bcrypt";

export async function paginate() {
  const result = await prisma.user.findMany({});
  return result;
}

export async function findOne(id: string) {
  const result = await prisma.user.findUnique({ where: { id } });
  return result;
}

export async function create(params: any) {
  const result = await prisma.user.create({
    data: {
      ...params,
      password: bcrypt.hashSync(params.password, 10)
    }
  });
  return result;
}

export async function update(id: string, params: any) {
  const result = await prisma.user.update({
    where: { id },
    data: params,
  });
  return result;
}

export async function remove(id: string) {
  const result = await prisma.user.delete({ where: { id } });
  return result;
}
