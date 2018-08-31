class WidgetInstance {
  constructor(pollDiv){
    this.pollDiv = pollDiv;

    this.initialize();
  }

  get pollId(){
    return this.pollDiv.attributes['data-clearpoll-pollid'].value;
  }

  get pollType(){
    let dataProp = this.pollDiv.attributes['data-clearpoll-type'];
    return dataProp? dataProp.value : 'standard';
  }

  get widgetUrl(){
    return `${SERVER_BASE_URL}/poll/${this.pollId}/widget?type=${this.pollType}`;
  }

  get loginUrl(){
    return `${SERVER_BASE_URL}/login?embedded=1`;
  }

  initialize(){
    this.createLoading();
    this.createIframe();
  }

  createLoading(){
    let loadingIndicator = document.createElement('div');
    loadingIndicator.classList.add('clearpoll-ripple-load')
    loadingIndicator.appendChild(document.createElement('div'));
    loadingIndicator.appendChild(document.createElement('div'));

    this.loadingContainer = document.createElement('div');
    this.loadingContainer.classList.add('clearpoll-loading-overlay')
    this.loadingContainer.appendChild(loadingIndicator);

    this.pollDiv.appendChild(this.loadingContainer);
  }

  closeLoading(){
    this.loadingContainer.style.display = 'none';
    this.iframe.style.display = 'block';
  }

  createIframe(){
    this.iframe = document.createElement('iframe');
    this.iframe.src = this.widgetUrl;
    this.iframe.frameBorder = 0;
    this.iframe.scrolling = "no";
    this.iframe.style.cssText = 'width: 100%; height: 100%; overflow: hidden; display: none;' + (this.pollType != 'standard' ? '' : 'border-radius: 3px;');

    window.addEventListener("message", this.handleIframeMessage.bind(this), false);
  
    this.pollDiv.appendChild(this.iframe);
  }

  refreshPoll(){
    this.loadingContainer.style.display = 'block';

    this.pollDiv.removeChild(this.iframe);
    this.createIframe();
  }

  openLogin(){
    this.loginOverlay = document.createElement('div');
    this.loginOverlay.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:100;background: rgba(0,0,0,0.8); display: flex; justify-content: center; align-items: center;';
    this.loginOverlay.addEventListener("click", () => this.closeLogin());

    let loginIframe = document.createElement('iframe');
    loginIframe.src = this.loginUrl;
    loginIframe.frameBorder = 0;
    loginIframe.scrolling = "no";
    loginIframe.style.cssText = 'width: 670px; height: 550px; overflow: hidden; opacity: 1;';
    this.loginOverlay.appendChild(loginIframe);

    document.body.appendChild(this.loginOverlay);
  }

  closeLogin(){
    if(!this.loginOverlay) return;

    document.body.removeChild(this.loginOverlay);
  }

  handleIframeMessage(messageEvent){
    let data = messageEvent.data;

    console.log(`id=${this.pollId}, event=${data.event}`);

    switch(data.event){
      case 'loadingComplete':
        if(data.pollId != this.pollId) return;
        this.closeLoading();
        break;
      case 'openLogin':
        if(data.pollId != this.pollId) return;
        this.openLogin();
        break;
      case 'loggedIn':
        this.closeLogin();
        this.refreshPoll();
        break;
    }
  }
}

export default WidgetInstance;
