import { render, screen, fireEvent } from "@testing-library/react";
import { TarjetaTarea } from "../components/TarjetaTarea";
import { describe, expect, test, vi } from "vitest";

// Mock de una tarea para usar en las pruebas
const mockTarea = {
  _id: "1",
  titulo: "Comprar víveres",
  descripcion: "Leche, pan, huevos, frutas y verduras.",
  fechaLimite: "2025-06-10", 
  prioridad: "Alta" as const,
  categoria: "Personal" as const,
  estado: "Pendiente" as const,
};

describe("TarjetaTarea", () => {
  test("renderiza la tarea correctamente con todos los detalles", () => {
    render(<TarjetaTarea {...mockTarea} />);


    expect(screen.getByText(mockTarea.titulo)).toBeInTheDocument();
    expect(screen.getByText(mockTarea.descripcion)).toBeInTheDocument();
    const dueDateElement = screen.getByTestId("task-due-date");
    expect(dueDateElement).toBeInTheDocument();
    expect(dueDateElement).toHaveTextContent("10 jun 2025");
    expect(screen.getByText(mockTarea.prioridad)).toBeInTheDocument();
    expect(screen.getByText(mockTarea.categoria)).toBeInTheDocument();
    expect(screen.getByText(mockTarea.estado)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /editar tarea/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /eliminar/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /marcar como completada/i })).toBeInTheDocument();
  });

  test("llama a onCompletar cuando se hace clic en 'Marcar como completada'", () => {
    const handleCompletar = vi.fn(); // Mockea la función
    render(<TarjetaTarea {...mockTarea} onCompletar={handleCompletar} />);

    const botonCompletar = screen.getByRole("button", { name: /marcar como completada/i });
    fireEvent.click(botonCompletar);

    expect(handleCompletar).toHaveBeenCalledTimes(1);
  });

  test("no muestra el botón 'Marcar como completada' si el estado es 'Completada'", () => {
    const tareaCompletada = { ...mockTarea, estado: "Completada" as const };
    render(<TarjetaTarea {...tareaCompletada} />);

    expect(screen.queryByRole("button", { name: /marcar como completada/i })).not.toBeInTheDocument();
  });

  test("llama a onEliminar cuando se hace clic en 'Eliminar'", () => {
    const handleEliminar = vi.fn();
    render(<TarjetaTarea {...mockTarea} onEliminar={handleEliminar} />);

    const botonEliminar = screen.getByRole("button", { name: /eliminar/i });
    fireEvent.click(botonEliminar);

    expect(handleEliminar).toHaveBeenCalledTimes(1);
  });

  test("llama a onEditar cuando se hace clic en el botón de edición", () => {
    const handleEditar = vi.fn();
    render(<TarjetaTarea {...mockTarea} onEditar={handleEditar} />);

    const botonEditar = screen.getByRole("button", { name: /editar tarea/i });
    fireEvent.click(botonEditar);

    expect(handleEditar).toHaveBeenCalledTimes(1);
  });
});