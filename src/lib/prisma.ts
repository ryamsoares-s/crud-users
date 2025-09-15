import { PrismaClient } from "@prisma/client";

// Declara uma variável global para o Prisma Client
declare global {
  var prisma: PrismaClient | undefined;
}

// Cria a instância do Prisma Client, reutilizando a instância global se ela existir,
// ou criando uma nova se não existir.
export const prisma = global.prisma || new PrismaClient();

// Em ambiente de desenvolvimento, atualiza a variável global com a nova instância.
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
