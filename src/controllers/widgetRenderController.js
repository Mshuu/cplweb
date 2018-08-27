import React from "react";
import { renderToStaticNodeStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import ServerApi from '../models/serverApi';
import Store from '../models/store';
import Authenticator from '../models/authenticator';
import WidgetRouter from '../components/widgetRouter';

const WidgetPoll = async ( req, res ) => {
  let pollId = req.params.pollId;
  let auth;
  let store = new Store();

  try {
    auth = Authenticator.verify( req.cookies['_auth'] );
  } catch(e) {
    //store.setAuthenticated( false );
  }

  if(!pollId){
    res.status(404).end();
    return;
  }

  renderHead(req, res);

  if(auth)
    authenticatedWidget(req, res, store, pollId, auth);
  else
    unauthenticatedWidget(req, res, store, pollId);
};

async function authenticatedWidget(req, res, store, pollId, auth){
  let apiClient = new ServerApi(auth);

  store.setAuthenticated( true );
  store.setPoll( pollId, await apiClient.fetchPoll(pollId) );

  renderReact(req, res, store, pollId);
}

async function unauthenticatedWidget(req, res, store, pollId){
  console.log('unauth widget');
  let apiClient = new ServerApi();

  store.setAuthenticated( false );
  store.setPoll( pollId, await apiClient.fetchUnauthPoll(pollId) );

  renderReact(req, res, store, pollId);
}



function renderHead(req, res){
  res.writeHead( 200, { "Content-Type": "text/html" } );
  res.write(htmlHead);
}

function renderReact(req, res, store, pollId){
  let context = {};
  let url = req.url;

  const jsx = (
    <StaticRouter context={ context } location={ url }>
      <WidgetRouter store={ store } />
    </StaticRouter>
  );
  const appStream = renderToStaticNodeStream( jsx );

  appStream.pipe(res, {end: false})

  appStream.on(`end`, () => {
    res.end(htmlTail(store, pollId))
  })
}

const htmlHead = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">

  	<link rel="shortcut icon" href="/public/favicon.png" type="image/x-icon" />
    <link href="/public/widgetStyle.css" rel="stylesheet" type="text/css">

    <title>Clearpoll Widget</title>

    <style>
      @font-face {
        font-family: 'Roboto-Light-CPL';
        src: url('/public/fonts/Roboto-Light.ttf') format('truetype');
      }

      html,
      body {
        min-height: 100%;
        padding: 0;
        margin: 0;
        font-family: 'Roboto-Light-CPL';
      }

      #root {
        height:100%;
        width:100%;
        position:absolute;
        top: 0;
        left: 0
        padding: 0;
        margin: 0;
      }

    </style>
  </head>
  <body>
    <div id="root">
`;

const htmlTail = (store, pollId) => `
      </div>
      <script>
        if(window.parent){
          window.parent.postMessage({event: "loadingComplete", pollId: ${pollId}}, '*');
          console.log("Message sent");
        }
        window.storeData = ${JSON.stringify(store.data)};
      </script>
      <script type="text/javascript" src="/public/widgetBundle.js"></script>
    </body>
  </html>
`;


export { WidgetPoll };
