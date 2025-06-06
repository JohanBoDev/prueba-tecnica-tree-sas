import { z } from "zod";

export const esquemaTarea = z.object({
  titulo: z.string().trim().min(1, "El título es obligatorio"),
  descripcion: z.string().trim().min(1, "La descripción es obligatoria"),
  fechaLimite: z.string().trim().min(1, "La fecha límite es obligatoria"),
  prioridad: z.enum(["Alta", "Media", "Baja"], {
    required_error: "La prioridad es obligatoria",
    invalid_type_error: "La prioridad es obligatoria", 
  }),
  categoria: z.enum(["Trabajo", "Personal", "Estudio"], {
    required_error: "La categoría es obligatoria",
    invalid_type_error: "La categoría es obligatoria", 
  }),
});

export type DatosTarea = z.infer<typeof esquemaTarea>;