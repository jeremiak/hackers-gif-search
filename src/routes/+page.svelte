<script>
	import AnimatedGif from '$lib/AnimatedGif.svelte';
	export let data = {};
</script>

<svelte:head>
	<title>Search clips from Hackers</title>
	<meta
		name="description"
		content="Search through the Mastodon posts of the @hackers_gifs bot to find the right clip"
	/>
</svelte:head>

<section>
	<h1>Want a specific clip from "Hackers"?</h1>
	<p>
		Search through the posts from the excellent <a href="https://botsin.space/@hackers_gifs/"
			>@hackers_gifs@botsin.space</a
		> bot to find the right post for the occasion, all from the 1995 classic movie.
	</p>
	<p>
		This site indexes the bot's posts once a day to avoid hitting the Mastodon API for every query.
		But all of the video files remain on the <a href="https://botsin.space">botsin.space</a> site,
		which seems to employ some rate limiting based on IP addresses. This means that you can only see
		300 results every five minutes. If you see search results but no GIFs, be like
		<a href="https://botsin.space/@hackers_gifs/111142762281543957"
			>Joey and go get another cup of coffee</a
		>.
	</p>

	<form>
		<label for="query">Query</label>
		<input
			type="text"
			name="query"
			id="query"
			placeholder="Text to match goes here..."
			value={data.query}
		/>

		<button>Search the Gibson</button>
	</form>

	{#if data.query}
		<div class="results">
			{#if data.matching.length === 0}
				<p>No matching results</p>
			{:else}
				<p>Found {data.matching.length} results</p>
				<ul>
					{#each data.matching as result}
						<li>
							<AnimatedGif mp4Url={result.mp4_url} postUrl={result.url} text={result.description} />
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/if}
</section>

<style>
	section {
		max-width: 780px;
		margin: 0 auto;
	}

	h1 {
		text-align: center;
	}

	form {
		align-items: center;
		display: flex;
		flex-direction: column;
		gap: calc(3 * var(--spacing-unit));
		margin-top: calc(10 * var(--spacing-unit));
	}

	label {
		display: none;
	}

	input {
		font-size: 1em;
		width: 70%;
	}

	button {
		font-size: 1.1em;
	}

	.results p {
		font-size: 0.9em;
		font-style: italic;
		text-align: center;
	}

	.results ul {
		display: grid;
		padding-left: 0;
		grid-template-columns: 1fr;
		gap: calc(5 * var(--spacing-unit));
	}

	@media (min-width: 750px) {
		.results ul {
			grid-template-columns: 1fr 1fr;
		}
	}

	.results li {
		display: flex;
		justify-content: center;
		list-style-type: none;
	}
</style>
