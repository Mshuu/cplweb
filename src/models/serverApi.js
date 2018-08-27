import axios from 'axios';
import moment from 'moment';
import State from './state';

const SERVER_URL = "https://node4.l2shuu.com:3000/Clearpoll";

class ServerApi {
  static async request(params){
    let response;
    let requestParams = params;

    try {
      response = await axios.post(SERVER_URL, requestParams);
    } catch(e){
      console.dir(e);
      throw new Error('A network error occured');
    }

    if(response.data.success === 'false')
      throw new Error(response.data.comment || 'An unknown error occured');

    return response.data;
  }

  constructor(auth){
    this.auth = auth || {};
    this.voteHistory = [];
    this.historyFetched = false;
  }

  getHasVoted(pollId){
    let voteMatch = this.voteHistory.find( h => { return h.pollID == pollId});
    
    if(voteMatch)
      return {
        hasVoted: true,
        answerId: voteMatch.answerID
      };
    else
      return {};
  }

  async fetchHome(){
    let homeData = await ServerApi.request({
      function: 'GetPollListHome',
      ...this.auth
    });
    let categories = [];

    this.voteHistory = homeData.voteHistory;
    this.historyFetched = true;

    for(let key in homeData){
      if(typeof homeData[key] != "object") continue;

      homeData[key] = homeData[key].map( poll => {
        if(!poll.id) return;

        let cat = poll.category;

        if(categories.indexOf(cat) == -1) categories.push(cat);

        return Object.assign(poll, this.getHasVoted(poll.id));
      });
    }
    //console.dir(categories);
    return homeData;
  }

  async fetchPoll(pollId){
    if(!this.historyFetched)
      await this.fetchVotehistory();

    let pollData = await ServerApi.request({
      function: 'GetPoll',
      pollId
    });

    let poll = Object.assign(this.getHasVoted(pollId), pollData.poll[0], {pollId});
    let hasExpired = moment(1000*poll.pollTime) < moment();

    if( hasExpired || poll.hasVoted ){
      let pollResults = await this.getPollResult(pollId);

      poll = Object.assign(poll, pollResults.pollInfo[0], {pollId});
      poll.results = pollResults.votesPerAnswer;
      poll.votedOn = pollResults.voted;
      poll.pollVotes = pollResults.totalVotes;
    } else {
      let pollAnswers = await this.getPollAnswers(pollId);
      poll.answers = pollAnswers.answer;
    }

    if(poll.type == "Ratings"){
      if(!poll.results) {
        let resultResponse = await ServerApi.request({
          function: 'GetPublicPollResult',
          pollId
        });
        poll.results = resultResponse.votesPerAnswer;
      }

      let totalVotes = poll.pollVotes;

      if(totalVotes == 0)
        poll.averageRating = 0;
      else
        poll.averageRating = poll.results.reduce(
          (acc, answer) => {return acc + Number(answer.answerText) * (answer.voteCount / totalVotes)},
          0
        );
    }

    return poll;
  }

  async fetchUnauthPoll(pollId){
    let pollData = await ServerApi.request({
      function: 'GetPoll',
      pollId
    });

    let poll = Object.assign(this.getHasVoted(pollId), pollData.poll[0], {pollId});
    console.dir(poll);

    let pollResults = await ServerApi.request({
      function: 'GetPublicPollResult',
      pollId
    });

    poll = Object.assign(poll, pollResults.pollInfo[0], {pollId});
    poll.results = pollResults.votesPerAnswer;
    poll.votedOn = pollResults.voted;
    poll.pollVotes = pollResults.totalVotes;

    if(poll.type == "Ratings"){
      let totalVotes = poll.pollVotes;

      if(totalVotes == 0)
        poll.averageRating = 0;
      else
        poll.averageRating = poll.results.reduce(
          (acc, answer) => {return acc + Number(answer.answerText) * (answer.voteCount / totalVotes)},
          0
        );
    }

    return poll;
  }

  async fetchVotehistory(pollId){
    let response = await ServerApi.request({
      function: 'GetVoteHistory',
      ...this.auth
    });

    this.voteHistory = response.voteHistory;
    this.historyFetched = true;

    return this.voteHistory;
  }

  async voteOnPoll(params){
    params.showOnFeed = params.showOnFeed ? 1 : 0;

    let response = await ServerApi.request({
      function: 'VoteOnPoll',
      ...params,
      ...this.auth
    });

    console.dir(response);

    return response;
  }

  async voteOnPoll(params){
    params.showOnFeed = params.showOnFeed ? 1 : 0;

    let response = await ServerApi.request({
      function: 'VoteOnPoll',
      ...params,
      ...this.auth
    });

    return response;
  }

  async getPollResult(pollId){
    let response = await ServerApi.request({
      function: 'GetPollResult',
      pollId,
      ...this.auth
    });

    return response;
  }

  async getPollAnswers(pollId){
    let response = await ServerApi.request({
      function: 'GetPollAnswer',
      pollId,
      ...this.auth
    });

    return response;
  }

  async getPollList(params){
    let response = await ServerApi.request({
      function: 'GetPollList',
      ...params,
      ...this.auth
    });

    /*
      result: true,
      polls: [Poll],
      voteHistory: [VoteHistory]
    */

    this.voteHistory = response.voteHistory;

    return response.poll.map( poll => { return Object.assign(poll, this.getHasVoted(poll.id)) });
  }

  async doSearch(searchString){
    let response = await ServerApi.request({
      function: 'SearchPolls',
      searchString,
      ...this.auth
    });

    this.voteHistory = response.voteHistory;
    
    let polls = response.poll.map(poll => {
      return Object.assign(
        poll,
        this.getHasVoted(poll.Id)
      );
    });

    return polls;
  }

  async getSocialFeed(params){
    let response = await ServerApi.request({
      function: 'GetFeed',
      params,
      ...this.auth
    });

    this.voteHistory = response.voteHistory;

    let polls = response.feed.map(poll => {
      return Object.assign(
        poll,
        this.getHasVoted(poll.pollId)
      );
    });

    return polls;
  }

  async getFriendRequests(){
    let response;

    try {
      response = await ServerApi.request({
        function: 'GetFriendRequest',
        ...this.auth
      });
    } catch(e){
      // API throws en error when there are no friend requests.
      response = { requests: [] };
    }

    return response.requests;
  }

  async getFriends(){
    let response = await ServerApi.request({
      function: 'GetFriends',
      ...this.auth
    });

    return response.friends;
  }

  async getUserSettings(){
    return await ServerApi.request({
      function: 'GetUserSettings',
      ...this.auth
    });
  }

  async muteFriend(friendId){
    return await ServerApi.request({
      function: 'MuteFriend',
      friendId,
      ...this.auth
    });
  }

  async unmuteFriend(friendId){
    return await ServerApi.request({
      function: 'UnmuteFriend',
      friendId,
      ...this.auth
    });
  }

  async ignoreFriendRequest(friendId){
    return await ServerApi.request({
      function: 'IgnoreFriendRequest',
      friendId,
      ...this.auth
    });
  }

  async searchUsername(searchString){
    return await ServerApi.request({
      function: 'SearchUsername',
      searchString,
      ...this.auth
    });
  }

  async sendFriendRequest(friendId){
    return await ServerApi.request({
      function: 'SendFriendRequest',
      friendId,
      ...this.auth
    });
  }

  async approveFriendRequest(friendId){
    return await ServerApi.request({
      function: 'ApproveFriendRequest',
      requestId: friendId,
      ...this.auth
    });
  }
}

export default ServerApi;
