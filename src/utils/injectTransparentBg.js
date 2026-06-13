export default function injectTransparentBg(h) {
  const style = '<style>body { background: transparent !important; }</style>';
  if (h.includes('</head>')) return h.replace('</head>', style + '</head>');
  if (h.includes('</body>')) return h.replace('</body>', style + '</body>');
  if (h.includes('</html>')) return h.replace('</html>', style + '</html>');
  return h + style;
}
