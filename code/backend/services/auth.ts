import dotenv from "dotenv"
import { sqlTransactionHandler } from "../data/handlers"
import UserData from "../data/users"
import { IAuthServices } from "../domain/interfaces/services"
import bcrypt from 'bcrypt'
import { ExistentEmailError, InvalidCredentialsError, InvalidParamsError } from "../errors/app"
import { NewUser, SimpleUser } from "../domain/types"
import jwt from 'jsonwebtoken'
dotenv.config()
  
  export class AuthServices implements IAuthServices {
    userData: UserData

    constructor(userData: UserData) {
      this.userData = userData
    }

    login = async (email: string, password: string) => {
      return sqlTransactionHandler(async (client) => {
        if (!email || !password) throw InvalidParamsError

        const user = await this.userData.getUserByEmail(client, email)
        if (!user) throw InvalidCredentialsError

        const match = await bcrypt.compare(password, user.password)
        if (!match) throw InvalidCredentialsError
        
        return this.newUser({ name: user.name, email, birth_date: user.birth_date })
      })
    }
  
    register = (name: string, password: string, email: string, birth_date: bigint) => {
      return sqlTransactionHandler(async (client) => {
        if (!name || !password || !email || !birth_date) throw InvalidParamsError

        const existentUser = await this.userData.getUserByEmail(client, email)
        if (existentUser) throw ExistentEmailError

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = { name, email, password: hashedPassword, birth_date }
        await this.userData.createUser(client, user)

        return this.newUser({ name, email, birth_date })
      })
    }

    newUser(u: SimpleUser): NewUser {
        const access_token = this.generateAccessToken(u)
        return { name: u.name, email: u.email, birth_date: u.birth_date, access_token }
    }

    generateAccessToken = (user: SimpleUser) => {
      return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string)
    }
  }