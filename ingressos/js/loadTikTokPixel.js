/**
 * Script Universal para Carregamento e Disparo de Eventos do TikTok Pixel.
 *
 * Este script é projetado para ser chamado com parâmetros de URL que definem o evento
 * e os dados a serem enviados. Ele garante que a biblioteca do TikTok Pixel seja carregada
 * apenas uma vez e gerencia a inicialização de múltiplos IDs de Pixel.
 *
 * @param {string} event - O nome do evento do TikTok a ser disparado (ex: 'Purchase', 'AddToCart').
 * @param {string} data - Uma string JSON codificada por URI contendo os dados do evento
 * e uma lista de IDs de TikTok Pixel.
 *
 * Exemplo de estrutura do objeto JSON em 'data':
 * {
 * "id_tiktok": ["C4XXXXXXXXXXXXXXXXXX", "C4YYYYYYYYYYYYYYYY"],
 * "value": 250.50,
 * "currency": "BRL",
 * "content_id": "PRODUCT_123",
 * "content_type": "product",
 * "description": "Event description",
 * ... outros parâmetros de evento
 * }
 */
(function() {
  'use strict';

  /**
   * Garante que o script base do TikTok Pixel seja carregado na página.
   * Ele verifica se o objeto `ttq` já existe para evitar recarregamentos.
   */
  function loadTikTokPixelBase() {
    if (window.ttq) {
      return;
    }

    !function (w, d, t) {
      w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};

      ttq.load('PLACEHOLDER');
      ttq.page();
    }(window, document, 'ttq');
  }

  /**
   * Processa os eventos de pixel com base nos parâmetros da URL do script.
   */
  function processTikTokPixelEvent() {
    // Pega a tag <script> que está sendo executada no momento.
    const currentScript = document.currentScript;
    if (!currentScript) {
      return;
    }

    // Extrai os parâmetros da URL do atributo 'src' do script.
    const scriptUrl = new URL(currentScript.src);
    const eventName = scriptUrl.searchParams.get('event');
    const encodedData = scriptUrl.searchParams.get('data');

    if (!encodedData) {
      return;
    }

    let eventData;
    try {
      // Decodifica o componente da URI e depois faz o parse do JSON.
      const decodedJson = decodeURIComponent(encodedData);
      eventData = JSON.parse(decodedJson);
    } catch (e) {
      return;
    }

    const tiktokIds = eventData.id_tiktok;

    if (!tiktokIds || !Array.isArray(tiktokIds) || tiktokIds.length === 0) {
      return;
    }

    // Remove a chave 'id_tiktok' do objeto de dados do evento, pois ela não faz parte
    // dos parâmetros de evento do TikTok.
    delete eventData.id_tiktok;

    // 1. Inicializa cada TikTok Pixel ID fornecido.
    tiktokIds.forEach(id => {
      ttq.load(id.trim());
      ttq.page();
    });

    const eventIsValid = eventName && eventName.trim() !== '' && Object.keys(eventData).length > 0;

    if (!eventIsValid) {
      return;
    }

    // Processa eventos específicos do TikTok
    if (eventName.trim() === 'AddToCart') {
      const { content_id, content_type, value, currency, description } = eventData;

      ttq.track('AddToCart', {
        content_id,
        content_type,
        value,
        currency,
        description
      });
    }

    if (eventName.trim() === 'InitiateCheckout') {
      const { content_id, content_type, value, currency, description } = eventData;

      ttq.track('InitiateCheckout', {
        content_id,
        content_type,
        value,
        currency,
        description
      });
    }

    if (eventName.trim() === 'Purchase') {
      const { content_id, content_type, value, currency, description } = eventData;

      ttq.track('Purchase', {
        content_id,
        content_type,
        value,
        currency,
        description
      });
    }

    if (eventName.trim() === 'ViewContent') {
      const { content_id, content_type, value, currency, description } = eventData;

      ttq.track('ViewContent', {
        content_id,
        content_type,
        value,
        currency,
        description
      });
    }

    if (eventName.trim() === 'AddToWishlist') {
      const { content_id, content_type, value, currency, description } = eventData;

      ttq.track('AddToWishlist', {
        content_id,
        content_type,
        value,
        currency,
        description
      });
    }

    if (eventName.trim() === 'Search') {
      const { content_id, content_type, value, currency, description, query } = eventData;

      ttq.track('Search', {
        content_id,
        content_type,
        value,
        currency,
        description,
        query
      });
    }

    if (eventName.trim() === 'ClickButton') {
      const { content_id, content_type, description } = eventData;

      ttq.track('ClickButton', {
        content_id,
        content_type,
        description
      });
    }

    // Para eventos personalizados
    if (!['AddToCart', 'InitiateCheckout', 'Purchase', 'ViewContent', 'AddToWishlist', 'Search', 'ClickButton'].includes(eventName.trim())) {
      ttq.track(eventName.trim(), eventData);
    }
  }

  // Inicia o processo
  loadTikTokPixelBase();
  processTikTokPixelEvent();

})();
