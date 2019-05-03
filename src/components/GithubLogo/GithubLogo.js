import React from 'react';
import github_logo from './github_logo.png';

const GithubLogo = () => {
  return (
    <div>
        <div>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/solariss13/iceland-map-app">
            <img className="githubLogo" title="Visit my GitHub repository" alt="github_logo" src={github_logo} />
          </a>
        </div>
    </div>
  );
}

export default GithubLogo;