export type User = {
  username: string,
  email: string,
  _id: string,
  isTutor: boolean,
  subjects?: Array<string>,
  wage?: number,
  card?: string,
  account?: string,
  zipCode?: number,
}
