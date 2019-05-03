import React from 'react';
import facebook_logo from'./facebook_logo.png';

const FacebookLogo = () => {
  return (
    <div>
        <div> 
          <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/PrzystanekIslandia/">
            <img className="facebookLogo" title="Check out my fanpage!" alt="facebook_logo" src={facebook_logo} /> 
          </a>
        </div>
    </div>
  );
}

export default FacebookLogo;