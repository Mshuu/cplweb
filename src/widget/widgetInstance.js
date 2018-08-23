class WidgetInstance {
  constructor(pollDiv){
    this.pollDiv = pollDiv;

    this.initialize();
  }

  get pollId(){
    return this.pollDiv.attributes['data-clearpoll-pollid'].value;
  }

  get widgetUrl(){
    return `${SERVER_BASE_URL}/poll/${this.pollId}/widget`;
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
    this.iframe.style.width = "100%";
    this.iframe.style.height = "100%";
    this.iframe.style.overflow = "hidden";
    this.iframe.style.display = 'none';

    window.addEventListener("message", this.handleIframeMessage.bind(this), false);
    this.pollDiv.appendChild(this.iframe);

  }

  handleIframeMessage(messageEvent){
    let originFullUrl = messageEvent.source.location.href;

    if(originFullUrl != this.widgetUrl) return;

    let data = messageEvent.data;

    switch(data.event){
      case 'loadingComplete':
        this.closeLoading();
        break;

    }
  }
}

export default WidgetInstance;
