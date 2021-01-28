import types from '../types/savedLayoutsTypes';

const setSavedLayoutsBusyState = ( status ) => ( dispatch ) => {
	dispatch( {
		type: types.SAVED_LAYOUTS_SET_BUSY,
		status,
	} );
};

/**
 * Saved layouts actions.
 * @module
 */
export default {setSavedLayoutsBusyState};
