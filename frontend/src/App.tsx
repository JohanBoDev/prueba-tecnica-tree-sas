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
      background: 'linear-gradient(145deg, #181B29, #0F121C)', 
      color: '#E1E8F0', 
      border: '1px solid transparent', 
      borderRadius: '8px', 
      padding: '16px', 
      boxShadow: 
        'inset 0 0 0 1px rgba(54, 123, 245, 0.5), ' + 
        '0 0 25px rgba(54, 123, 245, 0.25), ' +      
        '0 6px 12px rgba(0, 0, 0, 0.35)',          
    },
    // Estilos específicos para toasts de ÉXITO
    success: {
      style: {
        background: 'linear-gradient(145deg, #0A2B1A, #051A0F)', 
        color: '#B0E9C9', 
        boxShadow:
          'inset 0 0 0 1px rgba(22, 163, 74, 0.6), ' +  
          '0 0 25px rgba(22, 163, 74, 0.3), ' +       
          '0 6px 12px rgba(0, 0, 0, 0.35)',
      },
      iconTheme: { 
        primary: '#2ECC71', 
        secondary: '#0A2B1A', 
      }
    },
    // Estilos específicos para toasts de ERROR
    error: {
      style: {
        background: 'linear-gradient(145deg, #3B0C10, #2A080A)', 
        color: '#F0C0C3',
  
        boxShadow:
          'inset 0 0 0 1px rgba(220, 38, 38, 0.6), ' +   
          '0 0 25px rgba(220, 38, 38, 0.3), ' +       
          '0 6px 12px rgba(0, 0, 0, 0.35)',
      },
      iconTheme: { 
        primary: '#E74C3C', 
        secondary: '#3B0C10', 
      }
    },
  }}
/>
      <Inicio />
    </div>
  )
}

export default App
