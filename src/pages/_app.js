// pages/_app.js
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import '../styles/globals.css';  // Import the global styles (tailwindcss)
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Clear old service worker caches and unregister service workers
    if ('serviceWorker' in navigator) {
      // Clear all caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            console.log('Deleting cache:', cacheName);
            return caches.delete(cacheName);
          })
        );
      }).then(() => {
        console.log('All caches cleared');
      }).catch(error => {
        console.error('Error clearing caches:', error);
      });

      // Unregister all service workers
      navigator.serviceWorker.getRegistrations().then(registrations => {
        for (let registration of registrations) {
          registration.unregister();
          console.log('Service worker unregistered');
        }
      });
    }
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 5000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}

export default MyApp;
