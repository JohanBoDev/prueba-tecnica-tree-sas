import { useFormularioTarea } from "../hooks/useFormularioTarea";
import { usoTareasStore } from "../store/useTareasStore";
import type { Tarea } from "../types/Tarea";
import type { DatosTarea } from "../validations/esquemaTarea";

interface FormularioTareaProps {
  tarea?: Tarea;
  modo?: "crear" | "editar";
  onCancelar?: () => void;
}

export const FormularioTarea = ({
  tarea,
  modo = "crear",
  onCancelar,
}: FormularioTareaProps) => {
  const { register, procesarEnvio, errores, reset } = useFormularioTarea(
    async (datos) => {
      try {
        // Si se está en modo editar, y se borró un campo, lo reemplazamos por el valor original
        const datosFinales: DatosTarea =
          modo === "editar" && tarea
            ? {
                titulo: datos.titulo.trim() || tarea.titulo,
                descripcion: datos.descripcion.trim() || tarea.descripcion,
                fechaLimite: datos.fechaLimite || tarea.fechaLimite,
                prioridad: datos.prioridad || tarea.prioridad,
                categoria: datos.categoria || tarea.categoria,
              }
            : datos;

        if (modo === "editar" && tarea) {
          await usoTareasStore
            .getState()
            .actualizarTarea(tarea._id, datosFinales);
        } else {
          await usoTareasStore.getState().agregarTarea(datosFinales);
        }

        reset();
        onCancelar?.();
      } catch (error) {
        console.error("Error al procesar tarea:", error);
      }
    },
    tarea // valores iniciales
  );

  return (
    <form
      onSubmit={procesarEnvio}
      className="bg-[#0f172a] text-white p-8 rounded-2xl shadow-xl max-w-xl mx-auto space-y-6 border border-indigo-600"
    >
      <h2 className="text-3xl font-bold text-violet-400 mb-2 border-b border-indigo-600 pb-2">
        {modo === "editar" ? "Editar Tarea" : "Crear Nueva Tarea"}
      </h2>

      {/* Título */}
      <div>
        <label htmlFor="titulo-input" className="block mb-1 text-sm font-medium">Título</label> {/* Añadir htmlFor */}
        <input
          id="titulo-input" // Añadir id
          type="text"
          {...register("titulo")}
          placeholder="Título de la tarea"
          className="w-full bg-slate-800 border border-indigo-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errores.titulo && (
          <p className="text-red-400 text-xs mt-1">{errores.titulo.message}</p>
        )}
      </div>

      {/* Descripción */}
      <div>
        <label htmlFor="descripcion-textarea" className="block mb-1 text-sm font-medium">Descripción</label> {/* Añadir htmlFor */}
        <textarea
          id="descripcion-textarea" // Añadir id
          {...register("descripcion")}
          placeholder="Descripción detallada de la tarea"
          className="w-full bg-slate-800 border border-indigo-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none max-h-40"
        />
        {errores.descripcion && (
          <p className="text-red-400 text-xs mt-1">
            {errores.descripcion.message}
          </p>
        )}
      </div>

      {/* Fecha Límite */}
      <div>
        <label htmlFor="fechaLimite-input" className="block mb-1 text-sm font-medium">Fecha Límite</label> {/* Añadir htmlFor */}
        <input
          id="fechaLimite-input" // Añadir id
          type="date"
          {...register("fechaLimite")}
          min={new Date().toISOString().split("T")[0]}
          className="w-full bg-slate-800 border border-indigo-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
        {errores.fechaLimite && (
          <p className="text-red-400 text-xs mt-1">
            {errores.fechaLimite.message}
          </p>
        )}
      </div>

      {/* Prioridad */}
      <div>
        <label htmlFor="prioridad-select" className="block mb-1 text-sm font-medium">Prioridad</label> {/* Añadir htmlFor */}
        <select
          id="prioridad-select" // Añadir id
          {...register("prioridad")}
          className="w-full bg-slate-800 border border-indigo-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          <option value="">Selecciona una prioridad</option>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
        {errores.prioridad && (
          <p className="text-red-400 text-xs mt-1">
            {errores.prioridad.message}
          </p>
        )}
      </div>

      {/* Categoría */}
      <div>
        <label htmlFor="categoria-select" className="block mb-1 text-sm font-medium">Categoría</label> {/* Añadir htmlFor */}
        <select
          id="categoria-select" // Añadir id
          {...register("categoria")}
          className="w-full bg-slate-800 border border-indigo-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        >
          <option value="">Selecciona una categoría</option>
          <option value="Trabajo">Trabajo</option>
          <option value="Personal">Personal</option>
          <option value="Estudio">Estudio</option>
        </select>
        {errores.categoria && (
          <p className="text-red-400 text-xs mt-1">
            {errores.categoria.message}
          </p>
        )}
      </div>


      {/* Botones */}
      <div className="flex justify-end gap-4 pt-4">
        {modo === "editar" && (
          <button
            type="button"
            onClick={onCancelar}
            className="bg-slate-600 hover:bg-slate-700 px-6 py-2 rounded-lg text-white font-semibold"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-violet-700 px-6 py-2 rounded-lg text-white font-semibold"
        >
          {modo === "editar" ? "Guardar Cambios" : "Crear Tarea"}
        </button>
      </div>
    </form>
  );
};
