import { Character, Info } from "~/types";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const getCharacters = async (name: string): Promise<Info<Character[]>> => {
  const response = await fetch(`${API_URL}/character?name=${name}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        `No characters found with name "${name}" , check the spelling and try again.`
      );
    }
    throw new Error("Failed to load characters, please try again in a few minutes.");
  }

  return response.json();
};
