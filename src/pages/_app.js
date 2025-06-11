// pages/_app.js
import '../styles/globals.css';  // Import the global styles (tailwindcss)
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#172840',
            color: '#fff',
          },
        }}
      />
    </>
  );
}

export default MyApp;
