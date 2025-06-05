import { useFormularioTarea } from "../hooks/useFormularioTarea";
import { usoTareasStore } from "../store/useTareasStore";
import type { Tarea } from "../types/Tarea";
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
        if (modo === "editar" && tarea) {
          await usoTareasStore.getState().actualizarTarea(tarea._id, datos);
        } else {
          await usoTareasStore.getState().agregarTarea(datos);
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
      className="bg-[#0f172a] text-white p-8 rounded-2xl shadow-xl max-w-xl mx-auto space-y-6 border border-violet-600"
    >
      <h2 className="text-3xl font-bold text-violet-400 mb-2">
        {modo === "editar" ? "Editar Tarea" : "Crear Nueva Tarea"}
      </h2>

      <div>
        <label className="block mb-1 text-sm font-medium">Título</label>
        <input
          type="text"
          {...register("titulo")}
          placeholder="Título de la tarea"
          className="w-full bg-slate-800 border border-violet-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        {errores.titulo && (
          <p className="text-red-400 text-xs mt-1">{errores.titulo.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Descripción</label>
        <textarea
          {...register("descripcion")}
          placeholder="Descripción detallada de la tarea"
          className="w-full bg-slate-800 border border-violet-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        {errores.descripcion && (
          <p className="text-red-400 text-xs mt-1">
            {errores.descripcion.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Fecha Límite</label>
        <input
          type="date"
          {...register("fechaLimite")}
          min={new Date().toISOString().split("T")[0]}
          className="w-full bg-slate-800 border border-violet-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        {errores.fechaLimite && (
          <p className="text-red-400 text-xs mt-1">
            {errores.fechaLimite.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Prioridad</label>
        <select
          {...register("prioridad")}
          className="w-full bg-slate-800 border border-violet-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
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

      <div>
        <label className="block mb-1 text-sm font-medium">Categoría</label>
        <select
          {...register("categoria")}
          className="w-full bg-slate-800 border border-violet-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
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
          className="bg-violet-600 hover:bg-violet-700 px-6 py-2 rounded-lg text-white font-semibold"
        >
          {modo === "editar" ? "Guardar Cambios" : "Crear Tarea"}
        </button>
      </div>
    </form>
  );
};
