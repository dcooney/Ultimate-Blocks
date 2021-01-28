<?php

// if called directly, abort process
if ( ! defined( 'WPINC' ) ) {
	die();
}

/**
 * Class Ultimate_Blocks_Saved_Layouts_Manager
 *
 * Manager class for saved layouts operations.
 */
class Ultimate_Blocks_Saved_Layouts_Manager {
	/**
	 * Rest route namespace constant.
	 */
	const REST_ROUTE_NAMESPACE = 'ultimate-blocks/v1';

	/**
	 * Nonce action constant for saved layouts component.
	 */
	const NONCE_ACTION = 'saved-layouts';

	/**
	 * Initialize and make necessary setup operations for manager.
	 */
	public static function initialize_manager() {
		// add saved layout related endpoints
		add_action( 'rest_api_init', [ __CLASS__, 'saved_layouts_rest_endpoints' ] );
		add_filter( 'ultimate-blocks/editor_script_data', [ __CLASS__, 'editor_data' ] );
	}

	public static function editor_data( $data ) {
		$data['savedLayouts'] = [
			'security' => [
				'nonce' => wp_create_nonce( self::NONCE_ACTION )
			]
		];
		return $data;
	}

	/**
	 * Get saved layouts from plugin options.
	 *
	 * @return array saved layouts
	 */
	public static function saved_layouts_get_method_callback() {
		$saved_layouts = get_option( 'ultimate-blocks/saved-layouts', [] );

		return is_array( $saved_layouts ) ? $saved_layouts : [];
	}

	/**
	 * Generic permission callback factory function.
	 *
	 * @param string|null $nonce_action nonce action name
	 *
	 * @return Closure function to be used in rest api permission callback
	 */
	public static function generic_permission_callback( $nonce_action = null ) {
		return function () use ( $nonce_action ) {
			if ( is_user_logged_in() && current_user_can( 'edit_posts' ) ) {
				if ( $nonce_action !== null ) {
					$validation_status = filter_var( check_ajax_referer( $nonce_action, 'nonce', false ),
						FILTER_VALIDATE_BOOLEAN );
					if ( $validation_status ) {
						return true;
					}
				} else {
					return true;
				}
			}

			// if all checks fail, return a WP_Error object
			return new WP_Error( 'rest_forbidden', esc_html__( 'You are not authorized to use this REST API endpoint' ),
				[ 'status' => 401 ] );
		};
	}

	/**
	 * Create REST API endpoint for saved layout functionality.
	 */
	public static function saved_layouts_rest_endpoints() {
		// TODO [erdembircan] change 'permission_callback' with the real callback for production
		register_rest_route( self::REST_ROUTE_NAMESPACE, '/saved-layouts', [
			'methods'             => 'GET',
			'callback'            => [ __CLASS__, 'saved_layouts_get_method_callback' ],
			'permission_callback' => static::generic_permission_callback(self::NONCE_ACTION)
		] );
	}
}
