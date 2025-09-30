import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import TicketList from "@/components/TicketList";

const ManifestoPage = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    iframe.onload = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDoc) return;

        // Procura pela seção "INGRESSOS ESGOTADOS" e substitui pelo TicketList
        const esgotadosElement = iframeDoc.body.textContent?.includes("INGRESSOS ESGOTADOS");
        
        if (esgotadosElement) {
          // Cria um container para o React dentro do iframe
          const ticketContainer = iframeDoc.createElement("div");
          ticketContainer.id = "react-ticket-list";
          ticketContainer.className = "max-w-7xl mx-auto px-4 py-12";
          
          // Procura o elemento com texto "INGRESSOS ESGOTADOS" e substitui
          const walker = iframeDoc.createTreeWalker(
            iframeDoc.body,
            NodeFilter.SHOW_TEXT,
            null
          );

          let node;
          while ((node = walker.nextNode())) {
            if (node.textContent?.includes("INGRESSOS ESGOTADOS")) {
              const parent = node.parentElement;
              if (parent) {
                parent.innerHTML = "";
                parent.appendChild(ticketContainer);
                
                // Renderiza o componente React dentro do iframe
                const root = createRoot(ticketContainer);
                root.render(<TicketList />);
                break;
              }
            }
          }
        }
      } catch (error) {
        console.error("Erro ao manipular iframe:", error);
      }
    };
  }, []);

  return (
    <div className="min-h-screen w-full">
      <iframe
        ref={iframeRef}
        src="/manifesto-original.html"
        className="w-full h-screen border-0"
        title="Manifesto Musical"
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </div>
  );
};

export default ManifestoPage;
