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

export function TableNotes() {
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
                    <tr>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>
                            <span class="badge badge-neutral"><sup>12</sup>/<sub>20</sub></span>
                        </td>
                        <td>
                            <span class="badge badge-success">12</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>);
}