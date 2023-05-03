import type { PageLoadEvent } from "./$types";

export async function load({ fetch }: PageLoadEvent) {
  const URL = "https://pokeapi.co/api/v2/pokemon/";
  const response = await fetch(URL);
  const data = await response.json();
  return { data };
}
