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

        // Remove todos os links que redirecionam para guicheweb.com.br e outros sites
        const allLinks = iframeDoc.querySelectorAll('a[href]');
        allLinks.forEach((link) => {
          const htmlLink = link as HTMLAnchorElement;
          const href = htmlLink.getAttribute('href') || '';
          
          // Remove links externos (http/https) e links internos do guicheweb
          if (
            href.includes('guicheweb.com.br') ||
            href.includes('http://') ||
            href.includes('https://') ||
            href.startsWith('/')
          ) {
            htmlLink.removeAttribute('href');
            htmlLink.style.cursor = 'default';
            htmlLink.style.pointerEvents = 'none';
          }
        });

        // Remove formulários de busca e navegação
        const forms = iframeDoc.querySelectorAll('form');
        forms.forEach((form) => {
          form.onsubmit = (e) => {
            e.preventDefault();
            return false;
          };
        });

        // Remove chat de suporte e widgets flutuantes
        const chatSelectors = [
          '[id*="chat"]',
          '[class*="chat"]',
          '[id*="support"]',
          '[class*="support"]',
          '[id*="widget"]',
          '[class*="widget"]',
          '[id*="messenger"]',
          '[class*="messenger"]',
          'iframe[src*="chat"]',
          'iframe[src*="widget"]'
        ];
        
        chatSelectors.forEach(selector => {
          const elements = iframeDoc.querySelectorAll(selector);
          elements.forEach(element => {
            element.remove();
          });
        });

        // Procura pela seção "INGRESSOS ESGOTADOS" e substitui pelo TicketList
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
              // Cria um container para o React
              const ticketContainer = iframeDoc.createElement("div");
              ticketContainer.id = "react-ticket-list";
              ticketContainer.className = "max-w-7xl mx-auto px-4 py-12";
              
              parent.innerHTML = "";
              parent.appendChild(ticketContainer);
              
              // Renderiza o componente React dentro do iframe
              const root = createRoot(ticketContainer);
              root.render(<TicketList />);
              break;
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
