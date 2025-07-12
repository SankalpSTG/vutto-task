import jwt from 'jsonwebtoken';

const sign = (payload: any, secret: string, expiry: any) => {
  const token = jwt.sign(payload, secret, { expiresIn: expiry });
  console.log("PETS")
  console.log(payload, expiry, token, secret)
  return token
};

const decode = (token: string) => {
  return jwt.decode(token);
};

const verify = <T>(token: string, secret: string): T | null => {
  console.log("TS")
  console.log(token, secret)
  try {
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
