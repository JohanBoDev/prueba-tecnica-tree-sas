import { FormularioTarea } from "../components/FormularioTarea"

export const Inicio = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
        Lista de Tareas
      </h1>

      <FormularioTarea />

      {/* Aquí irá la lista de tareas próximamente */}
      <section className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Tareas pendientes</h2>
        <p className="text-gray-500 text-sm">Aún no hay tareas para mostrar.</p>
      </section>
    </div>
  )
}
