import { noteClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import { useState, useEffect } from "react";

export default function ModalAddNote({ studentId, studentPseudo, teacherId }) {
  const [noteValue, setNoteValue] = useState('');
  const [coefficient, setCoefficient] = useState('');
  const [subjectId, setSubjectId] = useState('');

  useEffect(() => {
    fetchSubjectId();
  }, []);

  const fetchSubjectId = async () => {
    try {
      const { data } = await noteClient().query({
        query: gql`
          query {
            user(_id: "${teacherId}") {
              teachingSubjectId
            }
          }
        `,
      });
      setSubjectId(data.user.teachingSubjectId);
    } catch (error) {
      console.error("Error fetching subject ID:", error);
    }
  };

  const handleAddNote = async () => {
    try {
      const { data } = await noteClient().mutate({
        mutation: gql`
          mutation {
            createGrade(createGradeInput: {
              studentId: "${studentId}",
              teacherId: "${teacherId}",
              subjectId: "${subjectId}",
              value: ${noteValue},
              coefficient: ${coefficient}
            }) {
              studentId
              teacherId
              subjectId
              value
              coefficient
            }
          }
        `,
      });
      
      console.log("Note ajoutée :", data.createGrade);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la note :", error);
    }
  };

  return (
    <>
      <button className="btn" onClick={() => document.getElementById('modal-note').showModal()}>Ajouter une note</button>
      <dialog id="modal-note" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Ajouter une note à {studentPseudo}</h3>
          <br />
          <input
            type="number"
            min="0"
            max="100"
            placeholder="Note"
            className="input input-bordered w-full max-w-xs"
            value={noteValue}
            onChange={(e) => setNoteValue(e.target.value)}
          />
          <br />
          <input
            type="number"
            min="0"
            max="3"
            placeholder="Coefficient"
            className="input input-bordered w-full max-w-xs"
            value={coefficient}
            onChange={(e) => setCoefficient(e.target.value)}
          />
          <br />
          <button className="btn" onClick={handleAddNote}>Ajouter</button>
        </div>
      </dialog>
    </>
  );
}
