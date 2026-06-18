export default function injectTransparentBg(h) {
  const style = '<style>body { background: transparent !important; }</style>';
  if (h.includes('</head>')) return h.replace('</head>', style + '</head>');
  if (h.includes('</body>')) return h.replace('</body>', style + '</body>');
  if (h.includes('</html>')) return h.replace('</html>', style + '</html>');
  return h + style;
}

export function injectGameFitCss(h) {
  const css = '<style>'
    + 'html,body{width:100%!important;max-width:100vw!important;margin:0 auto!important;box-sizing:border-box!important}'
    + 'body>*{max-width:100%!important}'
    + 'canvas,img,video,object,embed,table{max-width:100%!important;height:auto!important}'
    + 'body{background:transparent!important}'
    + '</style>';
  if (h.includes('</head>')) return h.replace('</head>', css + '</head>');
  if (h.includes('</body>')) return h.replace('</body>', css + '</body>');
  if (h.includes('</html>')) return h.replace('</html>', css + '</html>');
  return h + css;
}
