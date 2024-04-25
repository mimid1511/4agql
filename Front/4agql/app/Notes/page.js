"use client"

import Tab from "@/Components/Tab";

import { noteClient, loginClient, classeClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import { useAuth } from "@/Components/Provider";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react"
import { checkIfConnected } from "../common/checkIfConnected";


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

  checkIfConnected();
  
  const { data: session, status } = useSession();
  const [gradesData, setGradesData] = useState(null);

  useEffect(() => {
    if (status === "authenticated" && session) {
      // Fetch user data when session is available
      fetchGrades();
    }
  }, [session, status]);


  const fetchGrades = async () => {
    try {
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


  

  return (
    <main>
      <section style={{ padding: 25 }}>
        {gradesData ? <Tab data={gradesData} /> : <p>Loading...</p>}
      </section>
    </main>
  );
}