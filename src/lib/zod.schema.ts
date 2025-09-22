import { z } from "zod";

export const loginZodSchema = z.object({
    email: z.string().trim().pipe(z.email("Ingresa un correo electrónico válido.")),
    password: z.string().min(6, "Ingresa una contraseña con al menos 6 caracteres."),
});

export const registerZodSchema = z.object({
    displayName: z.string().min(1, "El nombre es obligatorio.").max(50, "El nombre no puede tener más de 50 caracteres."),
    email: z.string().trim().pipe(z.email("Ingresa un correo electrónico válido.")),
    password: z.string().min(6, "Ingresa una contraseña con al menos 6 caracteres."),
    confirmPassword: z.string().min(6, "Debes confirmar tu contraseña con al menos 6 caracteres."),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
});

export const profileZodSchema = z.object({
    displayName: z.string().min(1, "El nombre es obligatorio.").max(50, "El nombre no puede tener más de 50 caracteres."),
    photoURL: z.union([z.url("Invalid URL format"), z.literal("")]).optional(),
});

export const taskZodSchema = z.object({
    title: z.string().min(1, "El título es obligatorio.").max(100, "El título no puede tener más de 100 caracteres."),
    description: z.string().max(500, "El título no puede tener más de 500 caracteres.").optional(),
});

export type loginZodSchemaType = z.infer<typeof loginZodSchema>;
export type registerZodSchemaType = z.infer<typeof registerZodSchema>;
export type profileZodSchemaType = z.infer<typeof profileZodSchema>;
export type taskZodSchemaType = z.infer<typeof taskZodSchema>;