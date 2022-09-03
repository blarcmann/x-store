import ContentLoader from "react-content-loader";

const CardLoader = (props: any) => (
	<ContentLoader
		speed={2}
		width={180}
		height={249}
		viewBox="0 0 180 249"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		className="w-full h-auto"
		{...props}
	>
		<rect x="34" y="230" rx="3" ry="3" width="110" height="10" />
		<rect x="0" y="0" rx="6" ry="6" width="180" height="180" />
	</ContentLoader>
);

export default CardLoader;