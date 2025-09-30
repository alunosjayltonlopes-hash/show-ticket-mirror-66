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

        // Função para remover elementos indesejados
        const removeUnwantedElements = () => {
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

          // Remove chat de suporte e widgets flutuantes - MAIS AGRESSIVO
          const chatSelectors = [
            '[id*="chat"]',
            '[class*="chat"]',
            '[id*="Chat"]',
            '[class*="Chat"]',
            '[id*="support"]',
            '[class*="support"]',
            '[id*="Support"]',
            '[class*="Support"]',
            '[id*="widget"]',
            '[class*="widget"]',
            '[id*="Widget"]',
            '[class*="Widget"]',
            '[id*="messenger"]',
            '[class*="messenger"]',
            '[id*="Messenger"]',
            '[class*="Messenger"]',
            '[id*="whatsapp"]',
            '[class*="whatsapp"]',
            '[id*="WhatsApp"]',
            '[class*="WhatsApp"]',
            '[id*="wpp"]',
            '[class*="wpp"]',
            'iframe[src*="chat"]',
            'iframe[src*="widget"]',
            'iframe[src*="whatsapp"]',
            'iframe[src*="messenger"]',
            'div[style*="position: fixed"]',
            'div[style*="z-index: 999"]',
            'div[style*="z-index: 9999"]',
            '#crisp-chatbox',
            '#intercom-container',
            '#drift-widget',
            '#hubspot-messages-iframe-container',
            '.crisp-client',
            '.intercom-launcher',
            '.drift-frame-controller'
          ];
          
          chatSelectors.forEach(selector => {
            try {
              const elements = iframeDoc.querySelectorAll(selector);
              elements.forEach(element => {
                console.log('Removendo elemento:', element);
                element.remove();
              });
            } catch (e) {
              console.warn('Erro ao remover elemento:', selector, e);
            }
          });

          // Remove scripts de chat
          const scripts = iframeDoc.querySelectorAll('script');
          scripts.forEach(script => {
            const src = script.getAttribute('src') || '';
            const innerHTML = script.innerHTML || '';
            if (
              src.includes('chat') || 
              src.includes('widget') || 
              src.includes('crisp') || 
              src.includes('intercom') ||
              innerHTML.includes('chat') ||
              innerHTML.includes('widget')
            ) {
              console.log('Removendo script de chat:', src || 'inline');
              script.remove();
            }
          });
        };

        // Executa imediatamente
        removeUnwantedElements();

        // Executa novamente após um delay para pegar elementos carregados dinamicamente
        setTimeout(removeUnwantedElements, 500);
        setTimeout(removeUnwantedElements, 1000);
        setTimeout(removeUnwantedElements, 2000);

        // Observa mudanças no DOM para remover widgets que aparecem depois
        const observer = new MutationObserver(() => {
          removeUnwantedElements();
        });

        observer.observe(iframeDoc.body, {
          childList: true,
          subtree: true
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
