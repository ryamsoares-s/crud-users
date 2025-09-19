import { prisma } from "@/lib/prisma";

beforeEach(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("API de Usuários - DELETE", () => {
  test("Deleta um usuário existente", async () => {
    const createdUser = await prisma.user.create({
      data: {
        email: "deleteuser@teste.com",
        name: "Usuário Deletável",
      },
    });

    const response = await fetch(
      `http://localhost:3000/api/users/${createdUser.id}`,
      {
        method: "DELETE",
      }
    );

    const responseBody = await response.json();
    expect(response.status).toBe(200);
    expect(responseBody.message).toBe("Usuário deletado com sucesso");

    // Confirma que o usuário foi removido do banco
    const userInDb = await prisma.user.findUnique({
      where: { id: createdUser.id },
    });
    expect(userInDb).toBeNull();
  });

  test("Tenta deletar um usuário que não existe", async () => {
    const response = await fetch(
      `http://localhost:3000/api/users/UsuarioInexistente`,
      {
        method: "DELETE",
      }
    );

    const responseBody = await response.json();
    expect(response.status).toBe(404);
    expect(responseBody.error).toBe("Usuário não encontrado");
  });
});
