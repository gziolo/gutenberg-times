<?php
/*
 * Plugin Name: Gutenberg Times
 */

function gutenberg_times_enqueue() {
	wp_enqueue_script(
		'gutenberg_times-script',
		plugins_url( 'build/index.js', __FILE__ ),
		array(
			'wp-block-editor',
			'wp-compose',
			'wp-data',
			'wp-format-library', // necessary for correct load order allowing to override Bold control
			'wp-rich-text',
		),
		time()
	);
}
add_action( 'enqueue_block_editor_assets', 'gutenberg_times_enqueue' );
