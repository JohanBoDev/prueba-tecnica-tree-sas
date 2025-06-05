# 🛠️ Proyecto de Gestión de Tareas: Tecnologías Implementadas

Este proyecto de gestión de tareas como prueba tecnica de la empresa Tree-a Enterprises SAS se ha desarrollado utilizando un stack tecnológico moderno y robusto, dividido en un **backend** y un **frontend** con características específicas para asegurar una experiencia de usuario fluida y una gestión de datos eficiente.

---

## 🔧 Tecnologías del Backend

El backend está construido con **Node.js** y **Express.js**, utilizando **TypeScript** para un desarrollo más seguro y mantenible. La base de datos seleccionada es **MongoDB**, con **Mongoose** como ODM (Object Document Mapper) para la interacción con los datos.

### Características principales:
- **API RESTful** para la gestión completa de tareas (CRUD).
- **Validación de datos** con `express-validator`.
- **Manejo centralizado de errores** mediante middleware dedicado.
- **CORS** habilitado para permitir solicitudes de diferentes orígenes.
- **Variables de entorno** gestionadas con `dotenv`.
- **Recarga en caliente** para desarrollo con `ts-node-dev`.

### 📦 Dependencias clave del Backend
- `cors`: ^2.8.5
- `dotenv`: ^16.5.0
- `express`: ^5.1.0
- `express-validator`: ^7.2.1
- `mongoose`: ^8.15.1

### 🧪 Dependencias de desarrollo
- `typescript`: ^5.8.3
- `ts-node-dev`: ^2.0.0
- `@types/cors`: ^2.8.18
- `@types/express`: ^5.0.2
- `@types/node`: ^22.15.29

---

## 💻 Tecnologías del Frontend

El frontend se ha desarrollado con **React** (v19) y **TypeScript** (v5.8.3), utilizando **Vite** (v6.3.5) como herramienta de construcción y servidor de desarrollo. Para la interfaz de usuario, se emplea **Tailwind CSS** (v4.1.8).

### Características principales:
- **Gestión de estado global** con Zustand (v5.0.5).
- **Manejo de formularios** con React Hook Form (v7.57.0).
- **Validación de esquemas** con Zod (v3.25.50).
- **Cliente HTTP** con Axios (v1.9.0) para la comunicación con el backend.
- **Iconografía** con Lucide React (v0.512.0).
- **Notificaciones** con React Hot Toast (v2.5.2).
- **Pruebas unitarias y de integración** con Vitest, React Testing Library, Jest y ts-jest.

### 📦 Dependencias clave del Frontend
- `react`: ^19.1.0
- `react-dom`: ^19.1.0
- `axios`: ^1.9.0
- `zustand`: ^5.0.5
- `react-hook-form`: ^7.57.0
- `zod`: ^3.25.50
- `tailwindcss`: ^4.1.8
- `@tailwindcss/vite`: ^4.1.8
- `lucide-react`: ^0.512.0
- `react-hot-toast`: ^2.5.2

### 🧪 Dependencias de desarrollo
- `typescript`: ~5.8.3
- `vite`: ^6.3.5
- `vitest`: ^3.2.1
- `@testing-library/react`: ^16.3.0
- `jest`: ^29.7.0

---

## 📁 Estructura del Proyecto

El proyecto sigue una **estructura modular** con el **backend** y el **frontend** en directorios separados, cada uno con su respectiva documentación y configuración para facilitar el mantenimiento y la escalabilidad.
