/* eslint-disable camelcase */
import jwt, { JwtPayload } from 'jsonwebtoken'

type SignOption = {
  expiresIn: string | number
}

const DEFAULT_SIGN_OPTION = {
  expiresIn: '1h',
}

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION,
) {
  const secret_key = process.env.SECRET_KEY // random number
  const token = jwt.sign(payload, secret_key!)
  return token
}

export function verifyJwt(token: string) {
  try {
    const secret_key = process.env.SECRET_KEY // random number
    const decoded = jwt.verify(token, secret_key!)
    return decoded as JwtPayload
  } catch (error) {
    console.log(error)
    return null
  }
}
