import React from 'react';
import ReactDOM from 'react-dom';

import GalleryByReactApp from './components/GalleryByReactApp';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<GalleryByReactApp />, document.getElementById('root'));
registerServiceWorker();
