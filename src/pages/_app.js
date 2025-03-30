// pages/_app.js
import '../styles/globals.css';  // Import the global styles (tailwindcss)

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
