import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Character } from "./types";

type CharacterStore = {
  selectedCharacters: Character[];
  addCharacter: (character: Character) => void;
  removeCharacter: (id: number) => void;
  showSelectedCharacters: boolean;
  setShowSelectedCharacters: (show: boolean) => void;
};

export const useCharacterStore = create<CharacterStore>()(
  persist(
    (set) => ({
      selectedCharacters: [],
      showSelectedCharacters: false,
      addCharacter: (character: Character) =>
        set((state) => ({ selectedCharacters: [...state.selectedCharacters, character] })),
      removeCharacter: (id: number) =>
        set((state) => {
          const updatedSelectedCharacters = state.selectedCharacters.filter(
            (char) => char.id !== id
          );
          if (updatedSelectedCharacters.length === 0) {
            set({ showSelectedCharacters: false });
          }
          return { selectedCharacters: updatedSelectedCharacters };
        }),
      setShowSelectedCharacters: (show: boolean) => set({ showSelectedCharacters: show }),
    }),
    {
      name: "@selectedCharacters",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
