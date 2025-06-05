# 🚀 Frontend - Aplicación de Gestión de Tareas (Tree S.A.S.)

Este directorio contiene el código fuente del frontend para la aplicación de gestión de tareas. Desarrollado con React, TypeScript, Vite y Tailwind CSS, este frontend ofrece una interfaz de usuario moderna, interactiva y responsiva para gestionar tareas de manera eficiente.

[![ISC License](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## ✨ Características Principales

### 🎨 Interfaz de Usuario Moderna e Intuitiva
- Diseño limpio y responsivo utilizando Tailwind CSS.
- Componentes reutilizables para una experiencia de usuario consistente.

### ✅ Gestión Completa de Tareas
- **Crear Tareas:** Modal con formulario para agregar nuevas tareas, incluyendo título, descripción, fecha límite, prioridad (Alta, Media, Baja) y categoría (Trabajo, Personal, Estudio).
- **Visualizar Tareas:** Listado de tareas en formato de tarjetas individuales, mostrando toda la información relevante de forma clara.
- **Editar Tareas:** Funcionalidad para modificar los detalles de tareas existentes a través de un modal pre-rellenado.
- **Eliminar Tareas:** Opción para "eliminar" tareas (esto se traduce en una eliminación lógica en el backend).
- **Marcar como Completadas:** Permite cambiar el estado de las tareas entre "Pendiente" y "Completada".

### 🔍 Filtrado y Búsqueda Avanzados
- **Búsqueda Dinámica:** Campo para buscar tareas por título o descripción.
- **Filtros Múltiples:**
  - Por categoría (Trabajo, Personal, Estudio, Todas).
  - Por estado (Pendiente, Completada, Todos).
  - Por prioridad (Alta, Media, Baja, Todas).

### 📅 Ordenamiento de Tareas
- Opción para ordenar las tareas por fecha límite o fecha de creación.
- Posibilidad de alternar entre orden ascendente y descendente.

### 📄 Paginación
- Navegación eficiente mostrando 3 tareas por página.

### 📦 Gestión de Estado Global
- Zustand para un manejo de estado centralizado y eficiente.

### 🧾 Validación de Formularios
- React Hook Form y Zod para validación de esquemas.

### 🔔 Notificaciones Toast
- React Hot Toast para feedback visual en operaciones.

### 💡 Iconografía Clara
- Lucide React para iconos llamativos y funcionales.

### 🧪 Pruebas Unitarias y de Integración
- Vitest y React Testing Library para pruebas.
- Configuración para jsdom y jest-dom matchers.

## 🛠️ Tecnologías Utilizadas

- **React** (v19)
- **TypeScript** (v5.8.3)
- **Vite** (v6.3.5)
- **Tailwind CSS** (v4.1.8)
- **Zustand** (v5.0.5)
- **React Hook Form** (v7.57.0)
- **Zod** (v3.25.50)
- **Axios** (v1.9.0)
- **Lucide React** (v0.512.0)
- **React Hot Toast** (v2.5.2)
- **Vitest** (v3.2.1)
- **React Testing Library**, **jest-dom**, **user-event**
- **Jest** (v29.7.0), **ts-jest** (v29.3.4)
- **ESLint** (v9.25.0)

## 📂 Estructura del Proyecto

```bash
frontend/
├── public/                    # Archivos estáticos
├── src/
│   ├── components/            # Componentes reutilizables
│   ├── hooks/                 # Hooks personalizados
│   ├── pages/                 # Vistas principales
│   ├── services/              # Comunicación con backend
│   ├── store/                 # Zustand store
│   ├── tests/                 # Pruebas unitarias
│   ├── types/                 # Tipos TypeScript
│   ├── validations/           # Esquemas de validación Zod
│   ├── App.tsx
│   ├── main.tsx
│   └── ...otros archivos
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

- Node.js v18+
- npm v8+ o yarn
- Backend en ejecución en `http://localhost:3000/api`

## 🚀 Instalación y Ejecución

```bash
cd frontend
npm install
```

Crear `.env`:
```
VITE_API_URL=http://localhost:3000/api
```

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm run build
npm run preview
```

## 🧪 Pruebas

```bash
npm test              # Usa Jest por defecto
npm run test:watch    # Watch mode con Jest
npm run test:vitest   # Alternativa usando Vitest
```

Config: `vite.config.ts`, `jest.config.js`, `tests/setup.ts`

## 🧹 Linting

```bash
npm run lint
```

## 💡 Mejoras Futuras

- Virtualización de listas
- Arrastrar y soltar tareas
- Soporte de temas (claro/oscuro)
- i18n
- Pruebas E2E (Cypress o Playwright)
- Accesibilidad (a11y)

## 📜 Licencia

Este proyecto está bajo la [Licencia ISC](https://opensource.org/licenses/ISC).