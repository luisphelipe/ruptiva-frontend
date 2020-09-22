import { post } from './index.api'

export const login = async (email: string, password: string) => {
  return await post('/auth/login', { email, password })
}

export const signup = async (email: string, password: string) => {
  return await post('/auth/signup', { email, password })
}

export default { login, signup }
