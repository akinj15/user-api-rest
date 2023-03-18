import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({error: 'Login is required'});
  }
  const [, token] = authorization.split(' ');
  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = data.id;
    req.userLogin = data.userLogin;
    return next();
  }catch (e) {
    return res.status(401).json({error: 'authorization fail', e})
  }
}
