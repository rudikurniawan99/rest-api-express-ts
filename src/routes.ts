import { Express, Request, Response } from "express";
import validate from "../middleware/validateResource";


const routes = (app: Express) => {
  app.get('/test', (req: Request, res: Response) => res.status(200).send('ok'))

  // app.get('/api/users', validate())
}

export default routes