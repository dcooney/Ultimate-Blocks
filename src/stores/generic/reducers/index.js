import savedLayoutsReducers from "./savedLayoutsReducers";

const { combineReducers } = wp.data;

/**
 * Generic store reducers.
 * @module
 */
export default combineReducers( { savedLayoutsReducers } );
