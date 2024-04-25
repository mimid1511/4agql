import { loginClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import ModalAddNote from "./ModalAddNote";

export default function Grid({ data, userId, userRole }) {
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentPromises = data.studentIds.map(async studentId => {
          const { data } = await loginClient().query({
            query: gql`
              query {
                user(_id: "${studentId}") {
                  _id
                  pseudo
                }
              }
            `,
          });
          return data.user;
        });

        const students = await Promise.all(studentPromises);
        setStudentData(students);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    if (data && data.studentIds) {
      fetchStudentData();
    }
  }, [data]);

  return (
    <>
      {studentData.length > 0 && (
        <div className="grid grid-cols-7 gap-5">
          {studentData.map(student => (
            <div key={student._id}>
              <div className="card card-compact w-50 bg-base-100 shadow-xl">
                <figure><img src="https://loeildelaphotographie.com/wp-content/uploads/2013/02/original_1-facebook-profile-picture-jpg.jpg" alt="Shoes" /></figure>
                <div className="card-body">
                  <h2 className="card-title">{student.pseudo}</h2>
                  {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
                  <div className="card-actions justify-start">
                    {userRole === 'teacher' && (
                      <ModalAddNote studentPseudo={student.pseudo} studentId={student._id} teacherId={userId} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
