'use client'

import HeroLogin from "@/Components/HeroLogin";
import HeroLoged from "@/Components/HeroLoged";
import { useSession } from "next-auth/react";

const LoginPage = () => {
  const { data: session } = useSession();

  return (
    <main>
      {session ? <HeroLoged /> : <HeroLogin />}
    </main>
  );
};

export default LoginPage;