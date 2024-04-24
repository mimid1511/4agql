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

export function getUserByEmailQuery(email: string) {
  return `
    query {
      userByEmail(email: "${email}") {
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
        subjectId
        value
        coefficient
      }
    }
  `
}

