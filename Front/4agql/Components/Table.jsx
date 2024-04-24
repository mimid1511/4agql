export function TableBulletin() {
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>Matiere</th>
                        <th>Professeur</th>
                        <th>Moyenne</th>
                        <th>Moyenne générale</th>
                        <th>Apréciation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Blue</td>
                    </tr>
                </tbody>
            </table>
        </div>);
}

import { groupBy } from 'lodash';

export function TableNotes({ data }) {
    console.log("=========== DATA ==============");
    console.log(data);
    console.log("==============================");

    const groupedData = groupBy(data, 'subjectName');

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>Matiere</th>
                        <th>Professeur</th>
                        <th>Notes</th>
                        <th>Moyenne</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(groupedData).map(([subjectName, grades]) => (
                        <tr key={subjectName}>
                            <td className="text-gray-400">{subjectName}</td>
                            <td className="text-gray-400">{grades[0].teacherName}</td>
                            <td>
                                {grades.map((grade) => (
                                    <span key={grade._id} className="badge badge-neutral">{grade.value}%<sup>({grade.coefficient})</sup></span>
                                ))}
                            </td>
                            <td>
                                <span className="badge badge-success">{(grades.reduce((acc, grade) => acc + grade.value * grade.coefficient, 0) / grades.reduce((acc, grade) => acc + grade.coefficient, 0)).toFixed(2)}%</span>
                            </td>         
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}