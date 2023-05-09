import type { Actions, PageServerLoadEvent, RequestEvent } from './$types';

let data: string;

async function delayedFunction(input: string, seconds = 2) {
	await new Promise((resolve) => setTimeout(resolve, 1000 * seconds));
	if (input === 'fail') {
		throw new Error('delayedFunction failed.');
	}
	return 'delayed ' + input;
}

async function defaultFormAction(event: RequestEvent) {
	const formData = Object.fromEntries(await event.request.formData()) as { input: string };
	const { input } = formData;
	if (input.length === 0) {
		return {
			success: false,
			error: { input: 'Input is empty' },
			...formData
		};
	}
	try {
		data = await delayedFunction(input);
	} catch (err) {
		console.error(err);
		if (err instanceof Error) {
			return { success: false, error: err.message, ...formData };
		}
	}
	return { success: true, ...formData };
}

export const actions = {
	default: defaultFormAction
} satisfies Actions;

export async function load(event: PageServerLoadEvent) {
	console.dir(event);
	return { data };
}
