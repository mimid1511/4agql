import Tab from "@/Components/Tab";

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

export default async function Home() {


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
        <Tab data={data} />
      </section>
    </main>
  );
}