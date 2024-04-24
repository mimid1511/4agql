import Tab from "@/Components/Tab";

import { noteClient, loginClient } from "@/lib/apolloClient";
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

function queryTeacher(teacherId) {
  return gql`query {
    user(_id: "${teacherId}") {
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


export default async function Home() {

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



  // const { isAuthenticated, user, logout } = useAuth();
  // if (!isAuthenticated()) {
  //   // Rediriger l'utilisateur vers la page de connexion s'il n'est pas authentifié
  //   return <Redirect to="/login" />;
  // }

  return (
    <main>
      <section style={{ padding: 25 }}>
        <Tab data={appendedData} />
      </section>
    </main>
  );
}