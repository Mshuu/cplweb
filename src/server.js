import express from "express";
import path from "path";
import expressWS from 'express-ws';


import {Home, Login, Poll, Search, CompletedPolls, StarPolls, MyVotes, MyPolls, SocialFeed, ManageFriends, Account, CreateWidget, Rewards} from './controllers/reactRenderController';
import {WidgetPoll} from './controllers/widgetRenderController';
import AuthController from './controllers/authController';
import WsController from './controllers/wsController';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

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
app.get( "/starPolls", StarPolls);
app.get( "/myVotes", MyVotes);
app.get( "/myPolls", MyPolls);
app.get( "/social", SocialFeed);
app.get( "/social/manageFriends", ManageFriends);
app.get( "/account", Account);
app.get( "/createWidget", CreateWidget);
app.get( "/rewards", Rewards);

app.get( "/rewards", Rewards);

app.ws('/api/ws', WsController);


app.listen( 3001 );
