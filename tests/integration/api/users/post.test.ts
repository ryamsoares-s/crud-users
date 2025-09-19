import { prisma } from "@/lib/prisma";

beforeEach(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("API de Usuários - CREATE", () => {
  test("cria um usuário", async () => {
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

  test("tenta criar usuário sem email", async () => {
    const newUser = {
      name: "Usuário Sem Email",
    };

    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const responseBody = await response.json();
    expect(response.status).toBe(400);
    expect(responseBody.error).toBe("Nome e email são obrigatórios");
  });

  test("tenta criar usuário sem nome", async () => {
    const newUser = {
      email: "userSemNome@exemplo.com",
    };

    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const responseBody = await response.json();
    expect(response.status).toBe(400);
    expect(responseBody.error).toBe("Nome e email são obrigatórios");
  });

  test("tenta criar usuário com email duplicado", async () => {
    const newUser1 = {
      email: "teste@exemplo.com",
      name: "Usuário1",
    };

    const newUser2 = {
      email: "tesTe@exemplo.com",
      name: "Usuário2",
    };

    await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser1),
    });

    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser2),
    });

    const responseBody = await response.json();
    expect(response.status).toBe(400);
    expect(responseBody.error).toBe("Email já cadastrado");
  });
});
