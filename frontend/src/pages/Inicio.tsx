import { useEffect, useState } from "react";
import { usoTareasStore } from "../store/useTareasStore";
import { ModalCrearTarea } from "../components/ModalCrearTarea";
import { ListaTareas } from "../components/ListaTareas";
import type { Tarea } from "../types/Tarea";
import { PlusCircle, CheckCircle } from "lucide-react";

export const Inicio = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tareaSeleccionada, setTareaSeleccionada] = useState<Tarea | null>(
    null
  );

  const { tareas, obtenerTodas, eliminarPorId, completarPorId } =
    usoTareasStore();

  // Estados de filtros
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [prioridad, setPrioridad] = useState("");
  const [ordenarPor, setOrdenarPor] = useState("fechaLimite");
  const [ascendente, setAscendente] = useState(true);

  // Estado de paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const tareasPorPagina = 3; // 3 tareas por página

  useEffect(() => {
    obtenerTodas(); 
  }, [obtenerTodas]);

  // Resetear a la página 1 cuando se cambien los filtros
  useEffect(() => {
    setPaginaActual(1);
  }, [busqueda, categoria, estadoFiltro, prioridad, ordenarPor, ascendente]);

  // Aplicar filtros
  const tareasFiltradas = tareas
    .filter(
      (t) =>
        t.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        t.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    )
    .filter((t) => (categoria ? t.categoria === categoria : true))
    .filter((t) => (estadoFiltro ? t.estado === estadoFiltro : true))
    .filter((t) => (prioridad ? t.prioridad === prioridad : true))
    .sort((a, b) => {
      const valorA = new Date(a[ordenarPor as keyof Tarea] as string).getTime();
      const valorB = new Date(b[ordenarPor as keyof Tarea] as string).getTime();
      return ascendente ? valorA - valorB : valorB - valorA;
    });

  // Calcular páginas
  const totalPaginasFiltradas = Math.ceil(
    tareasFiltradas.length / tareasPorPagina
  );
  const tareasPaginadas = tareasFiltradas.slice(
    (paginaActual - 1) * tareasPorPagina,
    paginaActual * tareasPorPagina
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-[#432DD7] py-10 px-4">
      {/* Header */}
      <div className="flex justify-between sm:items-center gap-4 max-w-5xl mx-auto mb-6 px-4 py-7 bg-[#111827] border border-indigo-600 rounded-xl shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          <span className="text-indigo-600">Todo</span>List
        </h1>

        <p className="hidden sm:flex text-gray-300 text-sm items-center gap-2">
          <CheckCircle className="w-4 h-4 text-indigo-400" />
          Organiza tus tareas de forma sencilla y efectiva.
        </p>

        <button
          onClick={() => setMostrarModal(true)}
          className="p-3 cursor-pointer sm:px-6 sm:py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 flex items-center justify-center sm:space-x-2 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
          <PlusCircle size={22} />
          <span className="hidden sm:flex text-base sm:text-lg font-semibold">
            Nueva Tarea
          </span>
        </button>
      </div>

      {/* Lista de tareas con filtro */}
      <section className="max-w-5xl mx-auto space-y-4">
        <ListaTareas
          tareas={tareasPaginadas}
          onEliminar={eliminarPorId}
          onCompletar={completarPorId}
          onEditar={(t) => {
            setTareaSeleccionada(t);
            setMostrarModal(true);
          }}
          paginaActual={paginaActual}
          setPaginaActual={setPaginaActual}
          totalPaginas={totalPaginasFiltradas}
          filtros={{
            busqueda,
            categoria,
            estadoFiltro,
            prioridad,
            ordenarPor,
            ascendente,
          }}
          setFiltros={{
            setBusqueda,
            setCategoria,
            setEstadoFiltro,
            setPrioridad,
            setOrdenarPor,
            setAscendente,
          }}
        />
      </section>

      {/* Modal Crear/Editar */}
      <ModalCrearTarea
        visible={mostrarModal}
        cerrar={() => {
          setMostrarModal(false);
          setTareaSeleccionada(null);
        }}
        modo={tareaSeleccionada ? "editar" : "crear"}
        tarea={tareaSeleccionada || undefined}
      />
    </div>
  );
};
