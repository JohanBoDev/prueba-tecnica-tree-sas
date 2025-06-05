# 🚀 Frontend - Aplicación de Gestión de Tareas (Tree S.A.S.)

Este directorio contiene el código fuente del frontend para la aplicación de gestión de tareas. Desarrollado con React, TypeScript, Vite y Tailwind CSS, este frontend ofrece una interfaz de usuario moderna, interactiva y responsiva para gestionar tareas de manera eficiente.


## ✨ Características Principales

### 🖥️ Interfaz de Usuario Moderna e Intuitiva
- Diseño limpio y responsivo utilizando Tailwind CSS.
- Componentes reutilizables para una experiencia de usuario consistente.

### 🗂️ Gestión Completa de Tareas
- **Crear Tareas:** Modal con formulario para agregar nuevas tareas, incluyendo título, descripción, fecha límite, prioridad (Alta, Media, Baja) y categoría (Trabajo, Personal, Estudio).
- **Visualizar Tareas:** Listado en tarjetas mostrando la información de forma clara.
- **Editar Tareas:** Modal pre-rellenado para modificar detalles.
- **Eliminar Tareas:** Eliminación lógica (soft delete) desde la interfaz.
- **Marcar como Completadas:** Cambio de estado entre "Pendiente" y "Completada".

### 🔎 Filtrado y Búsqueda Avanzados
- **Búsqueda Dinámica** por título o descripción.
- **Filtros por:**
  - Categoría: Trabajo, Personal, Estudio o Todas.
  - Estado: Pendiente, Completada o Todos.
  - Prioridad: Alta, Media, Baja o Todas.

### 🧮 Ordenamiento y Paginación
- Ordenar tareas por fecha límite o de creación, de forma ascendente o descendente.
- Paginación mostrando 3 tareas por página.

### ⚙️ Gestión de Estado Global
- Implementado con Zustand para operaciones CRUD centralizadas.

### ✅ Validación de Formularios
- Validación con React Hook Form y esquemas de Zod.

### 🔔 Notificaciones
- Feedback visual mediante React Hot Toast.

### 🎨 Iconografía Clara
- Iconos proporcionados por Lucide React.

### 🧪 Pruebas Unitarias y de Integración
- Realizadas con Vitest y React Testing Library.
- Soporte para jsdom y matchers de jest-dom.

## 🛠️ Tecnologías Utilizadas

- **UI:** React (v19)
- **Lenguaje:** TypeScript (v5.8.3)
- **Bundler:** Vite (v6.3.5)
- **Estilos:** Tailwind CSS (v4.1.8) mediante `@tailwindcss/vite`
- **Estado:** Zustand (v5.0.5)
- **Formularios:** React Hook Form (v7.57.0)
- **Validación:** Zod (v3.25.50)
- **Cliente HTTP:** Axios (v1.9.0)
- **Iconos:** Lucide React (v0.512.0)
- **Notificaciones:** React Hot Toast (v2.5.2)
- **Pruebas:**
  - Vitest (v3.2.1)
  - React Testing Library (`@testing-library/react`, `jest-dom`, `user-event`)
  - Jest (v29.7.0), `ts-jest` (v29.3.4)
- **Linting:** ESLint (v9.25.0) con `typescript-eslint`

## 📂 Estructura del Proyecto

```
frontend/
├── public/                    # Archivos estáticos
├── src/
│   ├── components/            # Componentes de React
│   ├── hooks/                 # Hooks personalizados
│   ├── pages/                 # Vistas principales
│   ├── services/              # Interacción con API
│   ├── store/                 # Zustand Store
│   ├── tests/                 # Pruebas unitarias
│   ├── types/                 # Tipos TS
│   ├── validations/           # Validaciones con Zod
│   ├── App.css, App.tsx
│   ├── index.css, main.tsx
│   └── vite-env.d.ts
├── .eslintrc.cjs
├── index.html
├── jest.config.js
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## 📋 Prerrequisitos

- Node.js (v18.x o superior)
- npm (v8.x o superior) o yarn
- Backend disponible en `http://localhost:3000/api`

## 🚀 Instalación y Configuración

1. Clona el repositorio y navega al frontend:
   ```bash
   cd frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Configura el archivo `.env`:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

## 🧪 Ejecución y Pruebas

### Desarrollo
```bash
npm run dev
```
Accesible generalmente en `http://localhost:5173`.

### Build de Producción
```bash
npm run build
```

### Previsualización Local
```bash
npm run preview
```

### Pruebas
```bash
npm test             # Ejecuta Jest (por ahora)
npm run test:watch   # Modo observador con Jest
npm run test:vitest  # Si se habilita en package.json
```

Scripts sugeridos para usar Vitest:
```json
"scripts": {
  "test:vitest": "vitest",
  "test:vitest:watch": "vitest --watch"
}
```

Archivos clave para pruebas:
- `vite.config.ts`
- `src/tests/setup.ts`
- `jest.config.js`

Componentes con pruebas:
- `FormularioTarea`
- `ListaTareas`
- `ModalCrearTarea`
- `TarjetaTarea`


