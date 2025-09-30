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
          // Injeta CSS para melhorar renderização E esconder seção antiga de ingressos
          const optimizationStyles = iframeDoc.createElement('style');
          optimizationStyles.textContent = `
            /* Melhora renderização de fontes */
            * {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            /* Esconde imediatamente a seção antiga de ingressos */
            *:has(:contains("INGRESSOS ESGOTADOS")) {
              opacity: 0 !important;
              visibility: hidden !important;
            }
          `;
          
          if (!iframeDoc.querySelector('#lovable-optimization-styles')) {
            optimizationStyles.id = 'lovable-optimization-styles';
            iframeDoc.head.appendChild(optimizationStyles);
          }

          // Mantendo links do ORIGINAL; não desabilitar para preservar o fluxo
          // (links continuam funcionando dentro do iframe)

          // Mantendo formulários do ORIGINAL; não bloquear envio para preservar o script

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

        // Remove a seção de localização/mapa
        const removeMapSection = () => {
          // Busca por elementos que contenham "LOCALIZAÇÃO" ou mapa do Google
          const walker = iframeDoc.createTreeWalker(
            iframeDoc.body,
            NodeFilter.SHOW_TEXT,
            null
          );

          let node;
          while ((node = walker.nextNode())) {
            if (node.textContent?.includes("LOCALIZAÇÃO") || node.textContent?.includes("Ver mapa ampliado")) {
              // Encontra o container pai da seção do mapa
              let parent = node.parentElement;
              let maxLevels = 8; // Limita a busca a 8 níveis acima
              
              while (parent && parent !== iframeDoc.body && maxLevels > 0) {
                // Verifica se este elemento contém o mapa (iframe do Google Maps ou imagem do mapa)
                const hasMap = parent.querySelector('iframe[src*="google.com/maps"]') || 
                               parent.querySelector('img[src*="maps"]') ||
                               parent.querySelector('[class*="map"]') ||
                               parent.querySelector('[id*="map"]');
                
                if (hasMap) {
                  // Remove toda a seção do mapa, mas preserva o rodapé
                  // Verifica se não é o rodapé (footer)
                  const isFooter = parent.tagName === 'FOOTER' || 
                                   parent.querySelector('footer') ||
                                   parent.textContent?.includes('CNPJ') ||
                                   parent.textContent?.includes('Institucional');
                  
                  if (!isFooter) {
                    parent.style.display = 'none';
                    console.log('Seção de localização/mapa removida');
                    return;
                  }
                }
                
                parent = parent.parentElement;
                maxLevels--;
              }
              break;
            }
          }

          // Método alternativo: remove iframes do Google Maps diretamente
          const googleMapsIframes = iframeDoc.querySelectorAll('iframe[src*="google.com/maps"]');
          googleMapsIframes.forEach(iframe => {
            let container = iframe.parentElement;
            let levels = 5;
            
            while (container && levels > 0) {
              const hasLocalizacaoText = container.textContent?.includes('LOCALIZAÇÃO') || 
                                          container.textContent?.includes('Ver mapa ampliado');
              const isNotFooter = !container.textContent?.includes('CNPJ') && 
                                  !container.textContent?.includes('Institucional');
              
              if (hasLocalizacaoText && isNotFooter) {
                container.style.display = 'none';
                console.log('Seção de mapa removida via iframe do Google Maps');
                return;
              }
              
              container = container.parentElement;
              levels--;
            }
          });
        };

        // Procura e substitui a seção de ingressos de forma otimizada
        const replaceTicketSection = () => {
          // Busca pela seção que contém "INGRESSOS ESGOTADOS"
          const walker = iframeDoc.createTreeWalker(
            iframeDoc.body,
            NodeFilter.SHOW_TEXT,
            null
          );

          let node;
          while ((node = walker.nextNode())) {
            if (node.textContent?.includes("INGRESSOS ESGOTADOS")) {
              // Encontra o container pai principal (pode ser section, div, etc)
              let parent = node.parentElement;
              while (parent && parent !== iframeDoc.body && parent.children.length <= 5) {
                parent = parent.parentElement;
              }
              
              if (parent && parent !== iframeDoc.body) {
                // Remove o conteúdo antigo imediatamente
                parent.style.display = 'none';
                // Cria o novo container com o design fornecido
                const newSection = iframeDoc.createElement("div");
                newSection.className = "max-w-2xl mx-auto space-y-4 p-4";
                newSection.id = "ingressos-section";

                // Injeta o Tailwind CDN se não existir
                if (!iframeDoc.querySelector('script[src*="tailwindcss"]')) {
                  const tailwindScript = iframeDoc.createElement('script');
                  tailwindScript.src = "https://cdn.tailwindcss.com";
                  iframeDoc.head.appendChild(tailwindScript);
                }

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
                      footer.classList.remove('hidden');
                      footerTotal.textContent = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;
                      footerQty.textContent = `${totalQty} ${totalQty === 1 ? 'ingresso' : 'ingressos'}`;
                    } else {
                      footer.classList.add('hidden');
                    }
                  }
                };

                const toggleSection = (id: string) => {
                  const section = iframeDoc.getElementById(`section-${id}`);
                  const icon = iframeDoc.getElementById(`icon-${id}`);
                  if (section && icon) {
                    section.classList.toggle('hidden');
                    icon.textContent = section.classList.contains('hidden') ? '+' : '-';
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
                  bloco.className = 'bg-gray-200 shadow rounded';
                  
                  const button = iframeDoc.createElement('button');
                  button.className = 'w-full flex items-center justify-between p-3';
                  button.setAttribute('data-toggle-id', id);
                  
                  const leftDiv = iframeDoc.createElement('div');
                  leftDiv.className = 'flex items-center space-x-2';
                  
                  const colorBox = iframeDoc.createElement('div');
                  colorBox.className = 'w-4 h-4 rounded';
                  colorBox.style.backgroundColor = cor;
                  
                  const textDiv = iframeDoc.createElement('div');
                  textDiv.className = 'text-left';
                  const title = iframeDoc.createElement('h2');
                  title.className = 'font-semibold text-base';
                  title.textContent = nome;
                  
                  const price = iframeDoc.createElement('p');
                  price.className = 'text-sm text-gray-600';
                  price.textContent = `a partir de R$ ${valor},00`;
                  
                  textDiv.appendChild(title);
                  textDiv.appendChild(price);
                  leftDiv.appendChild(colorBox);
                  leftDiv.appendChild(textDiv);
                  
                  const icon = iframeDoc.createElement('span');
                  icon.id = `icon-${id}`;
                  icon.className = 'text-xl font-bold';
                  icon.textContent = '+';
                  
                  button.appendChild(leftDiv);
                  button.appendChild(icon);
                  
                  // Seção expansível
                  const section = iframeDoc.createElement('div');
                  section.id = `section-${id}`;
                  section.className = 'hidden px-3 pb-4 space-y-3';
                  
                  const detailsDiv = iframeDoc.createElement('div');
                  detailsDiv.className = 'text-left space-y-1';
                  detailsDiv.innerHTML = `
                    <p class="text-sm"><strong>Ingresso:</strong> ${nome}</p>
                    <p class="text-sm"><strong>Lote:</strong> LOTE EXTRA</p>
                    <p class="text-sm"><strong>Valor:</strong> R$ ${valor},00 + taxa R$ 0</p>
                  `;
                  
                  const qtyDiv = iframeDoc.createElement('div');
                  qtyDiv.className = 'flex items-center space-x-3 mt-2';
                  qtyDiv.innerHTML = `
                    <label for="qty-${id}" class="text-sm font-medium">Quantidade:</label>
                    <div class="flex items-center space-x-2">
                      <button class="px-2 py-1 bg-gray-300 rounded minus-btn" data-id="${id}">-</button>
                      <span id="qty-${id}" class="w-6 text-center">0</span>
                      <button class="px-2 py-1 bg-gray-300 rounded plus-btn" data-id="${id}">+</button>
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
                footer.className = 'hidden fixed bottom-0 left-0 right-0 bg-[#2d7a2d] text-white p-4 shadow-lg z-50';
                footer.innerHTML = `
                  <div class="max-w-2xl mx-auto flex items-center justify-between">
                    <div>
                      <p class="text-sm opacity-90">Total</p>
                      <p id="footer-total" class="text-2xl font-bold">R$ 0,00</p>
                      <p id="footer-qty" class="text-xs opacity-90">0 ingressos</p>
                    </div>
                    <button id="finalizar-btn" class="bg-white text-[#2d7a2d] px-6 py-3 rounded font-semibold hover:bg-gray-100 transition-colors">
                      FINALIZAR COMPRA →
                    </button>
                  </div>
                `;
                iframeDoc.body.appendChild(footer);

                // Substitui o conteúdo
                parent.innerHTML = "";
                parent.appendChild(newSection);
                
                // Mostra o novo conteúdo
                parent.style.display = 'block';
                parent.style.opacity = '1';

                // Event listeners para os botões de toggle (DEPOIS de adicionar ao DOM)
                newSection.querySelectorAll('button[data-toggle-id]').forEach((btn) => {
                  const toggleId = (btn as HTMLElement).getAttribute('data-toggle-id');
                  if (toggleId) {
                    btn.addEventListener('click', () => toggleSection(toggleId));
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
                    // Aqui você pode adicionar a lógica de finalização
                  });
                }
                
                break;
              }
            }
          }
        };

        // Executa limpeza inicial imediatamente
        removeUnwantedElements();
        removeMapSection();
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
