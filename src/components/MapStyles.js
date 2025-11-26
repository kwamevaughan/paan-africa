import { useEffect } from 'react';

const MapStyles = () => {
  useEffect(() => {
    // Import Leaflet CSS
    import('leaflet/dist/leaflet.css');
    
    // Custom map styles
    const style = document.createElement('style');
    style.textContent = `
      /* Custom marker styles */
      .custom-marker {
        background: transparent !important;
        border: none !important;
      }
      
      /* Agency marker animation */
      .custom-marker[data-agency="true"] {
        animation: pulse 2s infinite;
      }
      
      @keyframes pulse {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.05);
        }
        100% {
          transform: scale(1);
        }
      }
      
      /* Leaflet popup customization */
      .leaflet-popup-content-wrapper {
        border-radius: 12px;
        padding: 0;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      }
      
      .leaflet-popup-content {
        margin: 0;
        padding: 0;
      }
      
      .leaflet-popup-tip {
        background-color: white;
      }
      
      /* Map controls styling */
      .leaflet-control-zoom {
        border: none !important;
        border-radius: 8px !important;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
      }
      
      .leaflet-control-zoom a {
        background-color: white !important;
        color: #374151 !important;
        border: none !important;
        width: 36px !important;
        height: 36px !important;
        line-height: 34px !important;
        font-size: 18px !important;
        font-weight: bold !important;
      }
      
      .leaflet-control-zoom a:hover {
        background-color: #f3f4f6 !important;
      }
      
      /* Remove Leaflet attribution for cleaner look */
      .leaflet-control-attribution {
        font-size: 10px !important;
        background-color: rgba(255, 255, 255, 0.8) !important;
        border-radius: 4px !important;
        padding: 2px 4px !important;
      }
      
      /* Map container styling */
      .leaflet-container {
        font-family: inherit !important;
      }
      
      /* Custom cluster styles if using clustering */
      .marker-cluster-small,
      .marker-cluster-medium,
      .marker-cluster-large {
        background-color: rgba(132, 193, 217, 0.8) !important;
        border: 3px solid white !important;
        border-radius: 50% !important;
        color: white !important;
        font-weight: bold !important;
        text-align: center !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
      }
      
      .marker-cluster-small div,
      .marker-cluster-medium div,
      .marker-cluster-large div {
        background-color: rgba(132, 193, 217, 1) !important;
        border-radius: 50% !important;
        color: white !important;
        font-weight: bold !important;
      }
    `;
    
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return null;
};

export default MapStyles;
