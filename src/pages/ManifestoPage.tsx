import { useEffect, useRef, useState } from "react";
import SupportModal from "@/components/SupportModal";
import UserMenuModal from "@/components/UserMenuModal";
import { useAuth } from "@/hooks/useAuth";
import manifestoHtml from "@/assets/manifesto/index.html?raw";

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

        // Previne navegação para URLs relativas do manifesto
        const preventBadNavigation = (e: Event) => {
          const target = e.target as HTMLAnchorElement;
          if (target.tagName === 'A' && target.href && target.href.includes('manifesto/index.html')) {
            e.preventDefault();
            e.stopPropagation();
          }
        };
        iframeDoc.addEventListener('click', preventBadNavigation, true);

        cleanupExecuted = true;

        // Função para remover apenas scripts de tracking específicos
        const removeUnwantedElements = () => {
          // Remove apenas scripts de tracking externos
          const trackingScripts = iframeDoc.querySelectorAll(
            'script[src*="facebook.com"], script[src*="fbevents"], script[src*="clarity.ms"], ' +
            'script[src*="criteo.net"], script[src*="google-analytics.com"], script[src*="googletagmanager.com"]'
          );
          trackingScripts.forEach(script => script.remove());

          // Remove widgets de chat apenas
          const chatElements = iframeDoc.querySelectorAll(
            'iframe[src*="chat"], iframe[src*="widget"], [id*="crisp"], [id*="intercom"]'
          );
          chatElements.forEach(el => el.remove());
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
          // Busca otimizada: procura elementos que possam conter o texto
          const allElements = iframeDoc.querySelectorAll('div, section, article, main, span, p, h1, h2, h3');
          let targetElement = null;
          
          for (const element of Array.from(allElements)) {
            const text = (element as HTMLElement).textContent || '';
            if (text.includes("INGRESSOS ESGOTADOS") && !text.includes("Gramado")) {
              // Encontra o elemento mais específico que contém apenas a mensagem
              targetElement = element as HTMLElement;
              break;
            }
          }

          if (targetElement) {
            // Esconde o elemento antigo sem afetar o resto
            targetElement.style.display = 'none';
            // Cria o novo container com o design fornecido
            const newSection = iframeDoc.createElement("div");
            newSection.style.cssText = "max-width: 42rem; margin: 0 auto; padding: 1rem;";
            newSection.id = "ingressos-section";

            // Injeta estilos necessários sem CDN
            const styles = iframeDoc.createElement('style');
            styles.textContent = `
              .ticket-card { background: #e5e7eb; border-radius: 0.375rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); margin-bottom: 1rem; }
              .ticket-button { width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 0.75rem; cursor: pointer; border: none; background: transparent; }
              .ticket-left { display: flex; align-items: center; gap: 0.5rem; }
              .color-box { width: 1rem; height: 1rem; border-radius: 0.25rem; }
              .ticket-text { text-align: left; }
              .ticket-title { font-weight: 600; font-size: 1rem; margin: 0; }
              .ticket-price { font-size: 0.875rem; color: #4b5563; margin: 0; }
              .ticket-icon { font-size: 1.25rem; font-weight: bold; }
              .ticket-section { display: none; padding: 0 0.75rem 1rem; }
              .ticket-section.show { display: block; }
              .ticket-details { text-align: left; margin-bottom: 0.75rem; }
              .ticket-details p { font-size: 0.875rem; margin: 0.25rem 0; }
              .qty-controls { display: flex; align-items: center; gap: 0.75rem; margin-top: 0.5rem; }
              .qty-label { font-size: 0.875rem; font-weight: 500; }
              .qty-buttons { display: flex; align-items: center; gap: 0.5rem; }
              .qty-btn { padding: 0.25rem 0.5rem; background: #d1d5db; border: none; border-radius: 0.25rem; cursor: pointer; }
              .qty-display { width: 1.5rem; text-align: center; }
              .ticket-footer { display: none; position: fixed; bottom: 0; left: 0; right: 0; background: #2d7a2d; color: white; padding: 1rem; box-shadow: 0 -2px 10px rgba(0,0,0,0.1); z-index: 999; }
              .ticket-footer.show { display: block; }
              .footer-content { max-width: 42rem; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
              .footer-total-section p { margin: 0; }
              .footer-total-label { font-size: 0.875rem; opacity: 0.9; }
              .footer-total-price { font-size: 1.5rem; font-weight: bold; }
              .footer-total-qty { font-size: 0.75rem; opacity: 0.9; }
              .finalizar-btn { background: white; color: #2d7a2d; padding: 0.75rem 1.5rem; border: none; border-radius: 0.375rem; font-weight: 600; cursor: pointer; }
              .finalizar-btn:hover { background: #f3f4f6; }
            `;
            iframeDoc.head.appendChild(styles);

                // Define os dados dos ingressos
                const ingressosData = [
                  { id: 'gramado', nome: 'Gramado', valor: 290, cor: '#53ad53' },
                  { id: 'inferior-sul', nome: 'Inferior Sul', valor: 220, cor: '#ff78c9' },
                  { id: 'superior-sul', nome: 'Superior Sul', valor: 180, cor: '#e20615' },
                  { id: 'inferior-leste', nome: 'Inferior Leste', valor: 220, cor: '#38a1e0' },
                  { id: 'superior-leste', nome: 'Superior Leste', valor: 180, cor: '#832cb2' },
                  { id: 'inferior-oeste', nome: 'Inferior Oeste', valor: 220, cor: '#e20615' },
                ];

                // Funções de controle (declaradas ANTES de criar os elementos)
                const getTotalQty = () => {
                  let total = 0;
                  ingressosData.forEach(({ id }) => {
                    const qtySpan = iframeDoc.getElementById(`qty-${id}`);
                    if (qtySpan) {
                      total += parseInt(qtySpan.textContent || '0');
                    }
                  });
                  return total;
                };

                const getTotalPrice = () => {
                  let total = 0;
                  ingressosData.forEach(({ id, valor }) => {
                    const qtySpan = iframeDoc.getElementById(`qty-${id}`);
                    if (qtySpan) {
                      const qty = parseInt(qtySpan.textContent || '0');
                      total += qty * valor;
                    }
                  });
                  return total;
                };

                const updateFooter = () => {
                  const totalQty = getTotalQty();
                  const totalPrice = getTotalPrice();
                  const footer = iframeDoc.getElementById('ticket-footer');
                  const footerTotal = iframeDoc.getElementById('footer-total');
                  const footerQty = iframeDoc.getElementById('footer-qty');

                  if (footer && footerTotal && footerQty) {
                    if (totalQty > 0) {
                      footer.classList.add('show');
                      footerTotal.textContent = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
                      footerQty.textContent = `${totalQty} ${totalQty === 1 ? 'ingresso' : 'ingressos'}`;
                    } else {
                      footer.classList.remove('show');
                    }
                  }
                };

        const toggleSection = (id: string) => {
          const section = iframeDoc.getElementById(`section-${id}`);
          const icon = iframeDoc.getElementById(`icon-${id}`);
          if (section && icon) {
            const isHidden = !section.classList.contains('show');
            section.classList.toggle('show');
            icon.textContent = isHidden ? '-' : '+';
          }
        };

                const changeQty = (id: string, delta: number) => {
                  const qtySpan = iframeDoc.getElementById(`qty-${id}`);
                  if (qtySpan) {
                    let qty = parseInt(qtySpan.textContent || '0');
                    const totalQty = getTotalQty();
                    
                    // Se está tentando aumentar, verifica o limite global de 2
                    if (delta > 0 && totalQty >= 2) {
                      return; // Não permite adicionar mais
                    }
                    
                    qty = Math.max(0, Math.min(2, qty + delta));
                    qtySpan.textContent = qty.toString();
                    updateFooter();
                  }
                };

            // Cria os blocos de ingressos
            ingressosData.forEach(({ id, nome, valor, cor }) => {
              const bloco = iframeDoc.createElement('div');
              bloco.className = 'ticket-card';
              
              const button = iframeDoc.createElement('button');
              button.className = 'ticket-button';
              button.setAttribute('data-toggle-id', id);
              
              const leftDiv = iframeDoc.createElement('div');
              leftDiv.className = 'ticket-left';
              
              const colorBox = iframeDoc.createElement('div');
              colorBox.className = 'color-box';
              colorBox.style.backgroundColor = cor;
              
              const textDiv = iframeDoc.createElement('div');
              textDiv.className = 'ticket-text';
              const title = iframeDoc.createElement('h2');
              title.className = 'ticket-title';
              title.textContent = nome;
              
              const price = iframeDoc.createElement('p');
              price.className = 'ticket-price';
              price.textContent = `a partir de R$ ${valor},00`;
              
              textDiv.appendChild(title);
              textDiv.appendChild(price);
              leftDiv.appendChild(colorBox);
              leftDiv.appendChild(textDiv);
              
              const icon = iframeDoc.createElement('span');
              icon.id = `icon-${id}`;
              icon.className = 'ticket-icon';
              icon.textContent = '+';
              
              button.appendChild(leftDiv);
              button.appendChild(icon);
              
              // Seção expansível
              const section = iframeDoc.createElement('div');
              section.id = `section-${id}`;
              section.className = 'ticket-section';
              
              const detailsDiv = iframeDoc.createElement('div');
              detailsDiv.className = 'ticket-details';
              detailsDiv.innerHTML = `
                <p><strong>Ingresso:</strong> ${nome}</p>
                <p><strong>Lote:</strong> LOTE EXTRA</p>
                <p><strong>Valor:</strong> R$ ${valor},00 + taxa R$ 0</p>
              `;
              
              const qtyDiv = iframeDoc.createElement('div');
              qtyDiv.className = 'qty-controls';
              qtyDiv.innerHTML = `
                <label for="qty-${id}" class="qty-label">Quantidade:</label>
                <div class="qty-buttons">
                  <button class="qty-btn minus-btn" data-id="${id}">-</button>
                  <span id="qty-${id}" class="qty-display">0</span>
                  <button class="qty-btn plus-btn" data-id="${id}">+</button>
                </div>
              `;
              
              section.appendChild(detailsDiv);
              section.appendChild(qtyDiv);
              
              bloco.appendChild(button);
              bloco.appendChild(section);
              newSection.appendChild(bloco);
            });

            // Cria rodapé fixo
            const footer = iframeDoc.createElement('div');
            footer.id = 'ticket-footer';
            footer.className = 'ticket-footer';
            footer.innerHTML = `
              <div class="footer-content">
                <div class="footer-total-section">
                  <p class="footer-total-label">Total</p>
                  <p id="footer-total" class="footer-total-price">R$ 0,00</p>
                  <p id="footer-qty" class="footer-total-qty">0 ingressos</p>
                </div>
                <button id="finalizar-btn" class="finalizar-btn">
                  FINALIZAR COMPRA →
                </button>
              </div>
            `;
            iframeDoc.body.appendChild(footer);

            // Event listeners para os botões de toggle
            newSection.querySelectorAll('button[data-toggle-id]').forEach((btn) => {
              const toggleId = (btn as HTMLElement).getAttribute('data-toggle-id');
              if (toggleId) {
                btn.addEventListener('click', () => {
                  const section = iframeDoc.getElementById(`section-${toggleId}`);
                  const icon = iframeDoc.getElementById(`icon-${toggleId}`);
                  if (section && icon) {
                    const isHidden = !section.classList.contains('show');
                    section.classList.toggle('show');
                    icon.textContent = isHidden ? '-' : '+';
                  }
                });
              }
            });

            // Event listeners para os botões de quantidade
            newSection.querySelectorAll('.minus-btn').forEach((btn) => {
              btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = (btn as HTMLElement).dataset.id;
                if (id) changeQty(id, -1);
              });
            });
            
            newSection.querySelectorAll('.plus-btn').forEach((btn) => {
              btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = (btn as HTMLElement).dataset.id;
                if (id) changeQty(id, 1);
              });
            });

            // Event listener para o botão finalizar
            const finalizarBtn = iframeDoc.getElementById('finalizar-btn');
            if (finalizarBtn) {
              finalizarBtn.addEventListener('click', () => {
                console.log('Finalizar compra clicado');
              });
            }

            // Insere a nova seção APÓS o elemento antigo
            if (targetElement.parentNode) {
              targetElement.parentNode.insertBefore(newSection, targetElement.nextSibling);
            }
          }
        };

        // Executa limpeza inicial
        removeUnwantedElements();
        attachMenuHandlers();
        replaceTicketSection();

        // Garante que o iframe role para o topo
        if (iframeDoc.body) {
          iframeDoc.body.scrollTop = 0;
          if (iframeDoc.documentElement) {
            iframeDoc.documentElement.scrollTop = 0;
          }
        }

        // Observer simplificado - desconecta mais rápido
        let observerTimeout: NodeJS.Timeout;
        const debouncedHandler = () => {
          clearTimeout(observerTimeout);
          observerTimeout = setTimeout(() => {
            attachMenuHandlers();
          }, 500);
        };

        const observer = new MutationObserver(debouncedHandler);
        
        observer.observe(iframeDoc.body, {
          childList: true,
          subtree: false, // Não observa subárvore profundamente
          attributes: false,
          characterData: false
        });

        // Para o observer após 1 segundo
        setTimeout(() => {
          observer.disconnect();
          console.log('Carregamento otimizado completo');
        }, 1000);

        // Site carregado
        setIsLoading(false);

        return () => {
          observer.disconnect();
          clearTimeout(observerTimeout);
          iframeDoc.removeEventListener('click', preventBadNavigation, true);
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
        srcDoc={manifestoHtml}
        className="w-full h-screen border-0"
        title="Manifesto Musical"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
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
