import { renderToString } from 'react-dom/server';

export default ({ template, app, data }) => {
  const renderedApp = renderToString(app);

  const ssrDataInjection = `<script>window.ssr = true;window.ssrData = ${data}</script>`;

  return template
    .replace(`</head>`, `${ssrDataInjection}</head>`)
    .replace(`<div id="app"></div>`, `<div id="app">${renderedApp}</div>`);
};
