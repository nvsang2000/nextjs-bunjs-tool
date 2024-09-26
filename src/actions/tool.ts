"use server";
import prisma from "../lib/connectPrisma";

export async function paginate() {
  const result = await prisma.jobAirdrop.findMany({});
  return result;
}

export async function findOne(id: string) {
  const result = await prisma.jobAirdrop.findUnique({ where: { id } });
  return result;
}

export async function create(params: any) {
  const result = await prisma.jobAirdrop.create({ data: params });
  return result;
}

export async function update(id: string, params: any) {
  const result = await prisma.jobAirdrop.update({
    where: { id },
    data: params,
  });
  return result;
}

export async function remove(id: string) {
  const result = await prisma.jobAirdrop.delete({ where: { id } });
  return result;
}
