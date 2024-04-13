import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useAuthGuard(
  isAuthenticated: boolean,
  redirectRoute: string,
) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !!user === isAuthenticated) {
      router.push(redirectRoute);
    }
  }, [isLoaded]);

  return { user };
}
