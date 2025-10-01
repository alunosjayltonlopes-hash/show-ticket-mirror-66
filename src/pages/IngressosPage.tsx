import { useEffect } from 'react';

const IngressosPage = () => {
  useEffect(() => {
    // Redireciona diretamente para a página HTML
    window.location.replace('/ingressos/index.html');
  }, []);

  return null;
};

export default IngressosPage;
