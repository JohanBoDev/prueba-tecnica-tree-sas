import { Inicio } from "./pages/Inicio"
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
<Toaster
  position="top-center"
  toastOptions={{
    // Estilo general para todos los toasts
    className: '', // Puedes añadir clases de Tailwind aquí si es necesario
    style: {
      background: 'linear-gradient(145deg, #181B29, #0F121C)', // Gradiente oscuro profundo, base futurista
      color: '#E1E8F0', // Un blanco hueso o azul muy pálido, elegante y legible
      border: '1px solid transparent', // Hacemos el borde transparente, confiaremos en el boxShadow
      borderRadius: '8px', // Un radio medio, ni muy redondo ni muy cuadrado
      padding: '16px', // Equivalente a 1rem, buen espaciado interno
      boxShadow: 
        'inset 0 0 0 1px rgba(54, 123, 245, 0.5), ' + // Simula un borde interno de neón azul
        '0 0 25px rgba(54, 123, 245, 0.25), ' +      // Un resplandor exterior azulado sutil
        '0 6px 12px rgba(0, 0, 0, 0.35)',          // Sombra para profundidad y efecto flotante
    },
    // Estilos específicos para toasts de ÉXITO
    success: {
      style: {
        background: 'linear-gradient(145deg, #0A2B1A, #051A0F)', // Gradiente verde oscuro y elegante
        color: '#B0E9C9', // Texto verde menta pálido para contraste y temático
        // El borde y borderRadius se heredan del estilo general o se pueden sobreescribir
        // boxShadow se puede personalizar para que el brillo sea verde:
        boxShadow:
          'inset 0 0 0 1px rgba(22, 163, 74, 0.6), ' +  // Borde interno verde
          '0 0 25px rgba(22, 163, 74, 0.3), ' +       // Resplandor exterior verde
          '0 6px 12px rgba(0, 0, 0, 0.35)',
      },
      iconTheme: { // Opcional: para que el icono también combine
        primary: '#2ECC71', // Verde brillante para el icono
        secondary: '#0A2B1A', // Fondo oscuro para el icono
      }
    },
    // Estilos específicos para toasts de ERROR
    error: {
      style: {
        background: 'linear-gradient(145deg, #3B0C10, #2A080A)', // Gradiente rojo oscuro y elegante
        color: '#F0C0C3', // Texto rosa/rojo pálido para contraste
        // El borde y borderRadius se heredan
        // boxShadow personalizado para brillo rojo:
        boxShadow:
          'inset 0 0 0 1px rgba(220, 38, 38, 0.6), ' +   // Borde interno rojo
          '0 0 25px rgba(220, 38, 38, 0.3), ' +        // Resplandor exterior rojo
          '0 6px 12px rgba(0, 0, 0, 0.35)',
      },
      iconTheme: { // Opcional: para que el icono también combine
        primary: '#E74C3C', // Rojo brillante para el icono
        secondary: '#3B0C10', // Fondo oscuro para el icono
      }
    },
  }}
/>
      <Inicio />
    </div>
  )
}

export default App
