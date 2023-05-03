import type { Actions, PageServerLoadEvent, RequestEvent } from './$types';

let data: Promise<string>


async function delayedFunction(input: string, seconds = 2) {
  await new Promise(resolve => setTimeout(resolve, 1000 * seconds))
  return "delayed " + input
}

async function defaultFormAction(event: RequestEvent) {
  const formData = Object.fromEntries(await event.request.formData())
  const { input } = formData
  if (input === 'fail') {
    return {
      success: false,
      ...formData
    }
  }
  try {
    data = delayedFunction(input)
  } catch (err) {
    console.log(err)
    return { success: false, ...formData }
  }
  return { success: true, ...formData }
}

export const actions = {
  default: defaultFormAction,
} satisfies Actions;

export async function load(event: PageServerLoadEvent) {
  console.log(event)
  return { data }
}
