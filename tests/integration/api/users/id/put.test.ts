import { prisma } from "@/lib/prisma";

beforeEach(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("API de Usuários - UPDATE", () => {
  test("Atualiza o nome de um usario", async () => {
    const createdUser = await prisma.user.create({
      data: {
        email: "primeiroUser@teste.com",
        name: "Nome Antigo",
      },
    });

    const updatedUserData = {
      name: "Nome Atualizado",
    };

    const response = await fetch(
      `http://localhost:3000/api/users/${createdUser.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUserData),
      }
    );

    const responseBody = await response.json();
    expect(response.status).toBe(200);
    expect(responseBody.name).toBe("Nome Atualizado");
    expect(responseBody.email).toBe("primeiroUser@teste.com");
  });

  test("Tenta atualizar o email de um usuário", async () => {
    const createdUser = await prisma.user.create({
      data: {
        email: "primeiroUser@teste.com",
        name: "Nome Antigo",
      },
    });

    const updatedUserData = {
      email: "novoEmail@teste.com",
    };

    const response = await fetch(
      `http://localhost:3000/api/users/${createdUser.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUserData),
      }
    );

    const responseBody = await response.json();
    expect(response.status).toBe(200);
    expect(responseBody.name).toBe("Nome Antigo");
    expect(responseBody.email).toBe("novoEmail@teste.com");
  });

  test("Tenta atualizar o email para um email já existente", async () => {
    await prisma.user.create({
      data: {
        email: "emailJaExiste@exemplo.com",
        name: "Ryam",
      },
    });

    const createdUser2 = await prisma.user.create({
      data: {
        email: "ryam@exemplo.com",
        name: "Ryam",
      },
    });

    const updatedUserData = {
      email: "emailJaExiste@exemplo.com",
    };

    const response = await fetch(
      `http://localhost:3000/api/users/${createdUser2.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUserData),
      }
    );

    const responseBody = await response.json();
    expect(response.status).toBe(400);
    expect(responseBody.error).toBe("Email já existe");
  });

  test("Tenta atualizar um usuário que não existe", async () => {
    const updatedUserData = {
      name: "Nome Atualizado",
    };

    const response = await fetch(
      `http://localhost:3000/api/users/UsuarioInexistente`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUserData),
      }
    );

    const responseBody = await response.json();
    expect(response.status).toBe(404);
    expect(responseBody.error).toBe("Usuário não encontrado");
  });
});
