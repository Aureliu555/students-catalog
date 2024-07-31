import { IAuthServices } from "../domain/interfaces/services"
  
  export class AuthServices implements IAuthServices {
  
    login = async (email: string, password: string) => {
      return {
        name: 'Aureliu',
        email: email
      }
    }
  
    register = async (name: string, password: string, email: string, birth_date: bigint) => {
        return {
            name: name,
            email: email
        }
    }
  }