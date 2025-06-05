export interface Tarea {
  _id: string;
  titulo: string;
  descripcion: string;
  fechaLimite: string; // Puede ser Date si lo parseas antes
  prioridad: "Alta" | "Media" | "Baja";
  categoria: "Trabajo" | "Personal" | "Estudio";
  estado: "Pendiente" | "Completada";
  activa?: boolean; // si usas soft delete
}