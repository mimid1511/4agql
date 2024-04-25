"use client"

import Grid from "@/Components/Grid";
import { classeClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"


export default function Classes() {

  const { data: session, status } = useSession();
  const [classeData, setClasseData] = useState(null);

  useEffect(() => {
    if (status === "authenticated" && session) {
      // Fetch user data when session is available
      fetchClasse();
    }
  }, [session, status]);

  const fetchClasse = async () => {
    try {
      const { data } = await classeClient().query({
        query: gql`query {
          classByUserEmail(email: "student@example.com") {
            _id
            name
            professorId
            studentIds
            school
          }
        }`,
      });
      setClasseData(data.classByUserEmail);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <main>
      <section style={{ padding: 25 }}>
        <h1 className="mb-4  font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">Classe : {classeData?.name} </h1>
        <h2 className="mb-4  font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-2xl dark:text-white">{classeData?.school}</h2>
        <br/>
        <Grid data={classeData}/>
        <br/>
      </section>
    </main>
  );
}