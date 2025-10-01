// var rules = [
//   // if it says it's a webview, let's go with that
//   'WebView',
//   // iOS webview will be the same as safari but missing "Safari"
//   '(iPhone|iPod|iPad)(?!.*Safari)',
//   // Android Lollipop and Above: webview will be the same as native but it will contain "wv"
//   // Android KitKat to Lollipop webview will put Version/X.X Chrome/{version}.0.0.0
//   'Android.*(;\\s+wv|Version/\\d.\\d\\s+Chrome/\\d+(\\.0){3})',
//   // old chrome android webview agent
//   'Linux; U; Android'
// ]

// var webviewRegExp = new RegExp('(' + rules.join('|') + ')', 'ig')

// function isWebview(ua) {
//   return !!ua.match(webviewRegExp)
// }

// var ua = navigator.userAgent;

// // CARREGA O CHAT SOMENTE NA WEB
// if (!isWebview(ua)) {
//   (function (o, c, t, a, d, e, s, k) {
//     o.octadesk = o.octadesk || {};
//     o.octadesk.chatOptions = {
//     subDomain: a,
//     showButton: d,
//     openOnMessage: e,
//     hide: s
//     };
//     var bd = c.getElementsByTagName("body")[0];
//     var sc = c.createElement("script");
//     sc.async = 1;
//     sc.src = t;
//     bd.appendChild(sc);
//     })(window, document, 'https://cdn.octadesk.com/embed.js', 'o164374-07b', 'true', 'true', 'false');
// }

(function (o, c, t, a, d, e, s, k) {
  o.octadesk = o.octadesk || {};
  o.octadesk.chatOptions = {
  subDomain: a,
  showButton: d,
  openOnMessage: e,
  hide: s
  };
  var bd = c.getElementsByTagName("body")[0];
  var sc = c.createElement("script");
  sc.async = 1;
  sc.src = t;
  bd.appendChild(sc);
  })(window, document, 'https://cdn.octadesk.com/embed.js', 'o164374-07b', 'true', 'true', 'false');