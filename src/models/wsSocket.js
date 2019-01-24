
const WS_PATH = '/api/ws';
import CryptoJS from "crypto-js";


export default class WsSocket {
  constructor(){
    this.open = false;
    this._msgId = 0;
    this._pendingPromises = {};
  }

  connect(){
    return new Promise( res => {
      let protocol = location.protocol != 'https:' ? "ws://" : "wss://";
      this.socket = new WebSocket(protocol + location.host + WS_PATH);

      this.socket.addEventListener('open', (event) => {
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
		var bytes  = CryptoJS.AES.decrypt(event.data, 'Y;8)t,[;xzy9niU2$tL?');
		var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    let msg = JSON.parse(plaintext);
    let promises = this._pendingPromises[msg.id];


    if(promises){

      promises.res(msg);
    } else {
    }
  }

  request(params){
    return new Promise( (res, rej) => {
      this._pendingPromises[++this._msgId] = {res, rej};

      let message = Object.assign(params, { id: this._msgId });
			var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(message), 'Y;8)t,[;xzy9niU2$tL?');
			message = ciphertext;
      this.socket.send(message);
    });
  }
}
