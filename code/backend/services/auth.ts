import { sqlTransactionHandler } from "../data/handlers"
import UserData from "../data/users"
import { IAuthServices } from "../domain/interfaces/services"
import bcrypt from 'bcrypt'
import { ExistentEmailError } from "../errors/app"
  
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
  
    register = (name: string, password: string, email: string, birth_date: bigint) => {
      return sqlTransactionHandler(async (client) => {
        const user = await this.userData.getUserByEmail(client, email)
        if (user) throw ExistentEmailError

        const hashedPassword = await bcrypt.hash(password, 10)
        await this.userData.createUser(client,{
          name: name,
          email: email,
          password: hashedPassword,
          birth_date: birth_date
        })
        
        return {
          name: name,
          email: email
        }
      })
    }
  }