// const loadGoogleMaps = () => {
//     return new Promise((resolve, reject)=>{
// 			window.resolveGoogleMapsPromise = () => {
// 				resolve(window.google);
// 				delete window.resolveGoogleMapsPromise;
// 			}

// 			const script = document.createElement('script');
// 			const API_KEY = 'AIzaSyC0fntjhAf5ntQN8orIvSDuxiJ6sHwV25w';

// 			script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=resolveGoogleMapsPromise`;
// 			script.async = true;
// 			document.body.appendChild(script)
//     })
// }

// export default loadGoogleMaps;