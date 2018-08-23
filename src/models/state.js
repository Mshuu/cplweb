
class State {
  constructor(){
    this.state = {};
  }

  isLoggedIn(){
    return //localStorage.getItem('auth') != null;
  }

  setAuth(authResponse){
    let auth = {
      code: authResponse.code,
      phoneNumber: authResponse.phoneNumber,
      userId: authResponse.userId,
    };

    return localStorage.setItem('auth', JSON.stringify(auth));
  }

  get auth(){
    let authJson = localStorage.getItem('auth');
    return authJson ? JSON.parse(authJson) : null;
  }
}


export default new State();
