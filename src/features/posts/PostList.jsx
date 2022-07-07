import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectPosts, fetchPosts } from "./postsSlice";

import Post from "./Post";

const PostList = () => {
	const dispatch = useDispatch();
	const { posts } = useSelector(selectPosts);

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	return (
		<section>
			<h1>Posts</h1>
			{posts.posts.map((post, i) => (
				<Post key={i} post={post} />
			))}
		</section>
	);
};

export default PostList;
