"use client"

import Tab from "@/Components/Tab";

import { noteClient, loginClient, classeClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import { useAuth } from "@/Components/Provider";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"


function queryGrades() {
  return gql`query {
    grades {
      _id
      studentId
      teacherId
      subjectId
      value
      coefficient
    }
  }`;
};

function queryTeacher(teacherId) {
  return gql`query {
    user(_id: "${teacherId}") {
      _id
      pseudo
    }
  }`;
}

function queryCurrentUser(email) {
  return gql`query {
    userByEmail(email: "${email}") {
      _id
      pseudo
    }
  }`;

}


function querySubject(subjectId) {
  return gql`query {
    subject(_id: "${subjectId}") {
      _id
      name
    }
  }`;
}


export default function Home() {


  const fetchGrades = async () => {
    try {

      console.log("----- USER -----");
      console.log(session.user.email);


      const { data } = await noteClient().query({
        query: queryGrades(),
      });
      const grades = data.grades;
      // Map over grades and append each object with teacherName and subjectName
      const gradesWithTeacherAndSubjectName = await Promise.all(
        grades.map(async (grade) => {
          const teacherData = await loginClient().query({
            query: queryTeacher(grade.teacherId),
          });
          const subjectData = await noteClient().query({
            query: querySubject(grade.subjectId),
          });
          const currentUser = await loginClient().query({
            query: queryCurrentUser(session.user.email),
          });
          console.log("----- CURRENT USER -----");
          console.log(currentUser);
          return {
            ...grade,
            teacherName: teacherData.data.user.pseudo,
            subjectName: subjectData.data.subject.name,
            currentUser: currentUser.data.userByEmail._id
          };
        })
      );
      setGradesData(gradesWithTeacherAndSubjectName);
    } catch (error) {
      console.error("Error fetching :", error);
    }
  };


  const { data: session, status } = useSession();
  const [gradesData, setGradesData] = useState(null);

  useEffect(() => {
    if (status === "authenticated" && session) {
      // Fetch user data when session is available
      fetchGrades();
    }
  }, [session, status]);

  /*
  const { data } = await noteClient().query({ query, fetchPolicy: 'network-only' });

  const appendedData = await Promise.all(data.grades.map(async (grade) => {
    const teacherQuery = queryTeacher(grade.teacherId);
    const { data: teacherData } = await loginClient().query({ query: teacherQuery, fetchPolicy: 'network-only' });
    if (!teacherData || !teacherData.user) {
      console.error(`No data returned for teacher with ID ${grade.teacherId}`);
      return grade; // return the original grade object if no teacher data is found
    }

    const subjectQuery = querySubject(grade.subjectId);
    const { data: subjectData } = await noteClient().query({ query: subjectQuery, fetchPolicy: 'network-only' });
    if (!subjectData || !subjectData.subject) {
      console.error(`No data returned for subject with ID ${grade.subjectId}`);
      return grade; // return the original grade object if no subject data is found
    }

    return {
      ...grade,
      teacherName: teacherData.user.pseudo,
      subjectName: subjectData.subject.name,
    };
  }));
  

  console.log("================ ORIGINAL DATA ====================")
  console.log({data});
  console.log("====================================")
  console.log("================ APPENDED DATA ====================")
  console.log(appendedData);
  console.log("====================================")

  */

  return (
    <main>
      <section style={{ padding: 25 }}>
        {gradesData ? <Tab data={gradesData} /> : <p>Loading...</p>}
      </section>
    </main>
  );
}