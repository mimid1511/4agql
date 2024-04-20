export function getUserQuery(id: string) {
  return `
    query {
      user(_id: "${id}") {
        _id
        email
        pseudo
        password
        role
      }
    }
  `
}

export function getAllGradesQuery() {
  return `
    query {
      grades {
        _id
        studentId
        teacherId
        subject
        value
        coefficient
      }
    }
  `
}