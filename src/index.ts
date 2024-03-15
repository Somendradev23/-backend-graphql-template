import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import { expressMiddleware } from "@apollo/server/express4";
import http from "http";
import path from "path";
import { resolvers } from "./graphql";
import { typeDefs } from "./graphql/schema/typedefs";
import yenv from "yenv";
import fileUpload from "express-fileupload";
require("./config/connection");
import route from "./RestApi/restRoute";

import { authMiddleware } from "./graphql/schema";
const startServer = async () => {
  yenv("env.yaml", { env: "development" });
  const app = express();

  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  const publicPath = path.join(__dirname, "public");
  app.use(express.static(publicPath));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
  app.get("/", (_req: Request, res: Response) => {
   res.send("Express Typescript on Vercel");
  });
  app.use(
    fileUpload({
      useTempFiles: true,
    })
  );
  app.use(route);
  app.use((req, res, next) => {
    next();
  });
  const httpServer = http.createServer(app);

  const server: any = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    bodyParser.json({ limit: "50mb" }),

    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const { loginId, userId } = await authMiddleware(req);
        
        return {
          loginId,
          userId,
        };
      },
    })
    // expressMiddleware(server, {})
  );

  // await new Promise<void>((resolve) =>
  //   httpServer.listen(
  //     {
  //       port: 5001,
  //     },
  //     resolve
  //   )
  // );

  app.listen(5000, () => {
    // tslint:disable-next-line
    console.log("🚀 Server ready at http://localhost:5000/graphql");
  });
};
startServer();
