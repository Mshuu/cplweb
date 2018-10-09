import CryptoJS from "crypto-js";
var printerCount = 1;
export default class Store {
constructor(prefetchData = {}){
	var bytes  = CryptoJS.AES.decrypt(prefetchData, 'Y;8)t,[;xzy9niU2$tL?');
	var plaintext = bytes.toString(CryptoJS.enc.Utf8);

	    this.data = Object.assign({
	      polls: {},
	      searchResults: {},
	      category: {},
	      starPolls: [],
	      myVotes: [],
	      socialFeed: [],
	      userSettings: {},
	      authenticated: true,
				phoneNumber: '',
				code: '',
				username: ''
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
	setUsername(username){
		this.data.username = username;
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
	setPhoneNumber(phoneNumber){
		this.data.phoneNumber = phoneNumber;
	}
	setCode(code){
		this.data.code = code;
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
