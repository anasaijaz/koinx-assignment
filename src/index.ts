import { config } from "dotenv";
import express, {
  Application,
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { Server } from "http";
import createError from "http-errors";
import routes from "./api/routes/webRoutes";
import "./config/mongoose";

config({ path: `.env.${process.env.NODE_ENV}` });

const app: Application = express();

app.use(express.json());

app.use(routes);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.end("Hello from other side!");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createError.NotFound());
});

const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
};

app.use(errorHandler);

const PORT: Number = Number(process.env.PORT) || 5000;

const server: Server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});
