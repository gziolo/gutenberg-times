const { compose, ifCondition } = wp.compose;
const { withSelect } = wp.data;
const { registerFormatType, unregisterFormatType } = wp.richText;

const { name, edit, ...bold } = unregisterFormatType( 'core/bold' );

const PullquoteOnlyEdit = compose( [
	withSelect( ( select ) => {
		const { getSelectedBlock } = select( 'core/block-editor' );
		return {
			selectedBlock: getSelectedBlock(),
		}
	} ),
	ifCondition(
		( { selectedBlock } ) =>
			selectedBlock && selectedBlock.name === 'core/pullquote'
	),
] )( edit );

registerFormatType( name, {
	...bold,
	edit: PullquoteOnlyEdit,
} );
