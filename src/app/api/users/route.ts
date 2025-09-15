// src/app/api/users/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao buscar usuários." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name } = body;

    // No seu código anterior, a validação pedia 'name', vamos mantê-la
    if (!email || !name) {
      return NextResponse.json(
        { error: "Nome e email são obrigatórios" },
        { status: 400 } // 400 = Bad Request
      );
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error(error); // Logar o erro no servidor é útil
    return NextResponse.json(
      { error: "Falha ao criar usuário." },
      { status: 500 }
    );
  }
}
