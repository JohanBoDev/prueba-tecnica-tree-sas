import { FormularioTarea } from "./FormularioTarea"
import type { Tarea } from "../types/Tarea"

interface Props {
  visible: boolean
  cerrar: () => void
    modo?: "crear" | "editar"; 
  tarea?: Tarea;   

}

export const ModalCrearTarea = ({ visible, cerrar, modo, tarea }: Props) => {
  if (!visible) return null

  return (
    <div className="fixed p-5 inset-0 z-50 bg-transparent backdrop-blur-sm flex items-center justify-center">
      <div className=" w-full max-w-xl relative">
        <button
          onClick={cerrar}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-400 text-2xl font-bold cursor-pointer"
        >
          ✕
        </button>
        <FormularioTarea
          modo={modo}
          tarea={tarea}
          onCancelar={cerrar} // Para que el formulario pueda cerrar el modal
        />
      </div>
    </div>
  )
}
