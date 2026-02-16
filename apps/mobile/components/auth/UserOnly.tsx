import { useRouter } from "expo-router";
import { PropsWithChildren, useEffect } from "react";
import { Text } from "react-native";
import { useUser } from "@/hooks/useUser";
import ThemedLoader from "../ThemedLoader";

const UserOnly = ({ children }: PropsWithChildren) => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === null && isLoading === false) router.replace("/login");
  }, [user, isLoading, router]);

  if (user === null || isLoading === true) {
    // in future return splash screen
    return <ThemedLoader />;
  }
  return children;
};

export default UserOnly;
