import { createSlice, createStore } from '@reduxjs/toolkit';
import state from './state';

/**
 * Store slice for settings menu.
 * @type {Object}
 */
const settingsMenuSlice = createSlice(
	{
		name: 'settingsMenu',
		initialState: state,
	},
);

/**
 * @module settings menu store
 */
export default createStore( settingsMenuSlice.reducer );

