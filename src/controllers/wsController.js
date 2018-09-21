import Authenticator from '../models/authenticator';
import ServerApi from '../models/serverApi';

class WsController {
  static connectionHandler(ws, req){
    let auth;

    try {
      auth = Authenticator.verify( req.cookies['_auth'] );
    } catch(e){
      ws.close();
      return
    }

    new WsController(ws, auth);
  }

  constructor(ws, auth){
    this.ws = ws;
    this.auth = auth;
    this.apiClient = new ServerApi(auth);

    ws.on('message', this.handleMessage.bind(this));
  }

  async handleMessage(msgJSON){
    let msg = JSON.parse(msgJSON);

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
      this.ws.send( JSON.stringify(response) )
    }
  }

  async replyHome({ id }){
    let data = await this.apiClient.fetchHome();
    let response = Object.assign(data, { id });

    this.ws.send( JSON.stringify(response) )
  }

  async replyGetPoll({ id, pollId }){
    let poll = await this.apiClient.fetchPoll(pollId);

    let response = Object.assign(poll, { id });

    this.ws.send( JSON.stringify(response) )
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

      this.ws.send( JSON.stringify(response) )
    } catch(e){
      let response = {
        id,
        success: false
      };

      this.ws.send( JSON.stringify(response) )
    }
  }

  async replyGetPollList(params){
    let id = params.id;
    let polls = await this.apiClient.getPollList(params);

    let response = Object.assign({polls, id });

    this.ws.send( JSON.stringify(response) )
  }

  async replySearchPolls({id, searchString}){
    let polls = await this.apiClient.doSearch(searchString);
    console.dir(polls);
    let response = Object.assign({polls, id });

    this.ws.send( JSON.stringify(response) )
  }

  async replySocialFeed({id, recordQty, recordStartNo}){
    let polls = await this.apiClient.getSocialFeed({recordQty, recordStartNo});

    let response = Object.assign({polls, id });

    this.ws.send( JSON.stringify(response) )
  }

  async replyGetUserSettings({id}){
    let settings = await this.apiClient.getUserSettings();

    let response = Object.assign(settings, { id });

    this.ws.send( JSON.stringify(response) )
  }

  async replyGetFriendRequests({id}){
    let requests = await this.apiClient.getFriendRequests();

    let response = {id, requests};

    this.ws.send( JSON.stringify(response) )
  }

  async replyGetFriends({id}){
    let friends = await this.apiClient.getFriends();

    let response = {id, friends};
    this.ws.send( JSON.stringify(response) )
  }

  async replyMuteFriend({id, friendId}){
    let result = await this.apiClient.muteFriend(friendId);

    let response = Object.assign(result, {id});
    this.ws.send( JSON.stringify(response) );
  }

  async replyUnmuteFriend({id, friendId}){
    let result = await this.apiClient.unmuteFriend(friendId);

    let response = Object.assign(result, {id});
    this.ws.send( JSON.stringify(response) );
  }

  async replyIgnoreFriendRequest({id, friendId}){
    let result = await this.apiClient.ignoreFriendRequest(friendId);

    let response = Object.assign(result, {id});
    this.ws.send( JSON.stringify(response) );
  }

  async replySearchUsername({id, searchString}){
    let result = await this.apiClient.searchUsername(searchString);

    let response = Object.assign(result, {id});
    this.ws.send( JSON.stringify(response) );
  }

  async replySendFriendRequest({id, friendId}){
    let result = await this.apiClient.sendFriendRequest(friendId);

    let response = Object.assign(result, {id});
    this.ws.send( JSON.stringify(response) );
  }

  async replyApproveFriendRequest({id, friendId}){
    let result = await this.apiClient.approveFriendRequest(friendId);

    let response = Object.assign(result, {id});
    this.ws.send( JSON.stringify(response) );
  }

  async replySaveWalletAddress({id, wallet}){
    let result = await this.apiClient.saveWalletAddress(wallet);

    let response = Object.assign(result, {id});
    this.ws.send( JSON.stringify(response) );
  }

  async replyGetWalletAddress({id}){
    let result = await this.apiClient.getWalletAddress();

    let response = Object.assign(result, {id});
    this.ws.send( JSON.stringify(response) );
  }

  async replyDeleteAccount({id}){
    let result = await this.apiClient.deleteAccount();

    let response = Object.assign(result, {id});
    this.ws.send( JSON.stringify(response) );
  }
  async replyUserSignup({phoneNumber}){

    let result = await this.apiClient.UserSignup(phoneNumber);

    let response = Object.assign(result, {phoneNumber});
    this.ws.send(JSON.stringify(response));
  }
}


export default WsController.connectionHandler;
