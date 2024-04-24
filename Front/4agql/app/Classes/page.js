import Grid from "@/Components/Grid";
import { classeClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";


export default async function Classes() {

  const { data } = await classeClient().query({query : gql`query {
    userByEmail(email: "sss") {
      _id
      email
      pseudo
      password
      role
    }
  }
  `});
  console.log(data);

  return (
    <main>
      <section style={{ padding: 25 }}>
        <h1 class="mb-4  font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">Classe :</h1>
        <Grid data={data} />
      </section>
    </main>
  );
}