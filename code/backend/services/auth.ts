import UserData from "../data/users"
import { IAuthServices } from "../domain/interfaces/services"
import bcrypt from 'bcrypt'
  
  export class AuthServices implements IAuthServices {
    userData: UserData

    constructor(userData: UserData) {
      this.userData = userData
    }

    login = async (email: string, password: string) => {
      return {
        name: 'Aureliu',
        email: email
      }
    }
  
    register = async (name: string, password: string, email: string, birth_date: bigint) => {
      const hashedPassword = await bcrypt.hash(password, 10)
      await this.userData.createUser({
        name: name,
        email: email,
        password: hashedPassword,
        birth_date: birth_date
      })
      return {
          name: name,
          email: email
      }
    }
  }