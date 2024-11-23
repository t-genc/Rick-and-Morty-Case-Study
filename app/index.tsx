import { MaterialIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import React, { useState, useRef } from "react";
import { Pressable, ActivityIndicator, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  withTiming,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";

import { HighlightedText } from "~/components/HighlightedText";
import { SearchBar } from "~/components/SearchBar";
import { Text } from "~/components/ThemedText";
import { CancelIcon, TickIcon } from "~/components/icons";
import { getCharacters } from "~/fetchers";
import { useDebounce } from "~/hooks/useDebounce";
import { useNetworkState } from "~/hooks/useNetworkState";
import { useCharacterStore } from "~/store";
import { Character } from "~/types";

type CharacterItemProps = {
  character: Character;
  isSelected: boolean;
  query: string;
  onSelect: (character: Character) => void;
};

type SelectedCharacterProps = {
  character: Character;
  index: number;
  onRemove: (id: number) => void;
};
const NUM_COLUMNS = 2;

const CharacterItem = ({ character, isSelected, query, onSelect }: CharacterItemProps) => {
  const { name, image, episode } = character;

  return (
    <Pressable
      onPress={() => onSelect(character)}
      className="flex-row items-center border-b-gray-400 px-3 py-4">
      <View className="flex-1 flex-row items-center">
        <Image
          source={image}
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            marginRight: 12,
          }}
          contentFit="cover"
        />
        <View className="flex-1">
          <HighlightedText text={name} query={query} highLightColor="#673AB7" />
          <Text>{episode.length} episodes</Text>
        </View>
      </View>

      {isSelected ? (
        <Animated.View entering={ZoomIn.springify(400)} exiting={ZoomOut}>
          <TickIcon />
        </Animated.View>
      ) : null}
    </Pressable>
  );
};

const SelectedCharacter = ({ character, index, onRemove }: SelectedCharacterProps) => (
  <Animated.View
    entering={ZoomIn.springify(400)}
    className={`mb-2 flex-1 flex-row items-center rounded-md bg-cosmic p-2 dark:bg-cosmic-dark 
    ${index % NUM_COLUMNS === 0 ? "mr-2" : ""}
    `}>
    <Text numberOfLines={1} weight="medium" className="flex-1 color-gray-200">
      {character.name}
    </Text>
    <Pressable onPress={() => onRemove(character.id)}>
      <CancelIcon />
    </Pressable>
  </Animated.View>
);
const CollapsibleHeader = ({
  isExpanded,
  onToggle,
  count,
}: {
  isExpanded: boolean;
  onToggle: () => void;
  count: number;
}) => {
  const chevronStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withTiming(isExpanded ? "180deg" : "0deg", {
            duration: 300,
          }),
        },
      ],
    };
  });

  return (
    <Pressable
      onPress={onToggle}
      className="flex-row items-center justify-between rounded-t-md bg-surface-light p-2 dark:bg-surface-dark">
      <Text weight="medium" className="flex-1 text-lg">
        Your Characters {count > 0 ? `(${count})` : ""}
      </Text>
      <Animated.View style={chevronStyle}>
        <MaterialIcons name="keyboard-arrow-down" size={24} color="#4527A0" />
      </Animated.View>
    </Pressable>
  );
};

const MultiSelectAutocomplete: React.FC = () => {
  const networkState = useNetworkState();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const {
    selectedCharacters,
    addCharacter,
    removeCharacter,
    showSelectedCharacters,
    setShowSelectedCharacters,
  } = useCharacterStore();
  const selectedCharsFlashListRef = useRef<FlashList<Character>>(null);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["characters", { name: debouncedQuery }],
    queryFn: async ({ queryKey }: { queryKey: [string, { name: string }] }) => {
      const [, { name }] = queryKey;
      return getCharacters(name);
    },
    enabled: !!debouncedQuery && !!networkState.isConnected,
  });

  const handleSelect = (character: Character) => {
    if (selectedCharacters.some((char) => char.id === character.id)) {
      removeCharacter(character.id);
    } else {
      addCharacter(character);
      selectedCharsFlashListRef.current?.scrollToIndex({
        index: selectedCharacters.length - 1,
        animated: true,
      });
    }
  };

  const renderCharacter = ({ item }: { item: Character }) => (
    <CharacterItem
      character={item}
      isSelected={selectedCharacters.some((char) => char.id === item.id)}
      query={query}
      onSelect={handleSelect}
    />
  );

  const renderSelectedCharacter = ({ item, index }: { item: Character; index: number }) => (
    <SelectedCharacter character={item} index={index} onRemove={removeCharacter} />
  );
  const sellectedCharacterContentStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(showSelectedCharacters ? 150 : 0, {
        duration: 300,
      }),
      opacity: withTiming(showSelectedCharacters ? 1 : 0, {
        duration: 300,
      }),
    };
  });

  return (
    <View className="flex-1 bg-gray-200 p-4 dark:bg-gray-800">
      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Search your favorite character here"
      />

      {selectedCharacters.length > 0 ? (
        <View className="mb-4 overflow-hidden rounded-md">
          <CollapsibleHeader
            isExpanded={showSelectedCharacters}
            onToggle={() => setShowSelectedCharacters(!showSelectedCharacters)}
            count={selectedCharacters.length}
          />
          <Animated.View style={sellectedCharacterContentStyle}>
            <View className="flex-1 bg-surface-light p-2 dark:bg-surface-dark">
              <FlashList
                ref={selectedCharsFlashListRef}
                numColumns={NUM_COLUMNS}
                data={selectedCharacters}
                renderItem={renderSelectedCharacter}
                keyExtractor={(item) => item.name + item.created}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </Animated.View>
        </View>
      ) : null}

      {isLoading ? <ActivityIndicator size={32} color="#673AB7" /> : null}
      {isError ? (
        <Animated.Text
          entering={FadeIn.springify(600)}
          exiting={FadeOut.springify(300)}
          className="self-center text-center color-red-500">
          {error.message}
        </Animated.Text>
      ) : null}

      {data?.results ? (
        <FlashList
          data={data.results}
          renderItem={renderCharacter}
          keyExtractor={(item) => item.created + item.id}
          extraData={selectedCharacters}
          estimatedItemSize={60}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="h-0.3 bg-gray-400" />}
          className="rounded-lg bg-surface-light dark:bg-surface-dark"
        />
      ) : null}
    </View>
  );
};

export default MultiSelectAutocomplete;
