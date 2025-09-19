import { prisma } from "@/lib/prisma";

beforeEach(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("API de Usuários", () => {
  test("Lista um usuário", async () => {
    const createdUser = await prisma.user.create({
      data: {
        email: "user@exemplo.com",
        name: "User123",
      },
    });

    const response = await fetch(
      `http://localhost:3000/api/users/${createdUser.id}`,
      {
        method: "GET",
      }
    );

    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody.email).toBe("user@exemplo.com");
    expect(responseBody.name).toBe("User123");
    expect(responseBody.id).toBe(createdUser.id);
  });

  test("Tenta listar um usuário que não existe", async () => {
    const response = await fetch(
      `http://localhost:3000/api/users/UsuarioInexistente`,
      {
        method: "GET",
      }
    );

    const responseBody = await response.json();

    expect(response.status).toBe(404);
    expect(responseBody.error).toBe("Usuário não encontrado");
  });
});
