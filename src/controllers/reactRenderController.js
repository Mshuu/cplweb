import React from "react";
import { renderToStaticNodeStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import ServerApi from '../models/serverApi';
import Store from '../models/store';
import Authenticator from '../models/authenticator';
import Template from '../components/template/template';
import WidgetRouter from '../components/widgetRouter';
import CryptoJS from "crypto-js";
import url from 'url';

const defaultMetadata = {
  title: "Clearpoll Desktop",
  description: "ClearPoll - Vote on anything, any time. Earn crypto rewards for creating polls. Get the ClearPoll app now!",
  imageUrl: `${SERVER_BASE_URL}/public/share_thumbnail.png`
};

const LOAD_MORE_QUANTITY = 20;

const Home = async ( req, res ) => {
  let auth;

  try {
    auth = Authenticator.verify( req.cookies['_auth'] );
  } catch(e) {
    res.redirect('/login');
    return;
  }

  renderHead(req, res);

var ip = ""
if (req.connection.remoteAddress == "::ffff:127.0.0.1"){
  ip = req.headers['x-forwarded-for'];
} else {
  ip = req.connection.remoteAddress
}
let apiClient = new ServerApi(auth,ip);
	let homePolls = await apiClient.fetchHome();
	var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(homePolls), 'Y;8)t,[;xzy9niU2$tL?');
  let store = new Store({
    homePolls: homePolls
  });

  renderReact(req, res, store);
};

const Login = async ( req, res ) => {
  let store = new Store({});
  renderHead(req, res);
  renderReact(req, res, store);
};
const FinishSignup = async ( req, res ) => {
  let store = new Store({});
  renderHead(req, res);
  renderReact(req, res, store);
};
const Signup = async ( req, res ) => {
  let store = new Store({});
  renderHead(req, res);
  renderReact(req, res, store);
};
const Signup2 = async ( req, res ) => {
  let store = new Store({});
  renderHead(req, res);
  renderReact(req, res, store);
};
const Signup3 = async ( req, res ) => {
  let store = new Store({});
  renderHead(req, res);
  renderReact(req, res, store);
};

const Poll = async ( req, res ) => {
  let auth;
  let pollId = req.params.pollId;

  try {
    auth = Authenticator.verify( req.cookies['_auth'] );
  } catch(e) {
  }

  if(!req.params.pollId){
    res.status(404).end();
  }

  if(auth)
    authenticatedPoll(req, res, pollId, auth);
  else
    unauthenticatedPoll(req, res, pollId);
};

async function authenticatedPoll(req, res, pollId, auth){
  var ip = ""
if (req.connection.remoteAddress == "::ffff:127.0.0.1"){
  ip = req.headers['x-forwarded-for'];
} else {
  ip = req.connection.remoteAddress
}
let apiClient = new ServerApi(auth,ip);
  let store = new Store();
  let poll = await apiClient.fetchPoll(pollId);

  if (poll.success == 'false'){
    try {
      auth = Authenticator.verify( req.cookies['_auth'] );
      res.redirect('/');
    } catch(e) {
      res.redirect('/login');
    }


  } else {

      store.setAuthenticated( true );
      store.setPoll( pollId, poll );

      let metadata = Object.assign({}, defaultMetadata, {title: poll.question});

      renderHead(req, res, metadata);
      renderReact(req, res, store);
  }

}

async function unauthenticatedPoll(req, res, pollId, auth){
  var ip = ""
if (req.connection.remoteAddress == "::ffff:127.0.0.1"){
  ip = req.headers['x-forwarded-for'];
} else {
  ip = req.connection.remoteAddress
}
let apiClient = new ServerApi(auth,ip);
  let store = new Store();
  let poll = await apiClient.fetchPollAnon(pollId);
  if (poll.success == 'false'){
   try {
     auth = Authenticator.verify( req.cookies['_auth'] );
     res.redirect('/');
   } catch(e) {
     res.redirect('/login');
   }
 } else {
  store.setAuthenticated( false );
  store.setPoll( pollId, poll );

  let metadata = Object.assign({}, defaultMetadata, {title: poll.question});

  renderHead(req, res, metadata);
  renderReact(req, res, store);
}
}




const Search = async ( req, res ) => {
  let auth;

  try {
    auth = Authenticator.verify( req.cookies['_auth'] );
  } catch(e) {
    res.redirect('/login');
    return;
  }

  let searchTerm = req.query.q;

  if(!searchTerm){
    res.status(404).end();
    return;
  }

  renderHead(req, res);
  var ip = ""
  if (req.connection.remoteAddress == "::ffff:127.0.0.1"){
    ip = req.headers['x-forwarded-for'];
  } else {
    ip = req.connection.remoteAddress
  }
  let apiClient = new ServerApi(auth,ip);
  let store = new Store();

  store.setSearchResult(searchTerm, await apiClient.doSearch(searchTerm) );

  renderReact(req, res, store);
};

const CompletedPolls = async ( req, res ) => {
  let auth;

  try {
    auth = Authenticator.verify( req.cookies['_auth'] );
  } catch(e) {
    res.redirect('/login');
    return;
  }

  renderHead(req, res);

  let isCompletedPage = req.url.startsWith('/completed');
  var ip = ""
if (req.connection.remoteAddress == "::ffff:127.0.0.1"){
  ip = req.headers['x-forwarded-for'];
} else {
  ip = req.connection.remoteAddress
}
let apiClient = new ServerApi(auth,ip);
  let store = new Store();
  let category = req.params.category;



  if(category){
    let polls = await apiClient.getPollList({
      active: isCompletedPage ? 'false' : 'true',
      type: isCompletedPage ? 'Completed' : 'Normal',
      category: category,
      sortOrder: 'mostVotes',
      recordStartNo: 0,
      recordQty: LOAD_MORE_QUANTITY,
      positionLatitude: '',
      positionLongitude: '',
      locationFilter: 'Global'
    });

    store.setCategoryPolls(category, polls);
  }


  renderReact(req, res, store);
};

const BrowsePolls = async ( req, res ) => {
  let auth;

  try {
    auth = Authenticator.verify( req.cookies['_auth'] );
  } catch(e) {
    res.redirect('/login');
    return;
  }

  renderHead(req, res);

  var ip = ""
if (req.connection.remoteAddress == "::ffff:127.0.0.1"){
  ip = req.headers['x-forwarded-for'];
} else {
  ip = req.connection.remoteAddress
}
let apiClient = new ServerApi(auth,ip);
  let store = new Store();
  let category = req.params.category;

  if(category){
    let polls = await apiClient.getPollList({
      active: 'false',
      type: 'Completed',
      category: category,
      sortOrder: 'mostVotes',
      recordStartNo: 0,
      recordQty: LOAD_MORE_QUANTITY,
      positionLatitude: '',
      positionLongitude: '',
      locationFilter: 'Global'
    });

    store.setCategoryPolls(category, polls);
  }


  renderReact(req, res, store);
};

const StarPolls = async ( req, res ) => {
  let auth;

  try {
    auth = Authenticator.verify( req.cookies['_auth'] );
  } catch(e) {
    res.redirect('/login');
    return;
  }

  renderHead(req, res);

  var ip = ""
if (req.connection.remoteAddress == "::ffff:127.0.0.1"){
  ip = req.headers['x-forwarded-for'];
} else {
  ip = req.connection.remoteAddress
}
let apiClient = new ServerApi(auth,ip);
  let store = new Store();
  let polls = await apiClient.getPollList({
    category: 'All',
    type: 'Star',
    active: 'true',
    sortOrder: 'mostVotes',
    recordStartNo: 0,
    recordQty: 12,
    positionLatitude: '',
    positionLongitude: '',
    locationFilter: ''
  });
  store.setStarPolls(polls);
  renderReact(req, res, store);
};

const MyVotes = async ( req, res ) => {
  let auth;

  try {
    auth = Authenticator.verify( req.cookies['_auth'] );
  } catch(e) {
    res.redirect('/login');
    return;
  }

  renderHead(req, res);

  var ip = ""
if (req.connection.remoteAddress == "::ffff:127.0.0.1"){
  ip = req.headers['x-forwarded-for'];
} else {
  ip = req.connection.remoteAddress
}
let apiClient = new ServerApi(auth,ip);
  let store = new Store();
  let polls = await apiClient.getPollList({
    category: 'All',
    type: 'MyVotes',
    active: 'true',
    sortOrder: 'mostVotes',
    recordStartNo: 0,
    recordQty: LOAD_MORE_QUANTITY,
    positionLatitude: '',
    positionLongitude: '',
    locationFilter: ''
  });

  store.setMyVotes(polls);
  renderReact(req, res, store);
};

const MyPolls = async ( req, res ) => {
  let auth;

  try {
    auth = Authenticator.verify( req.cookies['_auth'] );
  } catch(e) {
    res.redirect('/login');
    return;
  }

  renderHead(req, res);

  var ip = ""
if (req.connection.remoteAddress == "::ffff:127.0.0.1"){
  ip = req.headers['x-forwarded-for'];
} else {
  ip = req.connection.remoteAddress
}
let apiClient = new ServerApi(auth,ip);
  let store = new Store();
  let polls = await apiClient.getPollList({
    category: 'All',
    type: 'MyPolls',
    active: 'true',
    sortOrder: 'mostVotes',
    recordStartNo: 0,
    recordQty: LOAD_MORE_QUANTITY,
    positionLatitude: '',
    positionLongitude: '',
    locationFilter: ''
  });

  store.setMyVotes(polls);
  renderReact(req, res, store);
};

const SocialFeed = async ( req, res ) => {
  let auth;

  try {
    auth = Authenticator.verify( req.cookies['_auth'] );
  } catch(e) {
    res.redirect('/login');
    return;
  }

  renderHead(req, res);

  var ip = ""
if (req.connection.remoteAddress == "::ffff:127.0.0.1"){
  ip = req.headers['x-forwarded-for'];
} else {
  ip = req.connection.remoteAddress
}
let apiClient = new ServerApi(auth,ip);
  let store = new Store();
  let polls = await apiClient.getSocialFeed({
    recordStartNo: 0,
    recordQty: LOAD_MORE_QUANTITY
  });

  store.setSocialFeed(polls);
  renderReact(req, res, store);
};

const ManageFriends = async ( req, res ) => {
  let auth;

  try {
    auth = Authenticator.verify( req.cookies['_auth'] );
  } catch(e) {
    res.redirect('/login');
    return;
  }

  renderHead(req, res);

  var ip = ""
if (req.connection.remoteAddress == "::ffff:127.0.0.1"){
  ip = req.headers['x-forwarded-for'];
} else {
  ip = req.connection.remoteAddress
}
let apiClient = new ServerApi(auth,ip);
  let store = new Store();

  renderReact(req, res, store);
};

const Account = async ( req, res ) => {
  let auth;

  try {
    auth = Authenticator.verify( req.cookies['_auth'] );
  } catch(e) {
    res.redirect('/login');
    return;
  }

  renderHead(req, res);

  var ip = ""
if (req.connection.remoteAddress == "::ffff:127.0.0.1"){
  ip = req.headers['x-forwarded-for'];
} else {
  ip = req.connection.remoteAddress
}
let apiClient = new ServerApi(auth,ip);
  let store = new Store();
  let settings = await apiClient.getUserSettings();

  store.setUserSettings(settings);
  renderReact(req, res, store);
};


const CreateWidget = async ( req, res ) => {
  let auth;

  try {
    auth = Authenticator.verify( req.cookies['_auth'] );
  } catch(e) {
    res.redirect('/login');
    return;
  }

  renderHead(req, res);

  let store = new Store();
  renderReact(req, res, store);
};

const Rewards = async ( req, res ) => {
  let auth;

  try {
    auth = Authenticator.verify( req.cookies['_auth'] );
  } catch(e) {
    res.redirect('/login');
    return;
  }

  renderHead(req, res);

  var ip = ""
if (req.connection.remoteAddress == "::ffff:127.0.0.1"){
  ip = req.headers['x-forwarded-for'];
} else {
  ip = req.connection.remoteAddress
}
let apiClient = new ServerApi(auth,ip);
  let store = new Store();
  let settings = await apiClient.getUserSettings();

  store.setUserSettings(settings);
  renderReact(req, res, store);
};



function renderHead(req, res, metadata = defaultMetadata){
  let thisUrl = url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  });


  res.writeHead( 200, { "Content-Type": "text/html" } );
  res.write(htmlHead(thisUrl, metadata));
}

function renderReact(req, res, store){
  let context = {};
  let url = req.url;


  const jsx = (
    <StaticRouter context={ context } location={ url }>
      <Template store={ store } />
    </StaticRouter>
  );
  const appStream = renderToStaticNodeStream( jsx );
	var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(store.data), 'Y;8)t,[;xzy9niU2$tL?');

  appStream.pipe(res, {end: false})

  appStream.on(`end`, () => {
    res.end(htmlTail(ciphertext))
  })
}

const htmlHead = (url, metadata) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1.0, width=device-width">
  	<link rel="shortcut icon" href="/public/favicon.png" type="image/x-icon" />

    <meta property="og:url"         content="${url}" />
    <meta property="og:type"        content="website" />
    <meta property="og:title"       content="${metadata.title}" />
    <meta property="og:description" content="${metadata.description}" />
    <meta property="og:image"       content="${metadata.imageUrl}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@voteclearpoll" />

    <link href="/public/style.css" rel="stylesheet" type="text/css">

    <title>Clearpoll Desktop</title>

    <style>
      @font-face {
        font-family: 'Roboto-Light-CPL';
        src: url('/public/fonts/Roboto-Light.ttf') format('truetype');
      }

      html {
          margin: 0;
          padding: 0;
          font-family: 'Roboto-Light-CPL';
      }

      body {
          position: absolute;
          margin: 0;
          padding: 0;
          min-height: 100%;
          float: left;
          width: 100%;
          background: #057cab; /* Old browsers */
          background: -moz-linear-gradient(top, #019eba 1%, #057cab 11%, #234588 40%, #2c3372 60%, #24145e 80%, #271148 100%); /* FF3.6-15 */
          background: -webkit-linear-gradient(top, #019eba 1%, #057cab 11%,#234588 40%,#2c3372 60%,#24145e 80%, #271148 100%); /* Chrome10-25,Safari5.1-6 */
          background: linear-gradient(to bottom, #019eba 1%, #057cab 11%,#234588 40%,#2c3372 60%,#24145e 80%, #271148 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#019eba', endColorstr='#24145e',GradientType=0 ); background-attachment: fixed;
          font-family: 'Roboto-Light-CPL';
      }
    </style>
  </head>
  <body>
    <div id="root" style="width: 100%; height: 100%; margin: 0; padding: 0;">
`;

const htmlTail = store => `
      </div>
      <script>
        if(window.parent){
          window.parent.postMessage({event: "loadingComplete"}, '*');
          console.log("Message sent");
        }
        window.storeData = "${store}";
      </script>
      <script type="text/javascript" src="/public/bundle.js"></script>
      <!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-127300472-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-127300472-1');
</script>

    </body>
  </html>
`;


export { Home, Login, Poll, Search, CompletedPolls, StarPolls, MyVotes, MyPolls, SocialFeed, ManageFriends, Account, CreateWidget, Rewards , Signup, Signup2, Signup3, FinishSignup};
