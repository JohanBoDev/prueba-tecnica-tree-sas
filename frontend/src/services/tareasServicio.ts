import axios from "axios"
import type { DatosTarea } from "../validations/esquemaTarea"

const API = import.meta.env.VITE_API_URL

const clienteAxios = axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
})

export async function crearTarea(data: DatosTarea) {
  const respuesta = await clienteAxios.post("/tareas/crear", data)
  return respuesta.data
}

export async function obtenerTareas(params = {}) {
  const respuesta = await clienteAxios.get("/tareas/obtener", {
    params,
  });
  return respuesta.data;
}
export async function obtenerTareaPorId(id: string) {
  const respuesta = await clienteAxios.get(`/tareas/obtenerPorId/${id}`)
  return respuesta.data
}

export async function actualizarTarea(id: string, data: Partial<DatosTarea>) {
  const respuesta = await clienteAxios.put(`/tareas/actualizar/${id}`, data)
  return respuesta.data
}

export async function eliminarTarea(id: string) {
  const respuesta = await clienteAxios.delete(`/tareas/eliminar/${id}`)
  return respuesta.data
}

export async function completarTarea(id: string) {
  const respuesta = await clienteAxios.put(`/tareas/actualizar/${id}`, {
    estado: "Completada",
  })
  return respuesta.data
}