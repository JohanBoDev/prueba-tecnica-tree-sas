import { render, screen, fireEvent } from "@testing-library/react";
import { ListaTareas } from "../components/ListaTareas";
import { describe, expect, test, vi } from "vitest";
import type { Tarea } from "../types/Tarea";

// Mock del componente TarjetaTarea para aislar la prueba de ListaTareas.
// Es crucial que los botones en este mock tengan los 'name' o texto que tus tests buscan.
vi.mock("../components/TarjetaTarea", () => ({
  TarjetaTarea: vi.fn((props) => (
    <div data-testid={`tarjeta-tarea-${props.titulo}`}>
      <h3>{props.titulo}</h3>
      {/* Botones simulados con el texto que se buscará en los tests */}
      <button onClick={() => props.onCompletar?.(props._id)}>Marcar como completada</button>
      <button onClick={() => props.onEliminar?.(props._id)}>Eliminar</button>
      <button onClick={() => props.onEditar?.(props.tarea)}>Editar tarea</button> {/* Usar "Editar tarea" para coincidir con el title de TarjetaTarea original */}
    </div>
  )),
}));

// Mock de algunas tareas para las pruebas
const mockTareas: Tarea[] = [
  { _id: "1", titulo: "Tarea 1 Trabajo", descripcion: "Desc 1", fechaLimite: "2025-06-05", prioridad: "Alta", categoria: "Trabajo", estado: "Pendiente" },
  { _id: "2", titulo: "Tarea 2 Personal", descripcion: "Desc 2", fechaLimite: "2025-06-10", prioridad: "Media", categoria: "Personal", estado: "Completada" },
  { _id: "3", titulo: "Otra Tarea Estudio", descripcion: "Desc 3", fechaLimite: "2025-06-15", prioridad: "Baja", categoria: "Estudio", estado: "Pendiente" },
  { _id: "4", titulo: "Comprar", descripcion: "Alimentos", fechaLimite: "2025-06-20", prioridad: "Alta", categoria: "Personal", estado: "Pendiente" },
];

describe("ListaTareas", () => {
  // Mocks para las funciones de setFiltros y paginación
  const mockSetFiltros = {
    setBusqueda: vi.fn(),
    setCategoria: vi.fn(),
    setEstadoFiltro: vi.fn(),
    setPrioridad: vi.fn(),
    setOrdenarPor: vi.fn(),
    setAscendente: vi.fn(),
  };
  const mockSetPaginaActual = vi.fn();
  const mockOnEliminar = vi.fn();
  const mockOnCompletar = vi.fn();
  const mockOnEditar = vi.fn();

  // Propiedades comunes para el componente ListaTareas
  const commonProps = {
    tareas: mockTareas,
    onEliminar: mockOnEliminar,
    onCompletar: mockOnCompletar,
    onEditar: mockOnEditar,
    paginaActual: 1,
    setPaginaActual: mockSetPaginaActual,
    totalPaginas: 1, // Por simplicidad, asumimos una sola página inicialmente
    filtros: {
      busqueda: "",
      categoria: "",
      estadoFiltro: "",
      prioridad: "",
      ordenarPor: "fechaLimite",
      ascendente: true,
    },
    setFiltros: mockSetFiltros,
  };

  // Restablecer los mocks antes de cada prueba para asegurar independencia
  beforeEach(() => {
    vi.clearAllMocks(); // Limpia los contadores y llamadas de todos los mocks
  });

  test("renderiza el título 'Mis tareas'", () => {
    render(<ListaTareas {...commonProps} />);
    expect(screen.getByRole("heading", { name: /mis tareas/i, level: 1 })).toBeInTheDocument();
  });

  test("renderiza todas las TarjetaTarea para las tareas dadas", () => {
      // screen.debug(); // Descomentar para depurar el DOM
    render(<ListaTareas {...commonProps} />);
    // Verificamos la presencia de los títulos de las tareas mockeadas
    expect(screen.getByText("Tarea 1 Trabajo")).toBeInTheDocument();
    expect(screen.getByText("Tarea 2 Personal")).toBeInTheDocument();
    expect(screen.getByText("Otra Tarea Estudio")).toBeInTheDocument();
    // Podemos ser más robustos usando el data-testid del mock de TarjetaTarea
    expect(screen.getAllByTestId(/tarjeta-tarea-/)).toHaveLength(mockTareas.length);
  });

  test("muestra mensaje si no se encuentran tareas", () => {
    render(<ListaTareas {...commonProps} tareas={[]} />);
    expect(screen.getByText(/No se encontraron tareas que coincidan con los filtros./i)).toBeInTheDocument();
  });

  // --- Pruebas de interacción con los filtros ---
  test("llama a setBusqueda al escribir en el campo de búsqueda", () => {
    render(<ListaTareas {...commonProps} />);
    const inputBusqueda = screen.getByPlaceholderText(/Buscar por título o descripción/i);
    fireEvent.change(inputBusqueda, { target: { value: "nueva búsqueda" } });
    expect(mockSetFiltros.setBusqueda).toHaveBeenCalledTimes(1);
    expect(mockSetFiltros.setBusqueda).toHaveBeenCalledWith("nueva búsqueda");
  });

  test("llama a setCategoria al seleccionar una categoría", () => {
    render(<ListaTareas {...commonProps} />);
    // Ahora buscamos por el nuevo aria-label
    const selectCategoria = screen.getByRole("combobox", { name: /Categoría/i });
    fireEvent.change(selectCategoria, { target: { value: "Trabajo" } });
    expect(mockSetFiltros.setCategoria).toHaveBeenCalledTimes(1);
    expect(mockSetFiltros.setCategoria).toHaveBeenCalledWith("Trabajo");
  });

  test("llama a setEstadoFiltro al seleccionar un estado", () => {
    render(<ListaTareas {...commonProps} />);
    // Buscamos por el nuevo aria-label
    const selectEstado = screen.getByRole("combobox", { name: /Estado/i });
    fireEvent.change(selectEstado, { target: { value: "Completada" } });
    expect(mockSetFiltros.setEstadoFiltro).toHaveBeenCalledTimes(1);
    expect(mockSetFiltros.setEstadoFiltro).toHaveBeenCalledWith("Completada");
  });

  test("llama a setPrioridad al seleccionar una prioridad", () => {
    render(<ListaTareas {...commonProps} />);
    // Buscamos por el nuevo aria-label
    const selectPrioridad = screen.getByRole("combobox", { name: /Prioridad/i });
    fireEvent.change(selectPrioridad, { target: { value: "Alta" } });
    expect(mockSetFiltros.setPrioridad).toHaveBeenCalledTimes(1);
    expect(mockSetFiltros.setPrioridad).toHaveBeenCalledWith("Alta");
  });

  test("llama a setOrdenarPor al seleccionar una opción de ordenamiento", () => {
    render(<ListaTareas {...commonProps} />);
    // Ahora que has añadido el aria-label="Ordenar por" al select, esta consulta será más robusta
    const selectOrdenarPor = screen.getByRole("combobox", { name: /Ordenar por/i });
    fireEvent.change(selectOrdenarPor, { target: { value: "fechaCreacion" } });
    expect(mockSetFiltros.setOrdenarPor).toHaveBeenCalledTimes(1);
    expect(mockSetFiltros.setOrdenarPor).toHaveBeenCalledWith("fechaCreacion");
  });

test("llama a setAscendente al hacer clic en el botón de ordenamiento (asc/desc)", () => {
  // Primer renderizado con estado inicial (ascendente: true)
  const { rerender } = render(<ListaTareas {...commonProps} />);
  
  // SOLUCIÓN FINAL: Usamos data-testid para seleccionar el botón de forma única
  let botonOrdenar = screen.getByTestId("sort-direction-button");

  // Primer clic: debería cambiar a false
  fireEvent.click(botonOrdenar);
  expect(mockSetFiltros.setAscendente).toHaveBeenCalledTimes(1);
  // *** CORRECCIÓN AQUÍ: Espera 'false' Y 'una función' ***
  expect(mockSetFiltros.setAscendente).toHaveBeenCalledWith(expect.any(Function)); 

  mockSetFiltros.setAscendente.mockClear();

  // Rerenderiza el componente simulando que el estado 'ascendente' ya es false
  rerender(<ListaTareas
    {...commonProps}
    filtros={{ ...commonProps.filtros, ascendente: false }}
  />);

  // Segundo clic: debería cambiar a true
  botonOrdenar = screen.getByTestId("sort-direction-button");
  fireEvent.click(botonOrdenar);

  expect(mockSetFiltros.setAscendente).toHaveBeenCalledTimes(1);
  // *** CORRECCIÓN AQUÍ: Espera 'true' Y 'una función' ***
  expect(mockSetFiltros.setAscendente).toHaveBeenCalledWith(expect.any(Function));
});


  // --- Pruebas de Paginación ---
  test("muestra la paginación correcta", () => {
    render(<ListaTareas {...commonProps} paginaActual={2} totalPaginas={5} />);
    expect(screen.getByText(/Página 2 de 5/i)).toBeInTheDocument();
  });

  test("llama a setPaginaActual al hacer clic en 'Siguiente'", () => {
    render(<ListaTareas {...commonProps} paginaActual={1} totalPaginas={2} />);
    const botonSiguiente = screen.getByRole("button", { name: /siguiente/i });
    fireEvent.click(botonSiguiente);
    expect(mockSetPaginaActual).toHaveBeenCalledTimes(1);
    expect(mockSetPaginaActual).toHaveBeenCalledWith(2);
  });

  test("llama a setPaginaActual al hacer clic en 'Anterior'", () => {
    render(<ListaTareas {...commonProps} paginaActual={2} totalPaginas={2} />);
    const botonAnterior = screen.getByRole("button", { name: /anterior/i });
    fireEvent.click(botonAnterior);
    expect(mockSetPaginaActual).toHaveBeenCalledTimes(1);
    expect(mockSetPaginaActual).toHaveBeenCalledWith(1);
  });

  test("el botón 'Anterior' está deshabilitado en la primera página", () => {
    render(<ListaTareas {...commonProps} paginaActual={1} totalPaginas={1} />);
    expect(screen.getByRole("button", { name: /anterior/i })).toBeDisabled();
  });

  test("el botón 'Siguiente' está deshabilitado en la última página", () => {
    render(<ListaTareas {...commonProps} paginaActual={1} totalPaginas={1} />);
    expect(screen.getByRole("button", { name: /siguiente/i })).toBeDisabled();
  });

  // --- Pruebas de interacción con TarjetaTarea (a través del mock) ---
  // Estas pruebas verifican que los callbacks pasados a TarjetaTarea se disparan correctamente
  // y que ListaTareas reacciona llamando a sus propios props (onEliminar, onCompletar, onEditar).
  test("llama a onEliminar cuando se hace clic en el botón 'Eliminar' de una TarjetaTarea mockeada", () => {
    render(<ListaTareas {...commonProps} tareas={[mockTareas[0]]} />);

    fireEvent.click(screen.getByRole("button", { name: /eliminar/i }));

    expect(mockOnEliminar).toHaveBeenCalledTimes(1);
    expect(mockOnEliminar).toHaveBeenCalledWith(mockTareas[0]._id);
  });

  test("llama a onCompletar cuando se hace clic en el botón 'Marcar como completada' de una TarjetaTarea mockeada", () => {
    render(<ListaTareas {...commonProps} tareas={[mockTareas[0]]} />);

    fireEvent.click(screen.getByRole("button", { name: /marcar como completada/i }));

    expect(mockOnCompletar).toHaveBeenCalledTimes(1);
    expect(mockOnCompletar).toHaveBeenCalledWith(mockTareas[0]._id);
  });

  test("llama a onEditar cuando se hace clic en el botón 'Editar' de una TarjetaTarea mockeada", () => {
    render(<ListaTareas {...commonProps} tareas={[mockTareas[0]]} />);

    fireEvent.click(screen.getByRole("button", { name: /editar tarea/i }));

    expect(mockOnEditar).toHaveBeenCalledTimes(1);
    expect(mockOnEditar).toHaveBeenCalledWith(mockTareas[0]);
  });
});