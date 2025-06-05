import { create } from "zustand";
import { toast } from "react-hot-toast";

import {
  obtenerTareas,
  crearTarea,
  eliminarTarea,
  completarTarea,
  actualizarTarea,
} from "../services/tareasServicio";
import type { DatosTarea } from "../validations/esquemaTarea";

interface Tarea extends DatosTarea {
  _id: string;
  estado: "Pendiente" | "Completada";
  activa: boolean;
}

interface EstadoTareas {
  tareas: Tarea[];
  cargando: boolean;
  obtenerTodas: () => Promise<void>;
  agregarTarea: (tarea: DatosTarea) => Promise<void>;
  eliminarPorId: (id: string) => Promise<void>;
  completarPorId: (id: string) => Promise<void>;
  actualizarTarea: (id: string, datos: DatosTarea) => Promise<void>;
}

export const usoTareasStore = create<EstadoTareas>((set) => ({
  tareas: [],
  cargando: false,

obtenerTodas: async () => {
  set({ cargando: true });
  try {
    const datos = await obtenerTareas(); 
    set({
      tareas: datos.tareas,
      cargando: false,
    });
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    set({ cargando: false });
  }
},


  agregarTarea: async (tarea) => {
    try {
      const nueva = await crearTarea(tarea);
      set((state) => ({ tareas: [...state.tareas, nueva] }));
      toast.success("Tarea creada exitosamente");
    } catch (error) {
      console.error("Error al crear tarea:", error);
      toast.error("Error al crear la tarea");
    }
  },

  eliminarPorId: async (id) => {
    try {
      await eliminarTarea(id);
      set((state) => ({
        tareas: state.tareas.filter((t) => t._id !== id),
      }));
      toast.success("Tarea eliminada exitosamente");
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
      toast.error("Error al eliminar la tarea");
    }
  },

  completarPorId: async (id) => {
    try {
      const tareaActualizada = await completarTarea(id);
      set((state) => ({
        tareas: state.tareas.map((t) =>
          t._id === id ? { ...t, estado: tareaActualizada.estado } : t
        ),
      }));
      toast.success("Tarea completada exitosamente");
    } catch (error) {
      console.error("Error al completar tarea:", error);
      toast.error("Error al completar la tarea");
    }
  },
actualizarTarea: async (id, datos) => {
  try {
    const tareaActualizada = await actualizarTarea(id, datos); // Corregido
    set((state) => ({
      tareas: state.tareas.map((t) => (t._id === id ? tareaActualizada : t)),
    }));
    toast.success("Tarea actualizada exitosamente");
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    toast.error("Error al actualizar la tarea");
  }
}
}));
