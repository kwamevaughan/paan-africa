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
          // Default options for all toasts
          duration: 5000,
          
          success: {
            style: {
              background: '#10B981',
              color: '#fff',
            },
            icon: '🎉',
          },
          error: {
            style: {
              background: '#EF4444',
              color: '#fff',
            },
            icon: '❌',
          },
        }}
      />
    </>
  );
}

export default MyApp;
