import { render, screen, fireEvent } from "@testing-library/react"
import { FormularioTarea } from "../components/FormularioTarea"
import { describe, expect, test} from "vitest"

describe("FormularioTarea", () => {
  test("renderiza el formulario correctamente", () => {
    render(<FormularioTarea />)

    // Estas aserciones ya deberían funcionar si añadiste los htmlFor/id
    expect(screen.getByLabelText(/Título/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Descripción/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Fecha Límite/i)).toBeInTheDocument()
    // Si quieres probar Prioridad y Categoría también
    expect(screen.getByLabelText(/Prioridad/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Categoría/i)).toBeInTheDocument()
  })

  test("muestra errores si se intenta enviar vacío", async () => {
    render(<FormularioTarea />)

    const boton = screen.getByRole("button", { name: /crear tarea/i })
    fireEvent.click(boton)

    // screen.debug(); // Puedes mantener esto si aún quieres ver el DOM para depuración

    // Corregir las expresiones regulares para incluir las tildes
    expect(await screen.findByText(/El título es obligatorio/i)).toBeInTheDocument()
    expect(await screen.findByText(/La descripción es obligatoria/i)).toBeInTheDocument()

    expect(await screen.findByText(/La fecha límite es obligatoria/i)).toBeInTheDocument()

    // Opcional: Probar otros mensajes de error si lo deseas
    expect(await screen.findByText(/La prioridad es obligatoria/i)).toBeInTheDocument()
    expect(await screen.findByText(/La categoría es obligatoria/i)).toBeInTheDocument()
  })
})