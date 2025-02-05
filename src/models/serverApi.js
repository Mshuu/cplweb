import axios from 'axios';
import moment from 'moment';
import State from './state';

const SERVER_URL = "https://node.clearpoll.com/Clearpoll";
var ipAddr = "";
var Web3 = require("web3");
const abi = [
	{
		"inputs": [
			{
				"name": "questionEntered",
				"type": "string"
			},
			{
				"name": "creatorEntered",
				"type": "address"
			},
			{
				"name": "isRestrictedEntered",
				"type": "bool"
			},
			{
				"name": "isBankEntered",
				"type": "bool"
			},
			{
				"name": "isLimitedEntered",
				"type": "bool"
			},
			{
				"name": "expiresEntered",
				"type": "uint256"
			},
			{
				"name": "categoryEntered",
				"type": "string"
			},
			{
				"name": "answersEntered",
				"type": "string[]"
			},
			{
				"name": "tagsEntered",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "answer",
				"type": "string"
			}
		],
		"name": "VoteOnOption",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "answers",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "category",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "creator",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "expires",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAnswersLength",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "GetTagCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "answer",
				"type": "string"
			}
		],
		"name": "getVoteCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isBank",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isLimited",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isRestricted",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "maxVotes",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "question",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tags",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

class ServerApi {


  static async request(params){
    let response;
    let requestParams = params;
    let headers = {
      'Content-Type': 'application/json',
      'X-Forwarded-For': ipAddr
    };

    try {
      response = await axios.post(SERVER_URL, requestParams, {headers: headers});
    } catch(e){
      console.dir("ERROR4: " + e);
      throw new Error('A network error occured');
    }

    if(response.data.success === 'false')
      throw new Error(response.data.comment || 'An unknown error occured');

    return response.data;
  }
  static async request3(params){
    let response;
    let requestParams = params;
    let headers = {
      'Content-Type': 'application/json',
      'X-Forwarded-For': ipAddr
    };

    try {
      response = await axios.post(SERVER_URL, requestParams, {headers: headers});
    } catch(e){
      console.dir("ERROR 3:" + e);
      throw new Error('A network error occured');
    }


    return response.data;
  }
  static async request2(params){
    let response;
    let requestParams = params;

    try {
			var server = "https://business.nextechdevelopments.com/CPLB";
      response = await axios.post(server, requestParams);
    } catch(e){
      console.dir("ERROR2 : " + e);
      throw new Error('A network error occured');
    }


    return response.data;
  }

  constructor(auth,ip){
    this.auth = auth || {};
    this.voteHistory = [];
    this.historyFetched = false;
    if (ip == "::1" || !ip){
      ipAddr = "103.94.51.210";
    } else {
      ipAddr = ip.replace(/^.*:/, '');
    }
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

    this.voteHistory = homeData.voteHistory;
    this.historyFetched = true;

    for(let key in homeData){
      if(typeof homeData[key] != "object") continue;

      homeData[key] = homeData[key].map( poll => {
        if(!poll.id) return
        return Object.assign(poll, this.getHasVoted(poll.id));
      });
    }
    return homeData;



  }

  async FetchAdvert(category) {
     return await ServerApi.request2({
      function: 'FetchAdvert',
      category: category
    });
  }

  async fetchPoll(pollId){
    if(!this.historyFetched)
      await this.fetchVotehistory();

    let pollData = await ServerApi.request3({
      function: 'GetPoll',
      pollId
    });

    if (pollData.success == 'false'){
      return pollData;
    } else {

          let poll = Object.assign(this.getHasVoted(pollId), pollData.poll[0], {pollId});
          let hasExpired = moment(1000*poll.pollTime) < moment();

          if( hasExpired || poll.hasVoted || poll.creatorId == 3939 ){
            let pollResults = await this.getPollResult(pollId);

            poll = Object.assign(poll, pollResults.pollInfo[0], {pollId});
            poll.results = pollResults.votesPerAnswer;
            poll.anonResults = pollResults.votesPerAnswerAnon;
            poll.votedOn = pollResults.voted;
            poll.pollVotes = pollResults.totalVotes;

                      let tempResponse = {
                        id: pollResults.id,
                        success: true,
                        results: pollResults.votesPerAnswer,
                        anonResults: pollResults.votesPerAnswerAnon
                      };
                      poll.response = tempResponse;
          } else {
            let pollResults = await this.getPollResult(pollId);


            poll = Object.assign(poll, pollResults.pollInfo[0], {pollId});
            poll.results = pollResults.votesPerAnswer;
            poll.anonResults = pollResults.votesPerAnswerAnon;
            poll.votedOn = pollResults.voted;
            poll.pollVotes = pollResults.totalVotes;

                      let tempResponse = {
                        id: pollResults.id,
                        success: true,
                        results: pollResults.votesPerAnswer,
                        anonResults: pollResults.votesPerAnswerAnon
                      };
                      poll.response = tempResponse;
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

  }
	async fetchPollAnon(pollId){
    let pollData = await ServerApi.request3({
      function: 'GetPollAnon2',
      pollId
    });
    if (pollData.success == 'false'){


      if (pollData.comment == "Already voted"){
        let poll = Object.assign(this.getHasVoted(pollId), pollData.poll[0], {pollId});
        var pollisAnon = poll.isAnon;
        let hasExpired = moment(1000*poll.pollTime) < moment();
        let forceResults = true;
        if( poll.isAnon == 1 && poll.type != "Ratings"){
          let pollResults = await this.getPollResultAnon(pollId);
          poll = Object.assign(this.getHasVoted(pollId), pollResults.pollInfo[0], {pollId});
          poll.results = pollResults.votesPerAnswer;
          poll.anonResults = pollResults.votesPerAnswerAnon;
          poll.votedOn = pollResults.voted;
          poll.pollVotes = pollResults.totalVotes;

                                let tempResponse = {
                                  id: pollResults.id,
                                  success: true,
                                  results: pollResults.votesPerAnswer,
                                  anonResults: pollResults.votesPerAnswerAnon
                                };
                                poll.response = tempResponse;
          let pollAnswers = await this.getPollAnswers(pollId);
          poll.answers = pollAnswers.answer;
          poll.isAnon = pollisAnon;
          poll.forceResults = forceResults;
          return poll;
        } else if (pollData.success == 'false'){
          if (pollData.comment == "Already voted"){


                          if( hasExpired || poll.hasVoted || poll.creatorId == 3939 || poll.forceResults ){
                            let pollResults = await this.getPollResultAnon(pollId);

                            poll = Object.assign(poll, pollResults.pollInfo[0], {pollId});
                            poll.results = pollResults.votesPerAnswer;
                            poll.anonResults = pollResults.votesPerAnswerAnon
                            poll.votedOn = pollResults.voted;
                            poll.pollVotes = pollResults.totalVotes;
                            poll.forceResults = forceResults;

                                                  let tempResponse = {
                                                    id: pollResults.id,
                                                    success: true,
                                                    results: pollResults.votesPerAnswer,
                                                    anonResults: pollResults.votesPerAnswerAnon
                                                  };
                                                  poll.response = tempResponse;
                          } else {
                            let pollResults = await this.getPollResultAnon(pollId);

                            poll = Object.assign(poll, pollResults.pollInfo[0], {pollId});
                            poll.results = pollResults.votesPerAnswer;
                            poll.anonResults = pollResults.votesPerAnswerAnon
                            poll.votedOn = pollResults.voted;
                            poll.pollVotes = pollResults.totalVotes;
                            poll.forceResults = forceResults;

                                                  let tempResponse = {
                                                    id: pollResults.id,
                                                    success: true,
                                                    results: pollResults.votesPerAnswer,
                                                    anonResults: pollResults.votesPerAnswerAnon
                                                  };
                                                  poll.response = tempResponse;
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
          } else {
              return pollData;
            }
            } else {


              if( hasExpired || poll.hasVoted || poll.creatorId == 3939 ){
                let pollResults = await this.getPollResultAnon(pollId);

                poll = Object.assign(poll, pollResults.pollInfo[0], {pollId});
                poll.results = pollResults.votesPerAnswer;
                poll.anonResults = pollResults.votesPerAnswerAnon
                poll.votedOn = pollResults.voted;
                poll.pollVotes = pollResults.totalVotes;

                                      let tempResponse = {
                                        id: pollResults.id,
                                        success: true,
                                        results: pollResults.votesPerAnswer,
                                        anonResults: pollResults.votesPerAnswerAnon
                                      };
                                      poll.response = tempResponse;
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
      } else {
          return pollData;
        }
    } else {

    let poll = Object.assign(this.getHasVoted(pollId), pollData.poll[0], {pollId});
		var pollisAnon = poll.isAnon;
    let hasExpired = moment(1000*poll.pollTime) < moment();
    if( poll.isAnon == 1 && poll.type != "Ratings"){
      let pollResults = await this.getPollResultAnon(pollId);
      poll = Object.assign(this.getHasVoted(pollId), pollResults.pollInfo[0], {pollId});
      poll.results = pollResults.votesPerAnswer;
      poll.anonResults = pollResults.votesPerAnswerAnon
      poll.votedOn = pollResults.voted;
      poll.pollVotes = pollResults.totalVotes;

                            let tempResponse = {
                              id: pollResults.id,
                              success: true,
                              results: pollResults.votesPerAnswer,
                              anonResults: pollResults.votesPerAnswerAnon
                            };
                            poll.response = tempResponse;
      let pollAnswers = await this.getPollAnswers(pollId);
      poll.answers = pollAnswers.answer;
			poll.isAnon = pollisAnon;
      return poll;
    } else if (pollData.success == 'false'){
          return pollData;
        } else {


          if( hasExpired || poll.hasVoted || poll.creatorId == 3939 ){
            let pollResults = await this.getPollResultAnon(pollId);

            poll = Object.assign(poll, pollResults.pollInfo[0], {pollId});
            poll.results = pollResults.votesPerAnswer;
            poll.anonResults = pollResults.votesPerAnswerAnon
            poll.votedOn = pollResults.voted;
            poll.pollVotes = pollResults.totalVotes;

                                  let tempResponse = {
                                    id: pollResults.id,
                                    success: true,
                                    results: pollResults.votesPerAnswer,
                                    anonResults: pollResults.votesPerAnswerAnon
                                  };
                                  poll.response = tempResponse;
          } else {
            let pollResults = await this.getPollResultAnon(pollId);

            poll = Object.assign(poll, pollResults.pollInfo[0], {pollId});
            poll.results = pollResults.votesPerAnswer;
            poll.anonResults = pollResults.votesPerAnswerAnon
            poll.votedOn = pollResults.voted;
            poll.pollVotes = pollResults.totalVotes;

                                  let tempResponse = {
                                    id: pollResults.id,
                                    success: true,
                                    results: pollResults.votesPerAnswer,
                                    anonResults: pollResults.votesPerAnswerAnon
                                  };
                                  poll.response = tempResponse;
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
  }

  }

  async fetchUnauthPoll(pollId){
    let pollData = await ServerApi.request3({
      function: 'GetPoll',
      pollId
    });


    if (pollData.success == 'false'){
      return pollData;
    } else {

    let poll = Object.assign(this.getHasVoted(pollId), pollData.poll[0], {pollId});

    let pollResults = await ServerApi.request({
      function: 'GetPublicPollResult',
      pollId
    });

      poll = Object.assign(poll, pollResults.pollInfo[0], {pollId});
      poll.results = pollResults.votesPerAnswer;
      poll.votedOn = pollResults.voted;
      poll.pollVotes = pollResults.totalVotes;
      let pollAnswers = await this.getPollAnswers(pollId);
      poll.answers = pollAnswers.answer;

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
  }

  async fetchUnauthPoll(pollId){



		    let pollData = await ServerApi.request({
		      function: 'GetPoll',
		      pollId
		    });

		    let poll = Object.assign(false, pollData.poll[0], {pollId});
		    let hasExpired = moment(1000*poll.pollTime) < moment();
		    if( hasExpired || poll.hasVoted || poll.isAnon == 0 ){
		      let pollResults = await this.getPollResultAnon(pollId);

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
    return response;
  }
  async voteOnPollAnon(params){
    params.showOnFeed = 0;

    let response = await ServerApi.request({
      function: 'VoteOnPollAnon',
      ...params
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
	async getPollResultAnon(pollId){
		let response = await ServerApi.request({
			function: 'GetPollResultAnon',
			pollId
		});

		return response;
	}

  async getPollAnswers(pollId){
    let response = await ServerApi.request({
      function: 'GetPollAnswer',
      pollId
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
  async getPollListAnon(params){
    console.dir("AnonPollList");
    let response = await ServerApi.request({
      function: 'GetPollListAnon',
      ...params
    });
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
      ...params,
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

  async ignoreFriendRequest(requestId){
    return await ServerApi.request({
      function: 'IgnoreFriendRequest',
      requestId,
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
	async UserSignup(phoneNumber){

		return await ServerApi.request({
			function: 'UserSignup',
			phoneNumber
		});
	}

  async approveFriendRequest(friendId){
    return await ServerApi.request({
      function: 'ApproveFriendRequest',
      requestId: friendId,
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

  async saveWalletAddress(wallet){
    return await ServerApi.request({
      function: 'SaveEthereumWallet',
      wallet,
      ...this.auth
    });
  }

  async getWalletAddress(){
    try {
      return await ServerApi.request({
        function: 'GetEthereumWallet',
        ...this.auth
      });
    } catch(e){
      return {
        success: false,
        error: e.message
      }
    }
  }

  async deleteAccount(){
    return await ServerApi.request({
      function: 'DeleteAccount',
      ...this.auth
    });
  }
}

export default ServerApi;
