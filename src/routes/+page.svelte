<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageServerData } from './$types';

	export let data: PageServerData;

	export let form: ActionData;

	let loading = false;

	console.log(data);

	$: output = data.data;

	const LOCALES = ['en-GB', 'en-US'] as const;
	let locale: (typeof LOCALES)[number];
</script>

<section class="section">
	<h2 class="title">Optimistic Updates</h2>
	<ol class="block">
		<li>Update should occur immediately on client side, while background tasks run.</li>
		<li>Empty input should return an error immediately (simulating form validation error).</li>
		<li>Input of "fail" should optmistically update and then return an error.</li>
	</ol>
	<div class="message">
		<div class="message-header">Input here</div>
		<div class="message-body">
			<form
				method="POST"
				use:enhance={() => {
					loading = true;
					return async ({ update }) => {
						await update();
						loading = false;
					};
				}}
			>
				<div class="field">
					<label for="input">Input</label>
					<div class="control">
						<!-- <input -->
						<!-- 	value={form?.input ?? ''} -->
						<!-- 	name="input" -->
						<!-- 	class="input {form?.error?.input && 'is-danger'}" -->
						<!-- 	placeholder="..." -->
						<!-- /> -->
						<input value={form?.input ?? ''} name="input" class="input" placeholder="..." />
					</div>
					<!-- {#if form?.error?.input} -->
					<!-- 	<div class="text-small has-text-danger">Error: {form?.error?.input}</div> -->
					<!-- {/if} -->
				</div>
				<div class="control">
					<button disabled={loading} class="button {loading && 'is-loading'}">Submit</button>
				</div>
			</form>
		</div>
	</div>

	{#if form && form.success}
		<article class="message is-success">
			<div class="message-header">Output</div>
			<div class="message-body">
				{output || ''}
			</div>
		</article>
	{/if}

	{#if form && !form.success}
		<article class="message is-danger">
			<div class="message-header">Output</div>
			<div class="message-body">
				<p>Some error occurred:</p>
				<pre>{form.error}</pre>
			</div>
		</article>
	{/if}
</section>

<hr />

<section class="section">
	<h2 class="title">Testing preloading</h2>
	<ol class="block">
		<li>Hovering over a button will cause data to preload.</li>
		<li>
			<strong
				>This will work for both buttons which shouldn't be the case, maybe data preload is default?</strong
			>
		</li>
	</ol>
	<article class="message">
		<div class="message-header">Preloading</div>
		<div class="message-body">
			<div class="buttons">
				<a class="button" href="/list" data-sveltekit-preload-data>List (with preload)</a>
				<a class="button" href="/list">List</a>
			</div>
		</div>
	</article>
</section>

<hr />

<section class="section">
	<h2 class="title">Native time display</h2>
	<ol class="block">
		<li>Looking into native browser time display</li>
	</ol>
	<article class="message">
		<div class="message-header">Time</div>
		<div class="message-body">
			<table class="table is-fullwidth">
				<tbody class="has-text-centered">
					<tr>
						<td>
							<pre>{`new Date().toLocalString(${(locale && `'${locale}'`) || ''})`}</pre>
						</td>
					</tr><tr>
						<td>
							{new Date().toLocaleString(locale)}
						</td>
					</tr>
				</tbody>
			</table>
			<div class="select">
				<select bind:value={locale}>
					<option value={undefined}>None</option>
					{#each LOCALES as l}
						<option value={l}>{l}</option>
					{/each}
				</select>
			</div>
		</div>
	</article>
</section>
