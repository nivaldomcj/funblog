import jwt from '@elysiajs/jwt';

export default jwt({
  secret: process.env.JWT_SECRET || 'development',
  exp: '7d'
});
