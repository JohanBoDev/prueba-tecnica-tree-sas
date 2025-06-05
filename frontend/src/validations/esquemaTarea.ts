import { z } from "zod"

export const esquemaTarea = z.object({
  titulo: z.string().trim().min(1, "El título es obligatorio"),
  descripcion: z.string().trim().min(1, "La descripción es obligatoria"),
  fechaLimite: z.string().trim().min(1, "La fecha límite es obligatoria"),
  prioridad: z
    .string()
    .refine((val) => ["Alta", "Media", "Baja"].includes(val), {
      message: "La prioridad es obligatoria",
    }),
  categoria: z
    .string()
    .refine((val) => ["Trabajo", "Personal", "Estudio"].includes(val), {
      message: "La categoría es obligatoria",
    }),
})

export type DatosTarea = z.infer<typeof esquemaTarea>