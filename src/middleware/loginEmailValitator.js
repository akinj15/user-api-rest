import emailValitator from 'email-validator'

export default (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(401).json({error: 'Email is required'});
  }
  try {
    if(emailValitator.validate(email)){
      return next();
    }
    return res.status(401).json({error: 'Email is not valid'});

  }catch (e) {
    return res.status(401).json({error: 'authorization fail', e})
  }
}

