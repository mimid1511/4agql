

import { loginClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import { useAuth } from "@/Components/Provider";
import { useSession } from "next-auth/react";


export default async function Profil() {

  const { data: session, status } = useSession();

  const { fetch } = await loginClient().query({query : gql`query {
    userByEmail(email: "${session.user.email}") {
      _id
      email
      pseudo
      password
      role
    }
  }
  `});





  // const { isAuthenticated, user, logout } = useAuth();
  // if (!isAuthenticated()) {
  //   // Rediriger l'utilisateur vers la page de connexion s'il n'est pas authentifié
  //   return <Redirect to="/login" />;
  // }

  return (
    <main>
      <section style={{ padding: 25 }}>
        <h1 class="mb-4  font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">Modifier le profil</h1>
        <div style={{ width: '500px' }}>
          <label className="input input-bordered flex items-center gap-2">
            Pseudo
            <input type="text" className="grow" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Email
            <input type="email" className="grow" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Mot de passe
            <input type="password" className="grow" />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Role
            <input disabled type="text" className="grow" />
          </label>
        </div>
        <br />
        <button className="btn">Mettre à jours le profil</button>
      </section>
    </main>
  );
}