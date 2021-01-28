import defaultState from '../state';
import types from '../types/savedLayoutsTypes';

const setBusy = ( state = defaultState, action ) => {
	if (action.type === types.SAVED_LAYOUTS_SET_BUSY) {
		return { ...state, ...{ savedLayout: { busy: action.status } } };
	}

};

/**
 * Saved layouts component reducers.
 * @module
 */
export default setBusy;

