import { render, screen, fireEvent } from "@testing-library/react";
import { FormularioTarea } from "../components/FormularioTarea";
import { describe, expect, test } from "vitest";

describe("FormularioTarea", () => {
  test("renderiza el formulario correctamente", () => {
    render(<FormularioTarea />);

    expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fecha Límite/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Prioridad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Categoría/i)).toBeInTheDocument();
  });

  test("muestra errores si se intenta enviar vacío", async () => {
    render(<FormularioTarea />);

    const boton = screen.getByRole("button", { name: /crear tarea/i });
    fireEvent.click(boton);

   

    expect(
      await screen.findByText(/El título es obligatorio/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/La descripción es obligatoria/i)
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/La fecha límite es obligatoria/i)
    ).toBeInTheDocument();

    expect(
      await screen.findByText(
        /Invalid enum value. Expected 'Alta' | 'Media' | 'Baja', received ""/i
      )
    ).toBeInTheDocument();

    expect(
      await screen.findByText(
        /Invalid enum value. Expected 'Trabajo' | 'Personal' | 'Estudio', received ""/i
      )
    ).toBeInTheDocument();
  });
});
