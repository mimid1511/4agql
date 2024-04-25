import { groupBy, filter } from 'lodash';


export function TableBulletin({ data }) {

    const userData = filter(data, grade => grade.studentId === grade.currentUser);
    const groupedData = groupBy(data, 'subjectName');


    function userAverageOfSubject(subjectName) {
        const subjectGrades = filter(userData, grade => grade.subjectName === subjectName);
        const subjectAverage = subjectGrades.reduce((sum, grade) => sum + grade.value * grade.coefficient, 0) / 
            subjectGrades.reduce((sum, grade) => sum + grade.coefficient, 0);
        return subjectAverage;
    }


    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>Matière</th>
                        <th>Professeur</th>
                        <th>Moyenne</th>
                        <th>Moyenne générale</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(groupedData).map(([subjectName, grades]) => (
                        <tr key={subjectName}>
                            <td className="text-gray-400">{subjectName}</td>
                            <td className="text-gray-400">{grades[0].teacherName}</td>
                            <td>
                                <span className="badge badge-success">{userAverageOfSubject(subjectName)}</span>
                            </td>  
                            <td>
                                <span className="badge badge-success">{(grades.reduce((acc, grade) => acc + grade.value * grade.coefficient, 0) / grades.reduce((acc, grade) => acc + grade.coefficient, 0)).toFixed(2)}%</span>
                            </td> 
                             
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>);
}



export function TableNotes({ data }) {
    console.log("=========== DATA ==============");
    console.log(data);
    console.log("==============================");

    const userData = filter(data, grade => grade.studentId === grade.currentUser);
    const groupedData = groupBy(userData, 'subjectName');

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