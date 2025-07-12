import jwt from 'jsonwebtoken';

const sign = (payload: any, secret: string, expiry: any) => {
  const token = jwt.sign(payload, secret, { expiresIn: expiry });
  console.log(secret, expiry, token)
  return token
};

const decode = (token: string) => {
  return jwt.decode(token);
};

const verify = <T>(token: string, secret: string): T | null => {
  try {
    console.log(token, secret)
    return jwt.verify(token, secret) as T;
  } catch (err) {
    console.log(err)
    return null;
  }
};

export const JWTService = {
  sign,
  decode,
  verify,
};
