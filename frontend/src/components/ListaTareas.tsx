import { TarjetaTarea } from "./TarjetaTarea";
import type { Tarea } from "../types/Tarea";
import { Search, Filter, Star, List, SortAsc } from "lucide-react";

interface Props {
  tareas: Tarea[];
  onEliminar: (id: string) => void;
  onCompletar: (id: string) => void;
  onEditar: (tarea: Tarea) => void;
  paginaActual: number;
  setPaginaActual: React.Dispatch<React.SetStateAction<number>>;
  totalPaginas: number;
  filtros: {
    busqueda: string;
    categoria: string;
    estadoFiltro: string;
    prioridad: string;
    ordenarPor: string;
    ascendente: boolean;
  };
  setFiltros: {
    setBusqueda: React.Dispatch<React.SetStateAction<string>>;
    setCategoria: React.Dispatch<React.SetStateAction<string>>;
    setEstadoFiltro: React.Dispatch<React.SetStateAction<string>>;
    setPrioridad: React.Dispatch<React.SetStateAction<string>>;
    setOrdenarPor: React.Dispatch<React.SetStateAction<string>>;
    setAscendente: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export const ListaTareas = ({
  tareas,
  onEliminar,
  onCompletar,
  onEditar,
  paginaActual,
  setPaginaActual,
  totalPaginas,
  filtros,
  setFiltros,
}: Props) => {
  return (
    <section className="max-w-5xl mx-auto space-y-4 p-10 bg-[#111827] border border-indigo-600 rounded-xl shadow-lg">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white border-b border-indigo-600 pb-5">
        Mis tareas
      </h1>

      {/* Filtros - Grid 2 columnas arriba */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {/* 🔍 Buscar */}
        <div className="flex items-center  border border-indigo-600 rounded-lg px-3 py-2 text-sm text-gray-300 w-full">
          <Search className="h-4 w-4 mr-2 text-indigo-600" />
          <input
            type="text"
            placeholder="Buscar por título o descripción"
            value={filtros.busqueda}
            onChange={(e) => setFiltros.setBusqueda(e.target.value)}
            className="bg-[#111827] focus:outline-none placeholder-gray-400 text-white w-full"
          />
        </div>

        {/* 📂 Categoría */}
        <div className="flex items-center  border border-indigo-600 rounded-lg px-3 py-2 text-sm text-white w-full">
          <List className="h-4 w-4 mr-2 text-indigo-600" />
          <select
            value={filtros.categoria}
            onChange={(e) => setFiltros.setCategoria(e.target.value)}
            aria-label="Categoría"
            className="bg-[#111827] focus:outline-none w-full"
          >
            <option value="">Todas las Categorías</option>
            <option>Trabajo</option>
            <option>Estudio</option>
            <option>Personal</option>
          </select>
        </div>
      </div>

      {/* Filtros - Grid 3 columnas abajo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        {/* 🏁 Estado */}
        <div className="flex items-center  border border-indigo-600 rounded-lg px-3 py-2 text-sm text-white w-full">
          <Filter className="h-4 w-4 mr-2 text-indigo-600" />
          <select
            value={filtros.estadoFiltro}
            onChange={(e) => setFiltros.setEstadoFiltro(e.target.value)}
            aria-label="Estado"
            className="bg-[#111827] focus:outline-none w-full"
          >
            <option value="">Todos los Estados</option>
            <option>Pendiente</option>
            <option>Completada</option>
          </select>
        </div>

        {/* 🎯 Prioridad */}
        <div className="flex items-center  border border-indigo-600 rounded-lg px-3 py-2 text-sm text-white w-full">
          <Star className="h-4 w-4 mr-2 text-indigo-600" />
          <select
            value={filtros.prioridad}
            onChange={(e) => setFiltros.setPrioridad(e.target.value)}
            aria-label="Prioridad"
            className="bg-[#111827] focus:outline-none w-full"
          >
            <option value="">Todas las Prioridades</option>
            <option>Alta</option>
            <option>Media</option>
            <option>Baja</option>
          </select>
        </div>

        {/* ⬆️ Ordenar por */}
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 w-full  border border-indigo-600 rounded-lg px-3 py-2 text-sm text-white">
          <div className="flex items-center gap-2 flex-1 min-w-[180px]">
            <span className="text-gray-300 whitespace-nowrap">
              Ordenar por:
            </span>
            <select
              value={filtros.ordenarPor}
              onChange={(e) => setFiltros.setOrdenarPor(e.target.value)}
              aria-label="Ordenar por"
              className="flex-1 bg-[#111827] text-white focus:outline-none rounded-md border border-transparent px-2 py-1"
            >
              <option value="fechaLimite">Fecha Límite</option>
              <option value="fechaCreacion">Fecha Creación</option>
            </select>
          </div>

          <button
            onClick={() => setFiltros.setAscendente((prev) => !prev)}
            className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white transition-all duration-200 shadow-sm"
            title={`Ordenar ${
              filtros.ascendente ? "Ascendente" : "Descendente"
            }`}
            data-testid="sort-direction-button"
          >
            <SortAsc
              className={`${
                !filtros.ascendente ? "rotate-180" : ""
              } transition-transform duration-200`}
              size={20}
            />
          </button>
        </div>
      </div>

{tareas.length === 0 ? (
  <p className="text-center text-gray-500 text-sm">
    No se encontraron tareas que coincidan con los filtros.
  </p>
) : (
  tareas.map((tarea) => (
    <TarjetaTarea
      key={tarea._id}
      titulo={tarea.titulo}
      descripcion={tarea.descripcion}
      fechaLimite={tarea.fechaLimite}
      prioridad={tarea.prioridad}
      categoria={tarea.categoria}
      estado={tarea.estado}
      onEliminar={() => onEliminar(tarea._id)}
      onCompletar={() => onCompletar(tarea._id)}
      onEditar={() => onEditar(tarea)}
    />
  ))
)}


  <div className="flex justify-center items-center gap-3 pt-6">
    <button
      onClick={() => paginaActual > 1 && setPaginaActual(paginaActual - 1)}
      disabled={paginaActual === 1}
      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Anterior
    </button>
    <span className="text-gray-300">
      Página {paginaActual} de {totalPaginas}
    </span>
    <button
      onClick={() => paginaActual < totalPaginas && setPaginaActual(paginaActual + 1)}
      disabled={paginaActual === totalPaginas}
      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Siguiente
    </button>
  </div>


    </section>
  );
};
