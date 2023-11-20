import fs from 'fs/promises';
import _ from 'lodash';

import data from './src/lib/data.json' assert { type: 'json' };

async function fetchAllPosts(url = '', data = []) {
	console.log(`Fetching ${url}`);
	const response = await fetch(url);
	const { status } = response;
	const json = await response.json();
	const link = response.headers.get('link');

	if (status === 429) {
		console.log(`Made too many requests, just bailing with the posts already scraped`);
		return data;
	}

	data.push(...json);
	if (!link) return data;

	const links = link.split(', ').map((d) => {
		const url = d.match(/<(.*)>/);
		const rel = d.match(/rel="(.*)"/);

		return {
			url: url[1],
			rel: rel[1]
		};
	});

	const next = links.find((d) => d.rel === 'next');
	if (!next) return data

	return fetchAllPosts(next.url, data);
}

function transformPost(post) {
	const { id, created_at, url, media_attachments } = post;
	const { url: mp4_url, description } = media_attachments[0];

	return {
		id,
		created_at,
		url,
		mp4_url,
		description
	};
}

const mostRecentId = data.length > 0 ? data[0].id : null;
const startingUrl = `https://botsin.space/api/v1/accounts/29667/statuses?since_id=${mostRecentId}`;
const posts = await fetchAllPosts(startingUrl);
const transformed = posts.map(transformPost);
const combined = [...data, ...transformed];
const sorted = _.orderBy(combined, ['created_at'], ['desc']);
const unique = _.uniqBy(sorted, (d) => d.description);

await fs.writeFile('./src/lib/data.json', JSON.stringify(unique, null, 2));
console.log(`Saved ${sorted.length.toLocaleString('en-US')} posts to src/lib/data.json`);
