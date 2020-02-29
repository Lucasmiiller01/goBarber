import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res.status(401).json({ error: 'Token not provided' });

  const [, token] = authorization.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    const user = await User.findByPk(decoded.id);
    if (user) return next();
    return res.status(401).json({ error: 'Token invalid' });
  } catch (e) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
