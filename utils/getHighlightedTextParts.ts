type HighlightPart = {
  text: string;
  isHighlighted: boolean;
};

export const getHighlightedTextParts = (text: string, query: string): HighlightPart[] => {
  if (!query) {
    return [{ text, isHighlighted: false }];
  }

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return parts.map((part) => ({
    text: part,
    isHighlighted: part.toLowerCase() === query.toLowerCase(),
  }));
};
