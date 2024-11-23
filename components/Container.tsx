import { SafeAreaView } from "react-native-safe-area-context";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaView className={styles.container}>{children}</SafeAreaView>;
};

const styles = {
  container: "flex flex-1  bg-white dark:bg-gray-800",
};
