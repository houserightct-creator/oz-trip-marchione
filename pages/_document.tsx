import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="OZ Trip 2026 — Marchione Family Australia Adventure" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
        <style>{`
          :root {
            --rust: #C4622D;
            --sand: #E8D5B0;
            --deep: #1A1410;
            --ochre: #D4894A;
            --sky: #4A8FA8;
            --night: #0D1B2A;
            --green: #3A7D5C;
            --cream: #F5EFE0;
            --red: #B83232;
            --white: #FDFAF4;
          }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          html, body {
            font-family: 'DM Sans', sans-serif;
            background: var(--night);
            color: var(--cream);
            min-height: 100vh;
          }
        `}</style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
