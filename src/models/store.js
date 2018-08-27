export default class Store {
  constructor(prefetchData = {}){
    this.data = Object.assign({
      polls: {},
      searchResults: {},
      category: {},
      starPolls: [],
      myVotes: [],
      socialFeed: [],
      userSettings: {}
    }, prefetchData);

    this.initialPage = true;
  }

  hydrateCheck(){
    if(this.initialPage){
      this.initialPage = false;
      return true;
    } else return false;
  }

  getPoll(pollId){
    return this.data.polls[pollId];
  }

  setPoll(pollId, poll){
    this.data.polls[pollId] = poll;
  }

  setSearchResult(searchTerm, results){
    this.data.searchResults[searchTerm] = results;
  }

  getSearchResult(searchTerm){
    return this.data.searchResults[searchTerm] || [];
  }

  setCategoryPolls(category, polls){
    this.data.category[category] = polls;
  }

  getCategoryPolls(category){
    return this.data.category[category] || [];
  }

  getStarPolls(){
    return this.data.starPolls || [];
  }

  setStarPolls(starPolls){
    this.data.starPolls = starPolls;
  }

  getMyVotes(){
    return this.data.myVotes || [];
  }

  setMyVotes(myVotes){
    this.data.myVotes = myVotes;
  }

  getSocialFeed(){
    return this.data.socialFeed || [];
  }

  setSocialFeed(socialPolls){
    this.data.socialFeed = socialPolls;
  }

  setUserSettings(settings){
    this.data.userSettings = settings;
  }

  getUserSettings(){
    return this.data.userSettings;
  }

  setAuthenticated(isAuthenticated){
    this.data.authenticated = isAuthenticated;
  }

  getAuthenticated(){
    return this.data.authenticated;
  }
}
