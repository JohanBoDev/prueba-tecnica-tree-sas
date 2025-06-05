export interface Tarea {
  _id: string;
  titulo: string;
  descripcion: string;
  fechaLimite: string; 
  prioridad: "Alta" | "Media" | "Baja";
  categoria: "Trabajo" | "Personal" | "Estudio";
  estado: "Pendiente" | "Completada";
  activa?: boolean; 
}

