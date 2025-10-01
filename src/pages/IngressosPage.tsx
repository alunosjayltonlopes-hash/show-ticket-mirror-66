import { useEffect } from 'react';

const IngressosPage = () => {
  useEffect(() => {
    // Redireciona para o HTML estático na pasta ingressos
    window.location.href = '/ingressos/index.html';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-lg">Carregando...</p>
      </div>
    </div>
  );
};

export default IngressosPage;
