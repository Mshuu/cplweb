import Authenticator from '../models/authenticator';
import ServerApi from '../models/serverApi';
import CryptoJS from "crypto-js";
var util = require('util')


class WsController {
  static connectionHandler(ws, req){
    let auth;

    try {
      auth = Authenticator.verify( req.cookies['_auth'] );
    } catch(e){
      ws.close();
      return
    }
    let ip;
    if (req.connection.remoteAddress == "::ffff:127.0.0.1"){
      ip = req.headers['x-forwarded-for'];
    } else {
      ip = req.connection.remoteAddress
    }
    new WsController(ws,auth,ip);
  }

  constructor(ws, auth,ip){
    this.ws = ws;
    this.auth = auth;
    this.ip = ip;
    this.apiClient = new ServerApi(auth,ip);

    ws.on('message', this.handleMessage.bind(this));
  }

	encryptResponse(response){
		var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(response), 'Y;8)t,[;xzy9niU2$tL?');
		return ciphertext.toString();
	}

  async handleMessage(msgJSON){

		var bytes  = CryptoJS.AES.decrypt(msgJSON.toString(), 'Y;8)t,[;xzy9niU2$tL?');
		var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    let msg = JSON.parse(plaintext);


    try{
      switch(msg.function){
        case 'GetPollListHome':
          await this.replyHome(msg);
          break;
        case 'GetPoll':
          await this.replyGetPoll(msg);
          break;
        case 'VoteOnPoll':
          await this.replyVoteOnPoll(msg);
          break;
        case 'GetPollList':
          await this.replyGetPollList(msg);
          break;
        case 'SearchPolls':
          await this.replySearchPolls(msg);
          break;
        case 'SocialFeed':
          await this.replySocialFeed(msg);
          break;
        case 'GetUserSettings':
          await this.replyGetUserSettings(msg);
          break;
        case 'GetFriendRequests':
          await this.replyGetFriendRequests(msg);
          break;
        case 'GetFriends':
          await this.replyGetFriends(msg);
          break;
        case 'MuteFriend':
          await this.replyMuteFriend(msg);
          break;
        case 'UnmuteFriend':
          await this.replyUnmuteFriend(msg);
          break;
        case 'IgnoreFriendRequest':
          await this.replyIgnoreFriendRequest(msg);
          break;
        case 'SearchUsername':
          await this.replySearchUsername(msg);
          break;
        case 'SendFriendRequest':
          await this.replySendFriendRequest(msg);
          break;
        case 'ApproveFriendRequest':
          await this.replyApproveFriendRequest(msg);
          break;
        case 'SaveWalletAddress':
          await this.replySaveWalletAddress(msg);
          break;
        case 'GetWalletAddress':
          await this.replyGetWalletAddress(msg);
          break;
        case 'DeleteAccount':
          await this.replyDeleteAccount(msg);
          break;
        case 'UserSignup':
          await this.replyUserSignup(msg);
          break;
      }
    } catch(e){
      console.dir(e);

      let response = Object.assign({success: false, error: e.message}, { id: msg.id });
      this.ws.send( this.encryptResponse(response) )
    }
  }

  async replyHome({ id }){
    let data = await this.apiClient.fetchHome();
    let response = Object.assign(data, { id });

    this.ws.send( this.encryptResponse(response) )
  }

  async replyGetPoll({ id, pollId }){
    let poll = await this.apiClient.fetchPoll(pollId);

    let response = Object.assign(poll, { id });

    this.ws.send( this.encryptResponse(response) )
  }

  async replyVoteOnPoll({ id, pollId, voteAnswer, showOnFeed }){
    try {
      let data = await this.apiClient.voteOnPoll({
        pollId,
        voteAnswer,
        showOnFeed
      });


      let results = await this.apiClient.getPollResult(pollId);
      let response = {
        id,
        success: true,
        results: results.votesPerAnswer
      };

      this.ws.send( this.encryptResponse(response) )
    } catch(e){
      let response = {
        id,
        success: false
      };

      this.ws.send( this.encryptResponse(response) )
    }
  }

  async replyGetPollList(params){
    let id = params.id;
    let polls = await this.apiClient.getPollList(params);

    let response = Object.assign({polls, id });

    this.ws.send( this.encryptResponse(response) )
  }

  async replySearchPolls({id, searchString}){

    let polls = await this.apiClient.doSearch(searchString);
    console.dir(polls);
    let response = Object.assign({polls, id });



    this.ws.send( this.encryptResponse(response) )
  }

  async replySocialFeed({id, recordQty, recordStartNo}){
    let polls = await this.apiClient.getSocialFeed({recordQty, recordStartNo});

    let response = Object.assign({polls, id });

    this.ws.send( this.encryptResponse(response) )
  }

  async replyGetUserSettings({id}){
    let settings = await this.apiClient.getUserSettings();

    let response = Object.assign(settings, { id });

    this.ws.send( this.encryptResponse(response) )
  }

  async replyGetFriendRequests({id}){
    let requests = await this.apiClient.getFriendRequests();

    let response = {id, requests};

    this.ws.send( this.encryptResponse(response) )
  }

  async replyGetFriends({id}){
    let friends = await this.apiClient.getFriends();

    let response = {id, friends};
    this.ws.send( this.encryptResponse(response) )
  }

  async replyMuteFriend({id, friendId}){
    let result = await this.apiClient.muteFriend(friendId);

    let response = Object.assign(result, {id});
    this.ws.send( this.encryptResponse(response) );
  }

  async replyUnmuteFriend({id, friendId}){
    let result = await this.apiClient.unmuteFriend(friendId);

    let response = Object.assign(result, {id});
    this.ws.send( this.encryptResponse(response) );
  }

  async replyIgnoreFriendRequest({id, friendId}){
    let result = await this.apiClient.ignoreFriendRequest(friendId);

    let response = Object.assign(result, {id});
    this.ws.send( this.encryptResponse(response) );
  }

  async replySearchUsername({id, searchString}){
    let result = await this.apiClient.searchUsername(searchString);

    let response = Object.assign(result, {id});
    this.ws.send( this.encryptResponse(response) );
  }

  async replySendFriendRequest({id, friendId}){
    let result = await this.apiClient.sendFriendRequest(friendId);

    let response = Object.assign(result, {id});
    this.ws.send( this.encryptResponse(response) );
  }

  async replyApproveFriendRequest({id, friendId}){
    let result = await this.apiClient.approveFriendRequest(friendId);

    let response = Object.assign(result, {id});
    this.ws.send( this.encryptResponse(response) );
  }

  async replySaveWalletAddress({id, wallet}){
    let result = await this.apiClient.saveWalletAddress(wallet);

    let response = Object.assign(result, {id});
    this.ws.send( this.encryptResponse(response) );
  }

  async replyGetWalletAddress({id}){
    let result = await this.apiClient.getWalletAddress();

    let response = Object.assign(result, {id});
    this.ws.send( this.encryptResponse(response) );
  }

  async replyDeleteAccount({id}){
    let result = await this.apiClient.deleteAccount();

    let response = Object.assign(result, {id});
    this.ws.send( this.encryptResponse(response) );
  }
  async replyUserSignup({phoneNumber}){

    let result = await this.apiClient.UserSignup(phoneNumber);

    let response = Object.assign(result, {phoneNumber});
    this.ws.send(this.encryptResponse(response));
  }
}


export default WsController.connectionHandler;
