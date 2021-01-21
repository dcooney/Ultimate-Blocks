import React from 'react';

const { PanelBody } = wp.components;
const { __ } = wp.i18n;

/**
 * Saved layouts component.
 *
 * This component will be used in editor inspector controls for any saved style/layouts for block elements.
 *
 * @return {JSX.Element} Saved layouts component
 * @constructor
 */
export default function SavedLayouts() {
	return (
		<PanelBody title={ __( 'Saved Layouts', 'ultimate-blocks' ) }>
			<i>saved layouts</i>
		</PanelBody>
	);
}
