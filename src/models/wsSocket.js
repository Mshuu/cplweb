
const WS_PATH = '/api/ws';

export default class WsSocket {
  constructor(){
    this.open = false;
    this._msgId = 0;
    this._pendingPromises = {};
  }

  connect(){
    return new Promise( res => {
      this.socket = new WebSocket("ws://" + location.host + WS_PATH);

      this.socket.addEventListener('open', (event) => {
        console.log('WS Connected');
        this.open = true;
        res();
      });

      this.socket.addEventListener('close', this.handleError.bind(this));
      //this.socket.addEventListener('error', this.handleError.bind(this));
      this.socket.addEventListener('message', this.handleMessage.bind(this));
    });
  }

  handleError(){
    this.open = false;
    setTimeout( () => this.connect(), 1000);
  }

  handleMessage(event){
    let msg = JSON.parse(event.data);
    let promises = this._pendingPromises[msg.id];

    if(promises){
      promises.res(msg);
    }
  }

  request(params){
    return new Promise( (res, rej) => {
      this._pendingPromises[++this._msgId] = {res, rej};

      let message = Object.assign(params, { id: this._msgId });
      this.socket.send(JSON.stringify(message));
    });
  }
}
