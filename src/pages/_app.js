// pages/_app.js
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import '../styles/globals.css';  // Import the global styles (tailwindcss)
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Clear old service worker caches and register new one
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

      // Unregister old service workers
      navigator.serviceWorker.getRegistrations().then(registrations => {
        for (let registration of registrations) {
          registration.unregister();
          console.log('Service worker unregistered');
        }
      });

      // Register new service worker
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

    // Handle service worker errors
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', event => {
        if (event.data && event.data.type === 'SKIP_WAITING') {
          window.location.reload();
        }
      });
    }
  }, []);

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
