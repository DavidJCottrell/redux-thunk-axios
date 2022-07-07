const Post = ({ post }) => {
	const style = {
		border: "1px solid black",
		padding: "10px",
		margin: "10px",
	};

	return (
		<article style={style}>
			<h3>{post.title}</h3>
			<p>{post.body}</p>
		</article>
	);
};

export default Post;
