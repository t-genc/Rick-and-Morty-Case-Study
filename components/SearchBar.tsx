import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import { TextInput, View, TouchableOpacity, StyleProp, ViewStyle, TextStyle } from "react-native";

export const SearchBar = ({
  value,
  onChangeText,
  placeholder = "Search...",
  inputStyle,
  containerStyle,
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}) => {
  const isDark = useColorScheme().colorScheme === "dark";
  return (
    <View
      className="mb-2 flex-row items-center rounded-lg border border-gray-300 bg-white px-4 
      py-2 shadow-sm dark:border-gray-500
       dark:bg-surface-dark"
      style={containerStyle}
       >
      <MaterialIcons
        name="search"
        size={20}
        color={isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)"}
        className="mr-2"
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"}
        autoFocus
        returnKeyType="search"
        autoCorrect={false}
        accessible
        accessibilityLabel="Search for a character"
        className="color-gray-800 dark:color-gray-200"
        style={[{ flex: 1 }, inputStyle]}
   
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText("")}>
          <MaterialIcons
            name="clear"
            size={20}
            color={isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)"}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
