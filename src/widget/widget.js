import WidgetInstance from './widgetInstance';
import EmbeddedCss from './embeddedCss';

class WidgetLoader {
  constructor(){
    this.pollWidgets = [];

    this.addLoadingStyle();
    this.findAndInitialize();
  }

  findAndInitialize(){
    document.querySelectorAll('[data-clearpoll-pollId]').forEach(pollDiv => {
      this.pollWidgets.push(
        new WidgetInstance(pollDiv)
      );
    });
  }

  addLoadingStyle(){
    let head = document.head || document.getElementsByTagName('head')[0];
    let style = document.createElement('style');
    let css = EmbeddedCss;

    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));

    head.appendChild(style);
  }
}


window.ClearpollWidget = new WidgetLoader();
