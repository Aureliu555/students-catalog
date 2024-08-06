import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'

export function authorization(req: Request | any, res: Response, next: NextFunction) {
    const token = getToken(req)
    if (!token) return res.status(401).json({ error: 'Bearer authorization token is required' })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) return res.status(403).json({ error: 'Invalid token' }) 
            
        req.user = user
        next()
    })
}

function getToken(req: Request): string | null {
    const authHeader = req.headers.authorization
    if (!authHeader) return null

    const tokenInfo = authHeader.split(' ')
    const tokenType = tokenInfo[0]
    if (tokenType != 'Bearer') return null

    return tokenInfo[1]
  }