import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ text: 'Hello' });
});
export default routes;
