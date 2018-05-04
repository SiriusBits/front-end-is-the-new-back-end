import { h, app } from 'hyperapp'; // eslint-disable-line
import home from './pages/home';
import { INITIAL_STATE, appData } from './appdata';

app(INITIAL_STATE, appData, home, document.body);
