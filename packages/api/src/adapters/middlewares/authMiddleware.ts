import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { MSG } from '@shared/msg'

import { IUserDecoded } from '@interfaces/user'

// -------------------------------------------------------------------

const SECRET_KEY = process.env.SECRET_KEY || 'supersecret'

export function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: MSG.TOKEN_NOT_FOUND })
  }

  const parts = authHeader.split(' ')
  if (!(parts.length === 2)) {
    return res.status(401).json({ error: MSG.TOKEN_INVALID })
  }

  const [scheme, token] = parts
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: MSG.TOKEN_MALFORMED })
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: MSG.TOKEN_INVALID })

    const payload = decoded as IUserDecoded
    req.body.userDecoded = {
      uid: payload?.uid,
      name: payload?.name,
      email: payload?.email
    }

    return next()
  })
}
