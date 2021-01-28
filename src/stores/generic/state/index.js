import savedLayoutState from "./savedLayoutsState";

const defaultState = {};

/**
 * General state data for generic plugin store.
 * @module
 */
export default { ...defaultState, ...savedLayoutState };
