import axios from 'axios';
import WsSocket from './wsSocket';
const AUTH_URL = "/api/auth";

let socket, connected = false;

function delay(t){
  return new Promise(res => setTimeout(res, t));
}

class WebApi {
  static async login(username, desktopCode){
    let params = {
      username,
      desktopCode
    }

    let response = await WebApi.postRequest(params);
    return response.success;
  }

  static async fetchHome(){
    return await WebApi.wsRequest({
      function: 'GetPollListHome'
    });
  }

  static async fetchPoll(pollId){
    return await WebApi.wsRequest({
      function: 'GetPoll',
      pollId
    });
  }

  static async voteOnPoll(pollId, voteAnswer, showOnFeed){
    return await WebApi.wsRequest({
      function: 'VoteOnPoll',
      pollId,
      voteAnswer,
      showOnFeed
    });
  }

  static async getPolls(params){
    return await WebApi.wsRequest({
      function: 'GetPollList',
      ...params
    });
  }

  static async doSearch(searchString){
    return await WebApi.wsRequest({
      function: 'SearchPolls',
      searchString
    });
  }

  static async fetchSocialFeed(params){
    return await WebApi.wsRequest({
      function: 'SocialFeed',
      ...params
    });
  }

  static async getUserSettings(){
    return await WebApi.wsRequest({
      function: 'GetUserSettings'
    });
  }

  static async fetchFriendRequests(){
    return await WebApi.wsRequest({
      function: 'GetFriendRequests'
    });
  }

  static async fetchFriends(){
    return await WebApi.wsRequest({
      function: 'GetFriends'
    });
  }

  static async muteFriend(friendId){
    return await WebApi.wsRequest({
      function: 'MuteFriend',
      friendId
    });
  }

  static async unmuteFriend(friendId){
    return await WebApi.wsRequest({
      function: 'UnmuteFriend',
      friendId
    });
  }

  static async ignoreFriendRequest(friendId){
    return await WebApi.wsRequest({
      function: 'IgnoreFriendRequest',
      friendId
    });
  }

  static async searchUsername(searchString){
    return await WebApi.wsRequest({
      function: 'SearchUsername',
      searchString
    });
  }

  static async sendFriendRequest(friendId){
    return await WebApi.wsRequest({
      function: 'SendFriendRequest',
      friendId
    });
  }

  static async approveFriendRequest(friendId){
    return await WebApi.wsRequest({
      function: 'ApproveFriendRequest',
      friendId
    });
  }

  static async postRequest(params){
    let response;
    let requestParams = params;

    try {
      response = await axios.post(AUTH_URL, requestParams);
    } catch(e){
      console.dir(requestParams);
      console.dir(e);
      throw new Error('A network error occured');
    }
    console.dir(response);
    return response.data;
  }

  static async ensureConnected(){
    if(!socket){
      socket = new WsSocket();
      await socket.connect();
      connected = true;
    }

    while(!connected){
      await delay(100);
    }
  }

  static async wsRequest(params){
    await WebApi.ensureConnected();
    console.dir(params);
    let response = await socket.request(params);

    return response
  }
}

export default WebApi;
