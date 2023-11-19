<script>
	import AnimatedGif from '$lib/AnimatedGif.svelte';
	export let data = {};
</script>

<svelte:head>
	<title>Search Hackers gifs</title>
	<meta name="description" content="" />
</svelte:head>

<section>
	<h1>Search Hackers GIFs</h1>
	<p>
		There's <a href="https://botsin.space/@hackers_gifs/"
			>an excellent account (@hackers_gifs@botsin.space)</a
		> that posts a GIF from the 1995 classic Hackers. This site tries to make it easy to search the text
		of each GIF to find the one you want.
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

		<button>Search animated GIFs</button>
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
		grid-template-columns: 1fr 1fr;
		gap: calc(5 * var(--spacing-unit));
	}

	.results li {
		list-style-type: none;
	}
</style>
