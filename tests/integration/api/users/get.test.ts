import { prisma } from "@/lib/prisma";

beforeEach(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("API de Usuários - /api/users", () => {
  test("Lista um usuário", async () => {
    const createdUser = await prisma.user.create({
      data: {
        email: "exemplo@exemplo.com",
        name: "UsuárioTeste",
      },
    });

    const response = await fetch("http://localhost:3000/api/users", {
      method: "GET",
    });

    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody[0].email).toBe("exemplo@exemplo.com");
    expect(responseBody[0].name).toBe("UsuárioTeste");
  });

  test("Lista nenhum usuário quando não há usuários", async () => {
    const response = await fetch("http://localhost:3000/api/users", {
      method: "GET",
    });

    const responseBody = await response.json();
    expect(response.status).toBe(200);
    expect(responseBody).toEqual([]);
  });
});
