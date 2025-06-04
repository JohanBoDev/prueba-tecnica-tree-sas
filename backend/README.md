# **Backend del Proyecto de Gestión de Tareas**

Este repositorio contiene el código fuente del backend para una aplicación de gestión de tareas. Desarrollado con Node.js, Express y TypeScript, y utilizando MongoDB como base de datos, este backend proporciona una API RESTful para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre las tareas, incluyendo funcionalidades de filtrado y paginación.

## **Tabla de Contenidos**

* [Características](#Características)  
* [Tecnologías Utilizadas](#Tecnologías-Utilizadas)  
* [Estructura del Proyecto](#estructura-del-proyecto)  
* [Requisitos Previos](#requisitos-previos)  
* [Configuración del Entorno](#Configuración-del-entorno)  
* [Instalación](#instalacion)  
* [Scripts Disponibles](#scripts-disponibles)  
* [Variables de Entorno](#variables-de-entorno)  
* [API Endpoints](#api-endpoints)  
  * [Tareas](#tareas)  
* [Manejo de Errores](#manejo-de-errores)  
* [Validaciones](#validaciones)  


## **Características**

* **API RESTful:** Conjunto de endpoints para la gestión completa de tareas.  
* **Operaciones CRUD:**  
  * Crear nuevas tareas.  
  * Obtener todas las tareas con opciones de filtrado, búsqueda, ordenamiento y paginación.  
  * Obtener una tarea específica por su ID.  
  * Actualizar los detalles de una tarea existente.  
  * "Eliminación" lógica de tareas (marcando como activa: false).  
* **Validación de Datos:** Uso de express-validator para asegurar la integridad de los datos de entrada.  
* **Manejo Centralizado de Errores:** Un middleware dedicado para capturar y responder a los errores de manera consistente.  
* **Conexión a MongoDB:** Integración con la base de datos MongoDB utilizando Mongoose.  
* **TypeScript:** Código tipado para mayor robustez y mantenibilidad.  
* **Middleware CORS:** Configurado para permitir solicitudes desde diferentes orígenes.  
* **Variables de Entorno:** Gestión de configuraciones sensibles a través de archivos .env.

## **Tecnologías Utilizadas**

* **Node.js:** Entorno de ejecución JavaScript.  
* **Express.js:** Framework web para Node.js.  
* **TypeScript:** Lenguaje de programación que añade tipado estático a JavaScript.  
* **Mongoose:** Modelado de objetos para MongoDB.  
* **MongoDB:** Base de datos NoSQL.  
* **dotenv:** Carga variables de entorno desde un archivo .env.  
* **cors:** Middleware para habilitar CORS.  
* **express-validator:** Librería para la validación de datos en Express.  
* **ts-node-dev:** Para desarrollo con recarga en caliente de TypeScript.

## **Estructura del Proyecto**

El backend sigue una estructura modular y organizada:

backend/  
├── src/  
│   ├── config/  
│   │   └── db.ts             \# Configuración de conexión a la base de datos.  
│   ├── controllers/  
│   │   └── tareaController.ts  \# Lógica de negocio para las operaciones CRUD de tareas.  
│   ├── middlewares/  
│   │   ├── errorHandler.ts     \# Middleware para el manejo global de errores.  
│   │   └── validarCampos.ts    \# Middleware para manejar los resultados de express-validator.  
│   ├── models/  
│   │   └── Tarea.ts            \# Definición del esquema y modelo de Mongoose para Tarea.  
│   ├── interfaces/  
│   │   └── ITarea.ts           \# Definición de la interfaz TypeScript para una Tarea.  
│   ├── routes/  
│   │   └── tareaRoutes.ts      \# Definición de las rutas de la API para tareas.  
│   ├── utils/  
│   │   └── ApiError.ts         \# Clase de error personalizada para errores de la API.  
│   ├── validators/  
│   │   ├── idValidator.ts      \# Validaciones específicas para IDs de MongoDB.  
│   │   └── tareaValidator.ts   \# Validaciones para los datos de entrada de tareas.  
│   └── index.ts              \# Archivo principal de la aplicación Express.  
├── package.json              \# Metadatos del proyecto y dependencias.  
├── package-lock.json         \# Bloqueo de versiones de dependencias.  
├── tsconfig.json             \# Configuración del compilador de TypeScript.  
└── .env.example              \# Archivo de ejemplo para variables de entorno.

## **Requisitos Previos**

Antes de comenzar, asegúrate de tener instalado lo siguiente:

* **Node.js** (versión 16.20.1 o superior, según mongoose y express en package-lock.json)  
* **npm** (Node Package Manager)  
* **MongoDB** (instancia local o en la nube)

## **Configuración del Entorno**

1. **Clona el repositorio:**  
   git clone https://github.com/johanbodev/prueba-tecnica-tree-sas.git  
   cd prueba-tecnica-tree-sas/backend

2. Crea un archivo .env:  
   Crea un archivo llamado .env en la raíz del directorio backend/ y añade la siguiente variable de entorno:  
   PORT=3000  
   MONGO_URI=mongodb+srv://johanbohorquez406:wUH5hkGFfp5qugAG@cluster-todolist.ybgftqu.mongodb.net/todolist?retryWrites=true&w=majority&appName=cluster-todolist

## **Instalación**

Una vez que hayas configurado tu archivo .env, instala las dependencias del proyecto:

npm install

## **Scripts Disponibles**

En el directorio backend/, puedes ejecutar los siguientes scripts:

* npm run dev:  
  Inicia el servidor en modo de desarrollo con ts-node-dev. Esto permite la recarga automática del servidor cuando detecta cambios en los archivos .ts, lo que es ideal para el desarrollo.  
  npm run dev

* npm run build:  
  Compila el código TypeScript a JavaScript en el directorio dist/.  
  npm run build

* npm start:  
  Inicia el servidor de producción utilizando el código compilado en el directorio dist/.  
  npm start

## **Variables de Entorno**

Las siguientes variables de entorno son utilizadas por la aplicación. Deben ser definidas en un archivo .env en la raíz del proyecto.

* PORT: El puerto en el que se ejecutará el servidor. Por defecto es 3000\.  
* MONGO\_URI: La cadena de conexión a tu base de datos MongoDB. **Es crucial para la conexión a la base de datos.**

## **API Endpoints**

Todos los endpoints están prefijados con /api/tareas.

### **Tareas**

| Método | Endpoint | Descripción |
| :---- | :---- | :---- |
| POST | /api/tareas/crear | Crea una nueva tarea. Requiere titulo, descripcion, fechaLimite, prioridad, categoria en el cuerpo de la solicitud. |
| GET | /api/tareas/obtener | Obtiene una lista de tareas con opciones de filtrado, búsqueda, ordenamiento y paginación. |
| GET | /api/tareas/obtenerPorId/:id | Obtiene una tarea específica por su ID de MongoDB. |
| PUT | /api/tareas/actualizar/:id | Actualiza una tarea existente por su ID. Los campos pueden ser opcionales en el cuerpo. |
| DELETE | /api/tareas/eliminar/:id | Elimina lógicamente una tarea (establece activa: false). |

#### **POST /api/tareas/crear**

Crea una nueva tarea en la base de datos.

**Cuerpo de la Solicitud (JSON):**

{  
  "titulo": "Organizar reunión de equipo",  
  "descripcion": "Preparar agenda y convocar a los participantes.",  
  "fechaLimite": "2025-06-30T17:00:00Z",  
  "prioridad": "Alta",  
  "categoria": "Trabajo"  
}

**Respuestas:**

* 201 Created: Tarea creada exitosamente.  
  {  
    "\_id": "60d0fe4a7e8e5d0015f8c4b2",  
    "titulo": "Organizar reunión de equipo",  
    "descripcion": "Preparar agenda y convocar a los participantes.",  
    "fechaLimite": "2025-06-30T17:00:00.000Z",  
    "prioridad": "Alta",  
    "categoria": "Trabajo",  
    "estado": "Pendiente",  
    "activa": true,  
    "createdAt": "2024-05-28T12:00:00.000Z",  
    "updatedAt": "2024-05-28T12:00:00.000Z",  
    "\_\_v": 0  
  }

* 400 Bad Request: Datos de entrada inválidos (ver [Validaciones](#bookmark=id.dvmostkff92b)).

#### **GET /api/tareas/obtener**

Obtiene una lista paginada y filtrada de tareas.

**Parámetros de Consulta (Query Parameters):**

* estado: Pendiente | Completada (Opcional)  
* prioridad: Alta | Media | Baja (Opcional)  
* categoria: Trabajo | Personal | Estudio (Opcional)  
* buscar: Texto para buscar en titulo o descripcion. (Opcional, búsqueda insensible a mayúsculas/minúsculas)  
* ordenarPor: fechaLimite | createdAt | updatedAt | prioridad (Opcional, por defecto fechaLimite)  
* orden: asc | desc (Opcional, por defecto asc)  
* pagina: Número de página. (Opcional, por defecto 1\)  
* limite: Número de tareas por página. (Opcional, por defecto 10\)

**Ejemplo:** GET /api/tareas/obtener?estado=Pendiente\&prioridad=Alta\&buscar=reunion\&ordenarPor=fechaLimite\&orden=desc\&pagina=1\&limite=5

**Respuestas:**

* 200 OK: Lista de tareas.  
  {  
    "paginaActual": 1,  
    "totalPaginas": 2,  
    "totalResultados": 12,  
    "tareas": \[  
      {  
        "\_id": "...",  
        "titulo": "...",  
        "descripcion": "...",  
        "fechaLimite": "...",  
        "prioridad": "...",  
        "categoria": "...",  
        "estado": "...",  
        "activa": true,  
        "createdAt": "...",  
        "updatedAt": "..."  
      }  
    \]  
  }

* 400 Bad Request: Parámetros de consulta inválidos.

#### **GET /api/tareas/obtenerPorId/:id**

Obtiene una tarea específica por su ID.

**Parámetros de Ruta:**

* id: El ID de MongoDB de la tarea.

**Respuestas:**

* 200 OK: Tarea encontrada.  
  {  
    "\_id": "60d0fe4a7e8e5d0015f8c4b2",  
    "titulo": "Organizar reunión de equipo",  
    "descripcion": "Preparar agenda y convocar a los participantes.",  
    "fechaLimite": "2025-06-30T17:00:00.000Z",  
    "prioridad": "Alta",  
    "categoria": "Trabajo",  
    "estado": "Pendiente",  
    "activa": true,  
    "createdAt": "2024-05-28T12:00:00.000Z",  
    "updatedAt": "2024-05-28T12:00:00.000Z",  
    "\_\_v": 0  
  }

* 400 Bad Request: ID no válido.  
* 404 Not Found: Tarea no encontrada o marcada como inactiva.

#### **PUT /api/tareas/actualizar/:id**

Actualiza los detalles de una tarea existente.

**Parámetros de Ruta:**

* id: El ID de MongoDB de la tarea a actualizar.

Cuerpo de la Solicitud (JSON):  
Puede contener cualquier combinación de los siguientes campos (todos son opcionales para la actualización):  
{  
  "titulo": "Organizar reunión de equipo (Actualizado)",  
  "estado": "Completada",  
  "prioridad": "Media"  
}

**Respuestas:**

* 200 OK: Tarea actualizada exitosamente.  
  {  
    "\_id": "60d0fe4a7e8e5d0015f8c4b2",  
    "titulo": "Organizar reunión de equipo (Actualizado)",  
    "descripcion": "Preparar agenda y convocar a los participantes.",  
    "fechaLimite": "2025-06-30T17:00:00.000Z",  
    "prioridad": "Media",  
    "categoria": "Trabajo",  
    "estado": "Completada",  
    "activa": true,  
    "createdAt": "2024-05-28T12:00:00.000Z",  
    "updatedAt": "2024-05-28T12:30:00.000Z",  
    "\_\_v": 0  
  }

* 400 Bad Request: Datos de entrada inválidos (ver [Validaciones](#bookmark=id.dvmostkff92b)).  
* 404 Not Found: Tarea no encontrada o marcada como inactiva.

#### **DELETE /api/tareas/eliminar/:id**

Realiza una "eliminación lógica" de una tarea, estableciendo su campo activa a false.

**Parámetros de Ruta:**

* id: El ID de MongoDB de la tarea a eliminar.

**Respuestas:**

* 200 OK: Tarea eliminada lógicamente.  
  {  
    "mensaje": "Tarea eliminada correctamente",  
    "tarea": {  
      "\_id": "60d0fe4a7e8e5d0015f8c4b2",  
      "titulo": "Organizar reunión de equipo",  
      "descripcion": "Preparar agenda y convocar a los participantes.",  
      "fechaLimite": "2025-06-30T17:00:00.000Z",  
      "prioridad": "Alta",  
      "categoria": "Trabajo",  
      "estado": "Pendiente",  
      "activa": false,  
      "createdAt": "2024-05-28T12:00:00.000Z",  
      "updatedAt": "2024-05-28T12:45:00.000Z",  
      "\_\_v": 0  
    }  
  }

* 400 Bad Request: ID no válido.  
* 404 Not Found: Tarea no encontrada o ya inactiva.

## **Manejo de Errores**

El backend cuenta con un middleware de manejo de errores centralizado (errorHandler.ts) que captura las excepciones y envía respuestas JSON consistentes con un código de estado HTTP y un mensaje de error.

Ejemplo de respuesta de error:

{  
  "error": "Mensaje de error específico o 'Error interno del servidor'"  
}

La clase ApiError personalizada permite lanzar errores con códigos de estado HTTP específicos desde cualquier parte de la aplicación, facilitando el manejo de errores conocidos (ej. 400 Bad Request, 404 Not Found).

## **Validaciones**

Se utiliza express-validator para validar los datos de entrada en las rutas. El middleware validarCampos.ts procesa los errores de validación y envía respuestas con un formato claro que indica qué campos son problemáticos.

Ejemplo de respuesta de error de validación:

{  
  "errores": \[  
    {  
      "campo": "titulo",  
      "mensaje": "El título es obligatorio"  
    },  
    {  
      "campo": "fechaLimite",  
      "mensaje": "La fecha límite debe tener un formato válido"  
    }  
  \]  
}

Las validaciones incluyen:

* Campos obligatorios (titulo, descripcion, fechaLimite)  
* Formato de fecha (fechaLimite debe ser ISO8601)  
* Valores permitidos para prioridad (Alta, Media, Baja)  
* Valores permitidos para categoria (Trabajo, Personal, Estudio)  
* Valores permitidos para estado (Pendiente, Completada) (solo para actualización)  
* Validación de ID de MongoDB (:id en rutas PUT/DELETE/GET por ID)

