<script>
	export let mp4Url = null;
	export let postUrl = null;
	export let text = null;
</script>

<div>
	<a href={postUrl}>
		<video src={mp4Url} muted autoplay loop />
		<p>{text}</p>
	</a>
</div>

<style>
</style>
