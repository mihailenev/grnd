import { useUser } from "@/hooks/useUser";
import { useRouter } from "expo-router";
import { Text } from "react-native";
import { PropsWithChildren, useEffect } from "react";
import ThemedLoader from "../ThemedLoader";

const GuestOnly = ({ children }: PropsWithChildren) => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user !== null && isLoading === false) router.replace("/");
  }, [user, isLoading, router]);

  if (isLoading || user) {
    // in future return splash screen
    return <ThemedLoader />;
  }
  return children;
};

export default GuestOnly;
