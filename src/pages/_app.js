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
          style: {
            maxWidth: '500px',
            background: '#fff',
            color: '#172840',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
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
