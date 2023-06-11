import React, { useEffect } from 'react';

const AlertOnLeave = () => {
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      // Cancelar el evento de salida (equivalente a e.preventDefault() en eventos de navegación)
      e.preventDefault();
      // Mensaje de alerta personalizado
      e.returnValue = '¡Estás a punto de abandonar esta página!';
    };

    // Agregar el evento 'beforeunload' al cargar el componente
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Remover el evento 'beforeunload' al descargar el componente
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div>
      <h1>¡Alerta de salida!</h1>
      <p>Intenta retroceder o salir de la vista actual.</p>
    </div>
  );
};

export default AlertOnLeave;
