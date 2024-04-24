import { noteClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import { useAuth } from "@/Components/Provider";


const query = gql`query {
  grades {
    _id
    studentId
    teacherId
    subjectId
    value
    coefficient
  }
}`;

export default async function Profil() {


  const { data } = await noteClient().query({ query });
  console.log(data);


  // const { isAuthenticated, user, logout } = useAuth();
  // if (!isAuthenticated()) {
  //   // Rediriger l'utilisateur vers la page de connexion s'il n'est pas authentifié
  //   return <Redirect to="/login" />;
  // }

  return (
    <main>
      <section style={{ padding: 25 }}>
        <div style={{ width: '500px' }}>
          <label className="input input-bordered flex items-center gap-2">
            Pseudo
            <input type="text" className="grow"/>
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Email
            <input type="email" className="grow"/>
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
        <br/>
        <button className="btn">Mettre à jours le profil</button>
      </section>
    </main>
  );
}