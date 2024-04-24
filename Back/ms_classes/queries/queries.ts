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