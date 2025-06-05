import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { esquemaTarea } from "../validations/esquemaTarea";
import type { DatosTarea } from "../validations/esquemaTarea";

export function useFormularioTarea(
  onSubmit: (data: DatosTarea) => void,
  valoresIniciales?: Partial<DatosTarea>
) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<DatosTarea>({
    resolver: zodResolver(esquemaTarea),
    mode: "onTouched",
    defaultValues: valoresIniciales, 
  });

  return {
    register,
    handleSubmit,
    errores: errors,
    procesarEnvio: handleSubmit(onSubmit),
    reset
  };
}
