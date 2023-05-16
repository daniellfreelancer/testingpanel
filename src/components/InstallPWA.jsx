import { useState, useEffect } from 'react';

const InstallPWA = () => {
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const beforeInstallPromptHandler = (event) => {
      event.preventDefault();
      setIsInstalled(true);
    };

    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);

    return () => {
      window.removeEventListener('beforeinstallprompt', beforeInstallPromptHandler);
    };
  }, []);

  const handleInstallClick = () => {
    const promptEvent = new Event('beforeinstallprompt');
    window.dispatchEvent(promptEvent);
  };

  if (!isInstalled && window.matchMedia('(display-mode: standalone)').matches) {
    setIsInstalled(true);
  }

  return (
    <div>
      {isInstalled ? (
        <p>¡La App está instalada!</p>
      ) : (
        <button onClick={handleInstallClick}>Instalar VitalMove Panel - App</button>
      )}
    </div>
  );
};

export default InstallPWA;
