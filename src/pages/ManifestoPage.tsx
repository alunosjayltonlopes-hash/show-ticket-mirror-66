import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import TicketList from "@/components/TicketList";
import SupportModal from "@/components/SupportModal";
import UserMenuModal from "@/components/UserMenuModal";
import { useAuth } from "@/hooks/useAuth";

const ManifestoPage = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    let cleanupExecuted = false;

    iframe.onload = () => {
      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDoc || cleanupExecuted) return;

        cleanupExecuted = true;

        // Função otimizada para remover elementos indesejados
        const removeUnwantedElements = () => {
          // Injeta CSS apenas para suavizar aparição do rodapé
          const optimizationStyles = iframeDoc.createElement('style');
          optimizationStyles.textContent = `
            /* Melhora renderização de fontes */
            * {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
          `;
          
          if (!iframeDoc.querySelector('#lovable-optimization-styles')) {
            optimizationStyles.id = 'lovable-optimization-styles';
            iframeDoc.head.appendChild(optimizationStyles);
          }

          // Remove links externos de forma mais eficiente
          const allLinks = iframeDoc.querySelectorAll('a[href*="guicheweb"], a[href^="http"], a[href^="/"]');
          allLinks.forEach((link) => {
            const htmlLink = link as HTMLAnchorElement;
            htmlLink.removeAttribute('href');
            htmlLink.style.cursor = 'default';
            htmlLink.style.pointerEvents = 'none';
          });

          // Previne envio de formulários
          const forms = iframeDoc.querySelectorAll('form');
          forms.forEach((form) => {
            form.onsubmit = (e) => {
              e.preventDefault();
              return false;
            };
          });

          // Remove widgets de chat de forma mais eficiente (seletor único)
          const chatElements = iframeDoc.querySelectorAll(
            '[id*="chat"], [class*="chat"], [id*="widget"], [class*="widget"], ' +
            '[id*="messenger"], [class*="messenger"], [id*="whatsapp"], [class*="whatsapp"], ' +
            'iframe[src*="chat"], iframe[src*="widget"], div[style*="z-index: 999"]'
          );
          chatElements.forEach(el => el.remove());

          // Remove scripts de chat de forma otimizada
          const scripts = iframeDoc.querySelectorAll('script[src*="chat"], script[src*="widget"], script[src*="crisp"], script[src*="intercom"]');
          scripts.forEach(script => script.remove());
        };

        // Função otimizada para adicionar handlers de menu
        const attachMenuHandlers = () => {
          // Busca apenas links que ainda não foram processados
          const links = Array.from(iframeDoc.querySelectorAll('a:not([data-wired])')) as HTMLElement[];
          
          links.forEach((el) => {
            const text = (el.textContent || '').trim().toLowerCase();
            if (!text) return;

            const makeButton = (handler: (e: Event) => void) => {
              el.setAttribute('data-wired', '1');
              el.removeAttribute('href');
              el.style.pointerEvents = 'auto';
              el.style.cursor = 'pointer';
              el.setAttribute('role', 'button');
              el.setAttribute('tabindex', '0');
              el.addEventListener('click', (e) => { 
                e.preventDefault(); 
                e.stopPropagation();
                handler(e); 
              }, { passive: false });
            };

            if (text.includes('entre') || text.includes('cadastre') || text.includes('olá')) {
              if (user) {
                const displayName = user.email?.split('@')[0] || user.email || 'Usuário';
                el.textContent = `Olá, ${displayName}`;
              }
              makeButton(() => setIsUserMenuOpen(true));
            } else if (text.includes('ajuda')) {
              makeButton(() => setIsSupportOpen(true));
            } else if (text === 'home' || text.includes('home')) {
              makeButton(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
            }
          });
        };

        // Procura e substitui a seção de ingressos de forma otimizada
        const replaceTicketSection = () => {
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
                const ticketContainer = iframeDoc.createElement("div");
                ticketContainer.id = "react-ticket-list";
                ticketContainer.className = "max-w-7xl mx-auto px-4 py-12";
                
                // Adiciona título antes da lista
                const titleDiv = iframeDoc.createElement("div");
                titleDiv.className = "text-center mb-8";
                titleDiv.innerHTML = `
                  <h2 class="text-4xl font-bold text-gray-900 mb-2">INGRESSOS DISPONÍVEIS</h2>
                  <p class="text-gray-600">Escolha sua categoria e garanta seu lugar!</p>
                `;
                
                parent.innerHTML = "";
                parent.appendChild(titleDiv);
                parent.appendChild(ticketContainer);
                
                const root = createRoot(ticketContainer);
                root.render(<TicketList key={Date.now()} />);
                break;
              }
            }
          }
        };

        // Executa limpeza inicial imediatamente
        removeUnwantedElements();
        attachMenuHandlers();
        replaceTicketSection();

        // Observer otimizado com debounce
        let observerTimeout: NodeJS.Timeout;
        const debouncedHandler = () => {
          clearTimeout(observerTimeout);
          observerTimeout = setTimeout(() => {
            removeUnwantedElements();
            attachMenuHandlers();
          }, 300);
        };

        const observer = new MutationObserver(debouncedHandler);
        
        // Observa apenas mudanças relevantes
        observer.observe(iframeDoc.body, {
          childList: true,
          subtree: true,
          attributes: false, // Não observa mudanças de atributos
          characterData: false // Não observa mudanças de texto
        });

        // Para o observer após 5 segundos (quando o conteúdo já estiver estável)
        setTimeout(() => {
          observer.disconnect();
          console.log('Observer desconectado - carregamento completo');
        }, 5000);

        // Site carregado
        setIsLoading(false);

        return () => {
          observer.disconnect();
          clearTimeout(observerTimeout);
        };
      } catch (error) {
        console.error("Erro ao manipular iframe:", error);
        setIsLoading(false);
      }
    };
  }, [user]);

  return (
    <div className="min-h-screen w-full relative">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-muted-foreground">Carregando evento...</p>
          </div>
        </div>
      )}

      <iframe
        ref={iframeRef}
        src="/manifesto-original.html"
        className="w-full h-screen border-0"
        title="Manifesto Musical"
        sandbox="allow-scripts allow-same-origin allow-forms"
        loading="eager"
      />

      {/* Modais controlados fora do iframe */}
      <SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
      <UserMenuModal 
        isOpen={isUserMenuOpen} 
        onClose={() => setIsUserMenuOpen(false)}
        isLoggedIn={!!user}
      />
    </div>
  );
};

export default ManifestoPage;
