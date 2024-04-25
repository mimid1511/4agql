"use client"

import Grid from "@/Components/Grid";
import { classeClient, loginClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { checkIfConnected } from "../common/checkIfConnected";

export default function Classes() {
  checkIfConnected();

  const { data: session, status } = useSession();
  const [classeData, setClasseData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (status === "authenticated" && session) {
      // Fetch user data when session is available
      fetchClasse();
      fetchUser();
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


  const fetchUser = async () => {
    try {
      const { data } = await loginClient().query({
        query: gql`
          query {
            userByEmail(email: "${session.user.email}") {
              _id
              email
              pseudo
              password
              role
            }
          }
        `,
      });
      setUserData(data.userByEmail);
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
        <Grid data={classeData} userId={userData?._id} userRole={userData?.role} />
        <br/>
      </section>
    </main>
  );
}