import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import WebApi from '../../models/webApi';
import LoadingOverlay from '../loadingOverlay/LoadingOverlay';
import HomeHeader from '../common/HomeHeader';

import './CreateWidget.css';

const SERVER_ADDR = SERVER_BASE_URL;

class CreateWidget extends Component {
   constructor(props){
    super(props);

    this.store = props.store;
    this.state = {
      widgetPollId: '',
      ratingPollId: ''
    };
  }

  updateWidgetPollId(event){
    this.setState({widgetPollId: event.target.value.replace(/\D/g, '')});
  }

  updateRatingPollId(event){
    this.setState({ratingPollId: event.target.value.replace(/\D/g, '')});
  }

  get widgetCode(){
    return `<script async charset="utf-8" src="${SERVER_ADDR}/public/widget.js"></script><div style="width: 380px; height: 560px;" data-clearpoll-pollId="${this.state.widgetPollId}"></div>`;
  }

  get ratingWidgetCode(){
    return `<script async charset="utf-8" src="${SERVER_ADDR}/public/widget.js"></script><div style="width: 380px; height: 560px;" data-clearpoll-type="rating" data-clearpoll-pollId="${this.state.ratingPollId}"></div>`;
  }

  selectCode(e){
    let target = e.target || e.srcElement;        
    let range, selection;

    if (document.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(target);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(target);
        selection.removeAllRanges();
        selection.addRange(range);
    }
    e.stopPropagation();
    document.execCommand("copy");
  }

  get createPollWidgetForm(){
    return (
      <div className="widgetFormContainer">
        <div className="header">
          <span>Create a Poll Widget</span>
          <img src={ require('../images/poll_tick_icon.png') } />
        </div>
        <div className="summary">
          Clearpoll polls can be embedded on any website, allowing logged in users to vote on-site and view live results. Poll widgets
          are ideal for news articles or audience interaction.
        </div>

        <div className="description">
          First, create the poll inside ClearPoll App, or find an existing poll you wish to embed. Then enter the Poll ID below.
        </div>

        <div className="form">
          <span>Enter Poll ID:</span>
          <input type="text" value={ this.state.widgetPollId } onChange={ e => this.updateWidgetPollId(e) } />
        </div>

        <pre className="code" onClick={ e => this.selectCode(e) }>{ this.widgetCode }</pre>
        
        <CopyToClipboard text={ this.widgetCode }>
          <div className="copyButton" >Copy</div>
        </CopyToClipboard>


        <div className="footerText">Paste the widget code anywhere in your websites's HTML.</div>

      </div>
    )
  }

  get createRatingsWidgetForm(){
    return (
      <div className="widgetFormContainer">
        <div className="header">
          <span>Create a a Ratings Bar Widget</span>
          <img src={ require('../images/poll_tick_icon.png') } />
        </div>
        <div className="summary">
          Ratings bars allow your website visitors to rate anything out of 10. No Multiple votes or bot votes. Visitors can rate directly on your site, or by searching the ID in the ClearPoll app.
        </div>

        <div className="description">
          First, create the ratings bar poll inside the ClearPoll app. Then enter the Poll Id below.
        </div>

        <div className="form">
          <span>Enter Poll ID:</span>
          <input type="text" value={ this.state.ratingPollId } onChange={ e => this.updateRatingPollId(e) } />
        </div>

        <pre className="code" onClick={ e => this.selectCode(e) }>{ this.ratingWidgetCode }</pre>
        
        <CopyToClipboard text={ this.ratingWidgetCode }>
          <div className="copyButton" >Copy</div>
        </CopyToClipboard>


        <div className="footerText">Paste the widget code anywhere in your websites's HTML.</div>

      </div>
    )
  }

  render() {
    return (
      <div>
        <HomeHeader />

        <div className="createWidget">
          { this.createPollWidgetForm }
          { this.createRatingsWidgetForm }
        </div>
      </div>
    );
  }
}

export default CreateWidget;
