\# 🚀 Frontend \- Aplicación de Gestión de Tareas (Tree S.A.S.)

Este directorio contiene el código fuente del frontend para la aplicación de gestión de tareas. Desarrollado con React, TypeScript, Vite y Tailwind CSS, este frontend ofrece una interfaz de usuario moderna, interactiva y responsiva para gestionar tareas de manera eficiente.

\[\!\[ISC License\](https://img.shields.io/badge/License-ISC-blue.svg)\](https://opensource.org/licenses/ISC)

\#\# ✨ Características Principales

\* \*\*Interfaz de Usuario Moderna e Intuitiva:\*\*  
    \* Diseño limpio y responsivo utilizando Tailwind CSS.  
    \* Componentes reutilizables para una experiencia de usuario consistente.  
\* \*\*Gestión Completa de Tareas:\*\*  
    \* \*\*Crear Tareas:\*\* Modal con formulario para agregar nuevas tareas, incluyendo título, descripción, fecha límite, prioridad (Alta, Media, Baja) y categoría (Trabajo, Personal, Estudio).  
    \* \*\*Visualizar Tareas:\*\* Listado de tareas en formato de tarjetas individuales, mostrando toda la información relevante de forma clara.  
    \* \*\*Editar Tareas:\*\* Funcionalidad para modificar los detalles de tareas existentes a través de un modal pre-rellenado.  
    \* \*\*Eliminar Tareas:\*\* Opción para "eliminar" tareas (esto se traduce en una eliminación lógica en el backend).  
    \* \*\*Marcar como Completadas:\*\* Permite cambiar el estado de las tareas entre "Pendiente" y "Completada".  
\* \*\*Filtrado y Búsqueda Avanzados:\*\*  
    \* \*\*Búsqueda Dinámica:\*\* Campo para buscar tareas por título o descripción.  
    \* \*\*Filtros Múltiples:\*\*  
        \* Por categoría (Trabajo, Personal, Estudio, Todas).  
        \* Por estado (Pendiente, Completada, Todos).  
        \* Por prioridad (Alta, Media, Baja, Todas).  
\* \*\*Ordenamiento de Tareas:\*\*  
    \* Opción para ordenar las tareas por fecha límite o fecha de creación.  
    \* Posibilidad de alternar entre orden ascendente y descendente.  
\* \*\*Paginación:\*\*  
    \* Navegación eficiente a través de múltiples tareas, mostrando un número configurable de tareas por página (actualmente 3).  
\* \*\*Gestión de Estado Global:\*\*  
    \* Utiliza \*\*Zustand\*\* para un manejo de estado centralizado, simple y eficiente, gestionando la lista de tareas y las operaciones CRUD.  
\* \*\*Validación de Formularios:\*\*  
    \* Integración con \*\*React Hook Form\*\* para la gestión de formularios.  
    \* \*\*Zod\*\* para la validación de esquemas, asegurando la integridad de los datos antes de enviarlos al backend.  
\* \*\*Notificaciones Toast:\*\*  
    \* Uso de \*\*React Hot Toast\*\* para proporcionar feedback visual al usuario sobre el resultado de las operaciones (crear, editar, eliminar, completar tarea).  
\* \*\*Iconografía Clara:\*\*  
    \* Interfaz enriquecida con iconos de \*\*Lucide React\*\* para mejorar la usabilidad y el atractivo visual.  
\* \*\*Pruebas Unitarias y de Integración:\*\*  
    \* Implementadas con \*\*Vitest\*\* y \*\*React Testing Library\*\* para asegurar la calidad y el correcto funcionamiento de los componentes.  
    \* Configuración para \`jsdom\` y \`jest-dom\` matchers.

\#\# 🛠️ Tecnologías Utilizadas

\* \*\*Librería UI:\*\* React (v19)  
\* \*\*Lenguaje:\*\* TypeScript (v5.8.3)  
\* \*\*Bundler / Entorno de Desarrollo:\*\* Vite (v6.3.5)  
\* \*\*Estilos:\*\* Tailwind CSS (v4.1.8)  
    \* Integrado mediante \`@tailwindcss/vite\`.  
\* \*\*Gestión de Estado:\*\* Zustand (v5.0.5)  
\* \*\*Formularios:\*\* React Hook Form (v7.57.0)  
\* \*\*Validación de Esquemas:\*\* Zod (v3.25.50)  
\* \*\*Cliente HTTP:\*\* Axios (v1.9.0)  
\* \*\*Iconos:\*\* Lucide React (v0.512.0)  
\* \*\*Notificaciones:\*\* React Hot Toast (v2.5.2)  
\* \*\*Pruebas:\*\*  
    \* Vitest (v3.2.1) \- Test runner principal.  
    \* React Testing Library (\`@testing-library/react\` v16.3.0, \`@testing-library/jest-dom\` v6.6.3, \`@testing-library/user-event\` v14.6.1)  
    \* Jest (v29.7.0) y \`ts-jest\` (v29.3.4) \- Configuración presente, aunque los scripts y tests parecen orientados a Vitest.  
\* \*\*Linting:\*\* ESLint (v9.25.0) con \`typescript-eslint\`.

\#\# 📂 Estructura del Proyecto (Frontend)

frontend/  
├── public/ \# Archivos estáticos  
├── src/  
│ ├── components/ \# Componentes reutilizables de React  
│ │ ├── FormularioTarea.tsx  
│ │ ├── ListaTareas.tsx  
│ │ ├── ModalCrearTarea.tsx  
│ │ └── TarjetaTarea.tsx  
│ ├── hooks/ \# Hooks personalizados  
│ │ └── useFormularioTarea.ts  
│ ├── pages/ \# Componentes de página (vistas principales)  
│ │ └── Inicio.tsx  
│ ├── services/ \# Lógica para interactuar con la API backend  
│ │ └── tareasServicio.ts  
│ ├── store/ \# Configuración y lógica del store de Zustand  
│ │ └── useTareasStore.tsx  
│ ├── tests/ \# Archivos de pruebas  
│ │ ├── FormularioTarea.test.tsx  
│ │ ├── ListaTareas.test.tsx  
│ │ ├── ModalCrearTarea.test.tsx  
│ │ ├── TarjetaTarea.test.tsx  
│ │ └── setup.ts \# Configuración global para pruebas (Vitest)  
│ ├── types/ \# Definiciones de tipos TypeScript  
│ │ └── Tarea.ts  
│ ├── validations/ \# Esquemas de validación con Zod  
│ │ └── esquemaTarea.ts  
│ ├── App.css \# Estilos globales/adicionales para App  
│ ├── App.tsx \# Componente raíz de la aplicación  
│ ├── index.css \# Estilos base (Tailwind import)  
│ ├── main.tsx \# Punto de entrada de la aplicación React  
│ └── vite-env.d.ts \# Tipos de entorno para Vite  
├── .eslintrc.cjs \# Configuración de ESLint (o eslint.config.js)  
├── index.html \# Plantilla HTML principal  
├── jest.config.js \# Configuración de Jest (considerar si es necesaria con Vitest)  
├── package.json \# Metadatos del proyecto y dependencias  
├── tailwind.config.js \# Configuración de Tailwind CSS (implícita o explícita)  
├── tsconfig.json \# Configuración base de TypeScript  
├── tsconfig.app.json \# Configuración de TypeScript para la aplicación  
├── tsconfig.node.json \# Configuración de TypeScript para el entorno Node (e.g., Vite config)  
└── vite.config.ts \# Configuración de Vite y Vitest  
\#\# 📋 Prerrequisitos

\* Node.js (v18.x o superior recomendado)  
\* npm (v8.x o superior) o yarn  
\* Un backend de gestión de tareas compatible ejecutándose (se espera que esté en \`http://localhost:3000/api\` por defecto).

\#\# 🚀 Instalación y Configuración

1\.  \*\*Navega al directorio del frontend:\*\*  
    \`\`\`bash  
    cd frontend  
    \`\`\`

2\.  \*\*Instala las dependencias:\*\*  
    \`\`\`bash  
    npm install  
    \# o  
    yarn install  
    \`\`\`

3\.  \*\*Configura las variables de entorno:\*\*  
    Crea un archivo \`.env\` en la raíz del directorio \`frontend/\`. Este archivo se utiliza para especificar la URL base de la API del backend.  
    \`\`\`env  
    VITE\_API\_URL=http://localhost:3000/api  
    \`\`\`  
    Asegúrate de que \`VITE\_API\_URL\` apunte a la URL donde se está ejecutando tu API de backend. El valor por defecto es \`http://localhost:3000/api\`.

\#\# ධ Ejecutando la Aplicación Frontend

\* \*\*Modo Desarrollo (con HMR gracias a Vite):\*\*  
    \`\`\`bash  
    npm run dev  
    \`\`\`  
    La aplicación se iniciará y estará accesible generalmente en \`http://localhost:5173\`. Vite te indicará la URL exacta en la consola.

\* \*\*Compilar para Producción:\*\*  
    \`\`\`bash  
    npm run build  
    \`\`\`  
    Esto generará los archivos estáticos optimizados para producción en el directorio \`dist/\`.

\* \*\*Previsualizar la Build de Producción Localmente:\*\*  
    \`\`\`bash  
    npm run preview  
    \`\`\`  
    Este comando iniciará un servidor local para servir los archivos del directorio \`dist/\`.

\#\# 🧪 Pruebas

El frontend utiliza Vitest y React Testing Library para las pruebas unitarias y de integración de componentes.

\* \*\*Ejecutar todas las pruebas una vez (según \`package.json\`, actualmente usa Jest):\*\*  
    \`\`\`bash  
    npm test  
    \`\`\`  
    \*Nota: Aunque los tests están escritos con sintaxis de Vitest (\`vi\`, \`describe\`, etc.) y \`vite.config.ts\` configura Vitest, el script \`npm test\` ejecuta \`jest\`. Considera unificar a Vitest actualizando el script en \`package.json\` a \`vitest run\` o similar si esa es la intención.\*

\* \*\*Ejecutar pruebas en modo observador (watch mode con Jest):\*\*  
    \`\`\`bash  
    npm run test:watch  
    \`\`\`

\* \*\*Para ejecutar con Vitest directamente (si se configura el script):\*\*  
    Si deseas usar Vitest como se define en \`vite.config.ts\`, podrías añadir un script como:  
    \`\`\`json  
    // en package.json  
    "scripts": {  
      // ... otros scripts  
      "test:vitest": "vitest",  
      "test:vitest:watch": "vitest \--watch"  
    }  
    \`\`\`  
    Y luego ejecutar:  
    \`\`\`bash  
    npm run test:vitest  
    \`\`\`

Los archivos de configuración relevantes para las pruebas son:  
\* \`frontend/vite.config.ts\` (para la configuración de Vitest)  
\* \`frontend/src/tests/setup.ts\` (configuración global para pruebas, incluyendo \`jest-dom\` matchers para Vitest)  
\* \`frontend/jest.config.js\` (configuración de Jest)

Pruebas implementadas para componentes clave como:  
\* \`FormularioTarea\`  
\* \`ListaTareas\`  
\* \`ModalCrearTarea\`  
\* \`TarjetaTarea\`
