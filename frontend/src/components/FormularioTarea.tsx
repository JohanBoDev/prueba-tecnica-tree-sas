import { useFormularioTarea } from "../hooks/useFormularioTarea"

export const FormularioTarea = () => {
  const { register, procesarEnvio, errores, reset } = useFormularioTarea((datos) => {
    console.log("Tarea enviada:", datos)
    reset()
  })

  return (
    <form
      onSubmit={procesarEnvio}
      className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto space-y-4"
    >
      <div>
        <label className="block font-semibold">Título</label>
        <input
          type="text"
          {...register("titulo")}
          className="w-full border rounded px-3 py-2"
        />
        {errores.titulo && <p className="text-red-500 text-sm">{errores.titulo.message}</p>}
      </div>

      <div>
        <label className="block font-semibold">Descripción</label>
        <textarea
          {...register("descripcion")}
          className="w-full border rounded px-3 py-2"
        />
        {errores.descripcion && <p className="text-red-500 text-sm">{errores.descripcion.message}</p>}
      </div>

      <div>
        <label className="block font-semibold">Fecha Límite</label>
        <input
          type="date"
          {...register("fechaLimite")}
          className="w-full border rounded px-3 py-2"
        />
        {errores.fechaLimite && <p className="text-red-500 text-sm">{errores.fechaLimite.message}</p>}
      </div>

      <div>
        <label className="block font-semibold">Prioridad</label>
        <select {...register("prioridad")} className="w-full border rounded px-3 py-2">
          <option value="">Selecciona una prioridad</option>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
        {errores.prioridad && <p className="text-red-500 text-sm">{errores.prioridad.message}</p>}
      </div>

      <div>
        <label className="block font-semibold">Categoría</label>
        <select {...register("categoria")} className="w-full border rounded px-3 py-2">
          <option value="">Selecciona una categoría</option>
          <option value="Trabajo">Trabajo</option>
          <option value="Personal">Personal</option>
          <option value="Estudio">Estudio</option>
        </select>
        {errores.categoria && <p className="text-red-500 text-sm">{errores.categoria.message}</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Crear tarea
      </button>
    </form>
  )
}
