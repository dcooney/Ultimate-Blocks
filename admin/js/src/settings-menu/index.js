// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Provider } from 'react-redux';
import TabsContainer from "./components/TabsContainer";
import Content from "./components/Content";
import Ribbon from "./components/Ribbon";
import store from '../stores/settings-menu';

export default function SettingsMenuApp() {
	return (
		<React.StrictMode>
			<Provider store={ store }>
				<div className={ 'ub-menu-wrapper' }>
					<div className={ 'ub-menu-window' }>
						<TabsContainer />
						<Content />
						<Ribbon />
					</div>
				</div>
			</Provider>
		</React.StrictMode>
	);
}
