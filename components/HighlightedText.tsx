import { TextProps } from "react-native";

import { Text } from "~/components/ThemedText";
import { getHighlightedTextParts } from "~/utils/getHighlightedTextParts";

type HighlightTextProps = TextProps & {
  text: string;
  query: string;
  highLightColor?: string;
  className?: string;
};

export const HighlightedText = ({
  text,
  query,
  highLightColor = "#FF0000",
  className,
  ...props
}: HighlightTextProps) => {
  const parts = getHighlightedTextParts(text, query);

  return (
    <Text className={className} {...props}>
      {parts.map((part, index) =>
        part.isHighlighted ? (
          <Text key={index} style={{ color: highLightColor }}>
            {part.text}
          </Text>
        ) : (
          <Text key={index}>{part.text}</Text>
        )
      )}
    </Text>
  );
};
