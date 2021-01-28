import { createStore } from 'redux';
import state from './state';
import reducers from './reducers';

const genericStore = createStore( reducers, state );

/**
 * Generic redux store.
 * @module
 */
export default genericStore;
