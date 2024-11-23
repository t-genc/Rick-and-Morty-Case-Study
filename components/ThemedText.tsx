import { type TextProps } from "react-native";
import { Text as RNText } from "react-native";

type StyledTextProps = TextProps & {
  variant?: "default" | "title" | "subtitle" | "caption" | "error";
  font?: "Nunito";
  weight?: "regular" | "bold" | "medium" | "thin" | "light" | "extraBold" | "extraLight";
};

export const Text = ({
  variant = "default",
  font = "Nunito",
  weight = "regular",
  className = "",
  children,
  ...props
}: StyledTextProps) => {

  const fontMap = {
    Nunito: {
      regular: "NunitoRegular",
      bold: "NunitoBold",
      medium: "NunitoMedium",
      thin: "NunitoThin",
      light: "NunitoLight",
      extraBold: "NunitoExtraBold",
      extraLight: "NunitoExtraLight",
    },
  };


  const variantStyles = {
    default: "text-text-light dark:text-text-dark",
    title: "text-2xl text-portal-light dark:text-portal-dark",
    subtitle: "text-lg color-text-light dark:color-text-dark",
    caption: "text-sm text-interdimensional-light dark:text-interdimensional-dark",
    error: "text-red-500 dark:text-red-400",
  };


  const fontFamily = fontMap[font]?.[weight] || fontMap.Nunito.regular;
  const combinedClassName = `${variantStyles[variant]} ${className}`;

  return (
    <RNText className={combinedClassName} style={{ fontFamily }} {...props}>
      {children}
    </RNText>
  );
};
