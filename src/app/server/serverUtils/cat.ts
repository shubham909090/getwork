"use server"

import { prisma } from "../../../db"

export async function getAllCategories() {
    const res = await prisma.category.findMany()
    return res
}