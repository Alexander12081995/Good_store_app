import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import {Provider} from "react-redux";
import {store} from "./store";
import './api/server.js';


ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
      <Provider store={store}>
          <Router>
              <App/>
          </Router>
      </Provider>
  );
