import type { FC } from "react";
import {
  Pencil,
  FlagTriangleRight,
  AlertCircle,
  CircleDashed,
  Briefcase,
  BookOpen,
  User,
} from "lucide-react";

interface Props {
  titulo: string;
  descripcion: string;
  fechaLimite: string;
  prioridad: "Alta" | "Media" | "Baja";
  categoria: "Trabajo" | "Personal" | "Estudio";
  estado: "Pendiente" | "Completada";
  onEliminar?: () => void;
  onCompletar?: () => void;
  onEditar?: () => void; 
}

export const TarjetaTarea: FC<Props> = ({
  titulo,
  descripcion,
  fechaLimite,
  prioridad,
  categoria,
  estado,
  onEliminar,
  onCompletar,
  onEditar, 
}) => {
  const priorityStyles = {
    Alta: {
      border: "border-rose-500",
      text: "text-rose-400",
      iconFill: "fill-rose-400",
    },
    Media: {
      border: "border-amber-500",
      text: "text-amber-400",
      iconFill: "fill-amber-400",
    },
    Baja: {
      border: "border-sky-500",
      text: "text-sky-400",
      iconFill: "fill-sky-400",
    },
  };

  const currentPriorityStyle = priorityStyles[prioridad] || {
    border: "border-slate-600",
    text: "text-slate-400",
    iconFill: "fill-slate-400",
  };
  const priorityIcons = {
    Alta: (
      <AlertCircle
        className={`h-4 w-4 mr-1 ${currentPriorityStyle.iconFill}`}
      />
    ),
    Media: (
      <FlagTriangleRight
        className={`h-4 w-4 mr-1 ${currentPriorityStyle.iconFill}`}
      />
    ),
    Baja: (
      <CircleDashed
        className={`h-4 w-4 mr-1 ${currentPriorityStyle.iconFill}`}
      />
    ),
  };

  const categoryIcons = {
    Trabajo: <Briefcase className="h-4 w-4 mr-1.5 text-slate-400" />,
    Estudio: <BookOpen className="h-4 w-4 mr-1.5 text-slate-400" />,
    Personal: <User className="h-4 w-4 mr-1.5 text-slate-400" />,
  };

  return (
    <div
      className={`relative bg-slate-800/80 backdrop-blur-sm shadow-2xl rounded-xl p-6 space-y-4 border-l-4 ${currentPriorityStyle.border} transition-all duration-300 hover:shadow-slate-900/50 hover:bg-slate-800`}
    >
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-lg font-semibold text-slate-100 flex-grow">
          {titulo}
        </h3>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${
            estado === "Completada"
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-amber-500/20 text-amber-400"
          }`}
        >
          {estado}
        </span>
        <button
          onClick={onEditar}
          className=" p-2 rounded-full bg-slate-700 hover:bg-slate-600 text-white shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500"
          title="Editar tarea"
        >
          <Pencil size={18} />
        </button>
      </div>

      {descripcion && (
        <p className="text-sm text-slate-400 leading-relaxed">{descripcion}</p>
      )}

      <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs pt-1 text-slate-500 items-center">
        <span className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 mr-1.5 fill-current"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clipRule="evenodd"
            />
          </svg>
          <p className="mr-1">La fecha limite es: </p>

          {/* Modificación aquí: */}
          {new Date(fechaLimite).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "short",
            day: "numeric",
            timeZone: "UTC", // Asegura que la fecha se formatee como UTC
          })}
        </span>
        <span
          className={`flex items-center font-medium ${currentPriorityStyle.text}`}
        >
          {priorityIcons[prioridad]}
          {prioridad}
        </span>
        <span className="flex items-center">
          {categoryIcons[categoria]}
          {categoria}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4 mt-2 border-t border-slate-700/70">
        {estado !== "Completada" && (
          <button
            onClick={onCompletar}
            className="flex-1 bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium px-4 py-2.5 rounded-lg shadow-md hover:shadow-sky-500/30 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            Marcar como completada
          </button>
        )}
        <button
          onClick={onEliminar}
          className={`flex-1 ${
            estado === "Completada" ? "w-full" : ""
          } bg-transparent hover:bg-rose-500/10 border border-rose-500/60 hover:border-rose-500 text-rose-400 hover:text-rose-300 text-sm font-medium px-4 py-2.5 rounded-lg shadow-sm transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-slate-800`}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
