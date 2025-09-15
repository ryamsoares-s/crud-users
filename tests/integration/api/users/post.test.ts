import { prisma } from "@/lib/prisma";

beforeEach(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("API de Usuários - /api/users", () => {
  test("deve criar um novo usuário via POST /api/users", async () => {
    const newUser = {
      email: "teste@exemplo.com",
      name: "Usuário de Teste",
    };

    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const responseBody = await response.json();
    expect(response.status).toBe(201);
    expect(responseBody.email).toBe("teste@exemplo.com");
    expect(responseBody.name).toBe("Usuário de Teste");
  });
});
