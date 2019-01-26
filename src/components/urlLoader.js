import React from 'react';

const urlLoader = () => {
    return (
      <div>
        <iframe
          title="map"
          width="600"
          height="450"
          frameBorder="0" 
          src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBKzcVWQTY-pP1RngW1C0oREXdX84H9cJM
            &q=Space+Needle,Seattle+WA" 
          allowFullScreen>
        </iframe>
      </div>)
    }
export default urlLoader;