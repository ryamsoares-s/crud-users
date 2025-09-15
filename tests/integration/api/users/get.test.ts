import { prisma } from "@/lib/prisma";

beforeEach(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("API de Usuários - /api/users", () => {
  test("Lista um usuário - GET /api/users", async () => {
    const createdUser = await prisma.user.create({
      data: {
        email: "teste2@exemplo.com",
        name: "Usuário de Teste 2",
      },
    });

    const response = await fetch("http://localhost:3000/api/users", {
      method: "GET",
    });

    const responseBody = await response.json();
    expect(response.status).toBe(200);
    expect(responseBody[0].email).toBe("teste2@exemplo.com");
    expect(responseBody[0].name).toBe("Usuário de Teste 2");
  });
});
