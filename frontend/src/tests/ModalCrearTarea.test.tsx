import { render, screen, fireEvent } from "@testing-library/react";
import { ModalCrearTarea } from "../components/ModalCrearTarea";
import { describe, expect, test, vi } from "vitest";
import type { Tarea } from "../types/Tarea";

// Mock del FormularioTarea para aislar las pruebas de ModalCrearTarea.
// No nos interesa cómo funciona FormularioTarea aquí, solo que se renderice
// cuando el modal está visible y que reciba las props correctas.
import { FormularioTarea } from '../components/FormularioTarea'; // Importa el componente real que Vitest mockeará

vi.mock("../components/FormularioTarea", () => ({
  FormularioTarea: vi.fn((props) => (
    <div data-testid="mock-formulario-tarea">
      {/* Podemos renderizar un título mockeado para identificar el modo */}
      <h2>{props.modo === "editar" ? "Editar Tarea Mock" : "Crear Nueva Tarea Mock"}</h2>
      {/* Simula el botón de Cancelar del formulario si onCancelar se pasa */}
      {props.onCancelar && (
        <button onClick={props.onCancelar}>Cancelar Formulario Mock</button>
      )}
      {/* Puedes renderizar más props aquí si necesitas asertar que se pasan,
          aunque para ModalCrearTarea, verificar modo y tarea suele ser suficiente. */}
    </div>
  )),
}));

describe("ModalCrearTarea", () => {
  const mockCerrar = vi.fn(); // Mock para la función 'cerrar'

  // Mock de una tarea para el modo editar
  const mockTarea: Tarea = {
    _id: "tarea-edit-id",
    titulo: "Tarea para Editar",
    descripcion: "Descripción de la tarea a editar",
    fechaLimite: "2025-07-20",
    prioridad: "Media",
    categoria: "Trabajo",
    estado: "Pendiente",
  };

  beforeEach(() => {
    vi.clearAllMocks(); // Limpia los mocks antes de cada test
  });

  test("no renderiza el modal ni el formulario cuando 'visible' es false", () => {
    render(<ModalCrearTarea visible={false} cerrar={mockCerrar} />);

    // Aseguramos que el modal y el formulario mockeado no estén en el documento
    expect(screen.queryByTestId("mock-formulario-tarea")).not.toBeInTheDocument();
    expect(screen.queryByText(/Crear Nueva Tarea Mock/i)).not.toBeInTheDocument();
  });

  test("renderiza el modal y el FormularioTarea en modo 'crear' cuando 'visible' es true", () => {
    render(<ModalCrearTarea visible={true} cerrar={mockCerrar} modo="crear" />);

    expect(screen.getByTestId("mock-formulario-tarea")).toBeInTheDocument();
    expect(screen.getByText(/Crear Nueva Tarea Mock/i)).toBeInTheDocument();
    
    expect(FormularioTarea).toHaveBeenCalledWith(
      expect.objectContaining({
        modo: "crear",
        tarea: undefined, // En modo crear, tarea no debe pasarse
        onCancelar: expect.any(Function), // onCancelar es una función mockeada
      }),
      // *** CORRECCIÓN AQUÍ: Espera 'undefined' explícitamente para el segundo argumento ***
      undefined
    );
  });

  test("renderiza el modal y el FormularioTarea en modo 'editar' con datos de tarea cuando 'visible' es true", () => {
    render(<ModalCrearTarea visible={true} cerrar={mockCerrar} modo="editar" tarea={mockTarea} />);

    expect(screen.getByTestId("mock-formulario-tarea")).toBeInTheDocument();
    expect(screen.getByText(/Editar Tarea Mock/i)).toBeInTheDocument();

    expect(FormularioTarea).toHaveBeenCalledWith(
      expect.objectContaining({
        modo: "editar",
        tarea: mockTarea,
        onCancelar: expect.any(Function), // onCancelar es una función mockeada
      }),
      // *** CORRECCIÓN AQUÍ: Espera 'undefined' explícitamente para el segundo argumento ***
      undefined
    );
  });

  test("llama a la función 'cerrar' cuando se hace clic en el botón 'X' del modal", () => {
    render(<ModalCrearTarea visible={true} cerrar={mockCerrar} />);

    const botonCerrar = screen.getByRole("button", { name: /✕/i }); // El carácter '✕' para cerrar
    fireEvent.click(botonCerrar);

    expect(mockCerrar).toHaveBeenCalledTimes(1);
  });

  test("llama a la función 'cerrar' a través de 'onCancelar' del formulario cuando el formulario está en modo 'editar'", () => {
    render(<ModalCrearTarea visible={true} cerrar={mockCerrar} modo="editar" tarea={mockTarea} />);

    // El mock de FormularioTarea renderiza un botón "Cancelar Formulario Mock" que llama a onCancelar
    const botonCancelarFormulario = screen.getByRole("button", { name: /Cancelar Formulario Mock/i });
    fireEvent.click(botonCancelarFormulario);

    expect(mockCerrar).toHaveBeenCalledTimes(1);
  });
});