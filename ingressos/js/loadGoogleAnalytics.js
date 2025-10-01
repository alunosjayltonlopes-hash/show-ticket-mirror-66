/**
 * Script Universal para Carregamento e Disparo de Eventos do Google Analytics 4 (GA4).
 *
 * Este script é projetado para ser chamado com parâmetros de URL que definem o evento
 * e os dados a serem enviados. Ele garante que a biblioteca do Google Analytics seja carregada
 * apenas uma vez e gerencia a inicialização de múltiplos IDs de medição.
 *
 * @param {string} event - O nome do evento do GA4 a ser disparado (ex: 'purchase', 'add_to_cart').
 * @param {string} data - Uma string JSON codificada por URI contendo os dados do evento
 * e uma lista de IDs de Analytics.
 *
 * Exemplo de estrutura do objeto JSON em 'data':
 * {
 * "id_analytics": ["G-XXXXXXXXXX", "G-YYYYYYYYYY"],
 * "value": 250.50,
 * "currency": "BRL",
 * "transaction_id": "ORDER_123",
 * ... outros parâmetros de evento
 * }
 */
(function() {
  'use strict';

  /**
   * Garante que o script base do Google Analytics (gtag) seja carregado na página.
   * Ele verifica se o objeto `gtag` já existe para evitar recarregamentos.
   */
  function loadGoogleAnalyticsBase() {
    if (window.gtag) {
      return;
    }

    // Carrega o script do Google Tag Manager
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js';
    document.head.appendChild(script);

    // Inicializa o gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      dataLayer.push(arguments);
    };
    gtag('js', new Date());
  }

  /**
   * Processa os eventos de analytics com base nos parâmetros da URL do script.
   */
  function processAnalyticsEvent() {
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

    const analyticsIds = eventData.id_analytics;
    const adsIds = eventData.id_googleads;
    const screen_name = eventData?.screen_name;
    const data_cart = eventData?.data_cart;

    if (!analyticsIds || !Array.isArray(analyticsIds) || analyticsIds.length === 0) {
      return;
    }

    // Remove a chave 'id_analytics' do objeto de dados do evento, pois ela não faz parte
    // dos parâmetros de evento do Google Analytics.
    delete eventData.id_analytics;

    // 1. Configura cada Analytics ID fornecido.
    analyticsIds.forEach(id => {
      gtag('config', id.trim());
    });

    adsIds.forEach(id => {
      gtag('config', id.trim());
    });
    // Envia page_view para todos os IDs
    gtag('event', 'page_view');

    const eventIsValid = eventName && eventName.trim() !== '' && Object.keys(eventData).length > 0;

    if (!eventIsValid) {
      return;
    }

    // Processa eventos específicos do GA4
    if (eventName.trim() === 'add_to_cart' && data_cart.length > 0) {
      const moeda = data_cart[0].moeda;
      const totalValue = data_cart.reduce((total, objeto) => {
        return total + parseFloat(objeto.valor);
      }, 0);
      const cartList = data_cart.map(objeto => ({
        item_id: objeto.id_ingresso,
        item_name: objeto.ingresso,
        item_list_name: objeto.evento,
        price: objeto.valor,
        quantity: objeto.qtd
      }));
      gtag('event', 'add_to_cart', {
        currency: moeda,
        value: totalValue,
        items: cartList
      });
    }

    if (eventName.trim() === 'begin_checkout') {
      const { currency, value, items } = eventData;

      gtag('event', 'begin_checkout', {
        currency,
        value,
        items
      });
    }

    if (eventName.trim() === 'purchase') {
      const { transaction_id, value, currency, items } = eventData;

      gtag('event', 'purchase', {
        transaction_id,
        value,
        currency,
        items
      });
    }

    if (eventName.trim() === 'view_item') {
      const { currency, value, items } = eventData;

      gtag('event', 'view_item', {
        currency,
        value,
        items
      });
    }

    if (eventName.trim() === 'add_to_wishlist') {
      const { currency, value, items } = eventData;
    }
  }

  // Inicia o processo
  loadGoogleAnalyticsBase();
  processAnalyticsEvent();

})();
