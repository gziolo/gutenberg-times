<?php
/*
 * Plugin Name: Gutenberg Times
 */

function gutenberg_times_enqueue() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` first.'
		);
	}
	$script_asset = require( $script_asset_path );
	wp_enqueue_script(
		'gutenberg_times-script',
		plugins_url( 'build/index.js', __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
}
add_action( 'enqueue_block_editor_assets', 'gutenberg_times_enqueue' );
