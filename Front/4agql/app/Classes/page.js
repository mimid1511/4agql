import Grid from "@/Components/Grid";
import { classeClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";

const query = gql`query {
  classes {
      _id
      name
      professorId
      studentIds
  }
}`;

export default async function Classes() {

  const { data } = await classeClient().query({ query });
  console.log(data);

  return (
    <main>
      <section style={{ padding: 25 }}>
        <Grid data={data}/>
      </section>
    </main>
  );
}