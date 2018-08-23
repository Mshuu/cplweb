import ClearpollApi from './webApi';
import State from './state';
import Poll from './Poll';

const TEN_MINUTES = 10 * 60 * 1000;

class PollData {
  constructor(){
    this.pollCache = {};
    this.voteCache = {};
    this.voteCacheFetched = false;
  }

  async _prefetchCheck(){
    if(!State.isLoggedIn()) throw new Error('Not logged in');
    if(!this.voteCacheFetched) await this.fetchVoteHistory();
  }

  async fetchHome(){
    await this._prefetchCheck();

    let params = {
      function: 'GetPollListHome',
    }

    let response = await ClearpollApi.request(params);

    for(let key in response){
      if(!(response[key] instanceof Array)) continue;

      response[key] = response[key].map( poll => { return new Poll(poll) } );
      response[key].forEach( poll => { this._cachePoll(poll) } );
    }

    return response;
  }

  _cachePoll(poll){
    this.pollCache[poll.id] = poll;
    localStorage.setItem(`poll:${poll.id}`, JSON.stringify({poll, createdAt: Date.now()}));

    if(this.voteCache[poll.id])
      this.pollCache[poll.id].setVotedAnswer( this.voteCache[poll.id] );
  }

  _cachePopPoll(pollId){
    if( this.pollCache[pollId] )
      return this.pollCache[pollId];

    let cacheJson = localStorage.getItem(`poll:${pollId}`);
    
    if(cacheJson){
      let cacheEntry = JSON.parse(cacheJson);
      let cacheEntryAge = Date.now() - new Date(cacheEntry.createdAt);

      if(cacheEntryAge > TEN_MINUTES) return null;

      let poll = new Poll(cacheEntry.poll);
      this._cachePoll(poll);

      return poll;
    } else
      return null;
  }

  async fetchPoll(pollId){
    await this._prefetchCheck();

    if( this._cachePopPoll(pollId) ) return this._cachePopPoll(pollId);

    let params = {
      function: 'GetPoll',
      pollId
    }

    let response = await ClearpollApi.request(params);
    let poll = new Poll( response.poll[0] );

    this._cachePoll(poll);

    return poll;
  }

  async fetchVoteHistory(){
    let params = {
      function: 'GetVoteHistory'
    }

    let response = await ClearpollApi.request(params);

    response.voteHistory.forEach( vote => {
      this.voteCache[vote.pollID] = vote.answerID;
    });

    this.voteCacheFetched = true;
  }
}


export default new PollData();
