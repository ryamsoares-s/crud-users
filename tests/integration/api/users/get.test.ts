import { prisma } from "@/lib/prisma";

beforeEach(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("API de Usuários", () => {
  test("Lista todos os usuarios", async () => {
    const createdUser = await prisma.user.create({
      data: {
        email: "exemplo1@exemplo.com",
        name: "UsuárioTeste1",
      },
    });

    const createdUser2 = await prisma.user.create({
      data: {
        email: "exemplo2@exemplo.com",
        name: "UsuárioTeste2",
      },
    });

    const response = await fetch("http://localhost:3000/api/users", {
      method: "GET",
    });

    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody.length).toBe(2);
    expect(responseBody[0].email).toBe("exemplo1@exemplo.com");
    expect(responseBody[0].name).toBe("UsuárioTeste1");
    expect(responseBody[1].email).toBe("exemplo2@exemplo.com");
    expect(responseBody[1].name).toBe("UsuárioTeste2");
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
