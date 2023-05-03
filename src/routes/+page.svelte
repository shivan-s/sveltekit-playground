<script lang="ts">
    import type { ActionData, PageServerData } from './$types';

    export let data: PageServerData;

    export let form: ActionData;

    console.log(data);

    $: output = data.data;
</script>

<div class="message">
    <div class="message-header">Input here</div>
    <div class="message-body">
        <form method="POST" action="/?default">
            <div class="field">
                <label for="input">Input</label>
                <div class="control">
                    <input name="input" class="input" placeholder="true" />
                </div>
            </div>
            <div class="control">
                <button class="button">Submit</button>
            </div>
        </form>
    </div>
</div>

{#if form && form.success}
    <div class="message is-success">
        <div class="message-header">Output</div>
        <div class="message-body">
            {output || ''}
        </div>
    </div>
{/if}

{#if form && !form.success}
    <div class="message is-danger">
        <div class="message-header">Output</div>
        <div class="message-body">Some error occured: provide error message</div>
    </div>
{/if}

  <div class="buttons">
<a class="button" href="/list" data-sveltekit-preload-data>List (with preload)</a>
<a class="button" href="/list" >List</a>
    </div>
