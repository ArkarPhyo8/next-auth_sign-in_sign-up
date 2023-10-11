import { db } from "@/lib/prismaClient";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

const userSchema = z.object({
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is require").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is require")
    .max(8, "Password much have than 8 characters"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // console.log(body);

    const { email, username, password } = body;
    //check if email already exists;
    const existingUserEmail = await db.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existingUserEmail) {
      return new NextResponse(
        JSON.stringify({
          user: null,
          message: "User with this email already exists",
        }),
        { status: 409 }
      );
    }

    //check if username already exists;
    const existingUsername = await db.user.findUnique({
      where: {
        username: username,
      },
    });
    if (existingUsername) {
      return new NextResponse(
        JSON.stringify({
          user: null,
          message: "User with this username already exists",
        }),
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    return new NextResponse(
      JSON.stringify({ user: newUser, message: "user has been successfully" })
    );
  } catch (err) {
    console.log(err);
  }
}
