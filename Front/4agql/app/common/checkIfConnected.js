import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function checkIfConnected() {
    const router = useRouter();
    const { data: session } = useSession();
    useEffect(() => {
      if (!session?.user) {
        router.push('/');
      }
    }, [session]);
  }