import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" style={{ scrollBehavior: "smooth" }}>
      <Head>
        <meta name="theme-color" content="#0055D1" />
        <meta name="description" content="AI Club at SCET – Venture into the future with a community exploring, learning, and building with AI." />
        <meta property="og:title" content="AI Club SCET" />
        <meta property="og:description" content="Unleashing minds and igniting innovation. Join AI Club." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/banner.png" />
        <meta property="og:url" content="https://aiclub.scet/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
