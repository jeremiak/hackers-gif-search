import posts from '$lib/data.json';

const randomIndex = Math.floor(Math.random() * posts.length);
const randomPost = posts[randomIndex];

export function load({ url }) {
	const query = url.searchParams.get('query');

	const matching = posts.filter((p) => {
		if (!query) return false;
		const d = p.description.toLowerCase();
		return d.includes(query.toLowerCase());
	});

	return {
		randomPost,
		query,
		matching
	};
}
