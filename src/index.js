const { RichTextToolbarButton } = wp.blockEditor;
const { compose, ifCondition } = wp.compose;
const { withSelect } = wp.data;
const { applyFormat, registerFormatType, removeFormat, unregisterFormatType } = wp.richText;

// Bold controls on Pullquote block only.
const { name, edit, ...bold } = unregisterFormatType( 'core/bold' );

const PullquoteOnlyEdit = compose( [
	withSelect( ( select ) => {
		const { getSelectedBlock } = select( 'core/block-editor' );
		return {
			selectedBlock: getSelectedBlock(),
		};
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

// Text Color controls added to the block toolbar when using `RichText`.
[ 'red', 'blue', 'green' ].forEach( ( color ) => {
	const textColorFormatName = `gutenberg-times/text-color-${ color }`;

	const TextColorEdit = ( { isActive, value, onChange } ) => {
		const onClick = () => {
			if ( isActive ) {
				onChange( removeFormat( value, textColorFormatName ) );
				return;
			}

			onChange( applyFormat( value, {
				type: textColorFormatName,
				attributes: {
					style: `color: ${ color }`,
				},
			} ) );
		};

		return (
			<RichTextToolbarButton
				icon="smiley"
				title={ `Text Color (${ color })` }
				onClick={ onClick }
				isActive={ isActive }
			/>
		);
	};

	registerFormatType( textColorFormatName, {
		title: `Text Color (${ color })`,
		tagName: 'span',
		className: `gutenberg-times-text-color-${ color }`,
		edit: TextColorEdit,
	} );
} );
