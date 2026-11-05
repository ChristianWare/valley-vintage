"use server";

import { db } from "@/lib/db";
import {
  generateEmailVerificationToken,
  sendEmailVerificationToken,
} from "@/lib/emailVerification";
import { getUserByEmail } from "@/lib/user";
import { RegisterSchema, RegisterSchemaType } from "@/schemas/RegisterSchema";
import bcrypt from "bcryptjs";
import { DEMO_FORMS_SILENT } from "@/config/demo";

export const signUp = async (values: RegisterSchemaType) => {
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) return { error: "Invalid fields!" };

  const { name, email, password } = validateFields.data;

  const existing = await getUserByEmail(email);
  if (existing) return { error: "Email already in use!" };

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      // Demo mode: no verification email can arrive, so verify immediately.
      ...(DEMO_FORMS_SILENT && { emailVerified: new Date() }),
    },
  });

  if (DEMO_FORMS_SILENT) {
    return { success: "Account created! You can log in now." };
  }

  const emailVerificationToken = await generateEmailVerificationToken(email);
  const result = await sendEmailVerificationToken(
    emailVerificationToken.email,
    emailVerificationToken.token
  );

  if (result.error) {
    return {
      error:
        typeof result.error === "string"
          ? result.error
          : "Something went wrong while sending the verification email! Try to login to resend the verification email!",
    };
  }

  return { success: "Verification email sent!" };
};
