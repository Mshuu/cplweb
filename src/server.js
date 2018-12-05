import express from "express";
import path from "path";
import expressWS from 'express-ws';
import cluster from 'cluster';
import os from 'os';

import {Home, Login, Poll, Search, CompletedPolls, StarPolls, MyVotes, MyPolls, SocialFeed, ManageFriends, Account, CreateWidget, Rewards, Signup, Signup2, Signup3, FinishSignup} from './controllers/reactRenderController';
import {WidgetPoll} from './controllers/widgetRenderController';
import AuthController from './controllers/authController';
import WsController from './controllers/wsController';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

cluster.isMaster ? masterProcess() : childProcess();

function masterProcess() {
  console.log(`Master ${process.pid} is running`);
  const numCPUs = os.cpus().length;

  for (let i = 0; i < numCPUs; i++) {
    console.log(`Forking process number ${i}...`);
    cluster.fork();
  }
}

function childProcess() {
  console.log(`Worker ${process.pid} started...`);

  const app = express();

  expressWS(app);

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use('/public', express.static('public'));

  app.post( "/api/auth", AuthController.login);
  app.get( "/logout", AuthController.logout);
  app.get( "/", Home);
  app.get( "/login", Login);
  app.get( "/poll/:pollId", Poll);
  app.get( "/poll/:pollId/widget", WidgetPoll);
  app.get( "/search", Search);
  app.get( "/completed/:category*?", CompletedPolls);
  app.get( "/browse/:category*?", CompletedPolls);
  app.get( "/FeaturedPolls", StarPolls);
  app.get( "/myVotes", MyVotes);
  app.get( "/myPolls", MyPolls);
  app.get( "/social", SocialFeed);
  app.get( "/social/manageFriends", ManageFriends);
  app.get( "/account", Account);
  app.get( "/createWidget", CreateWidget);
  app.get( "/rewards", Rewards);
	app.get("/signup", Signup);
	app.get("/signup2", Signup2);
	app.get("/signup3", Signup3);
	app.get("/finishSignup", FinishSignup);

  app.get( "/rewards", Rewards);

  app.ws('/api/ws', WsController);

var port = process.env.PORT || 3001;
  app.listen( port );
}
