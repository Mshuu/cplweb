import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import'./Menu.css';

class Menu extends Component {
  constructor(props){
    super(props);
    this.state = { active: false };
  }

  toggleMenu(visibility){
    this.setState({ active: visibility });
  }

  openUrl(url){
    this.setState({ active: false });
    this.props.history.push(url);
  }

  openExternalUrl(url){
    window.location = url;
  }

  render() {
    return (
      <div className="menuContainer" onMouseOver={() => this.toggleMenu(true)} onMouseOut={() => this.toggleMenu(false)}>
        <img src={ require("../images/menu_icon.png") } />

        <div className={ this.state.active ? "menu" : "menu inactive" }>
          <div onClick={() => this.openUrl('/browse')}>
            <img src={ require('../images/menuIcons/vote_icon.png') } />
            Vote
          </div>
          <div onClick={() => this.openUrl('/createWidget')}>
            <img src={ require('../images/menuIcons/create_icon.png') } />
            Create Widgets
          </div>
          <div onClick={() => this.openUrl('/completed')}>
            <img src={ require('../images/menuIcons/completed_icon.png') } />
            View Completed Polls
          </div>
          <div onClick={() => this.openUrl('/social')}>
            <img src={ require('../images/menuIcons/social_icon.png') } />
            Social
          </div>
          <div onClick={() => this.openUrl('/rewards')}>
            <img src={ require('../images/menuIcons/rewards_icon.png') } />
            Rewards
          </div>
          <div onClick={() => this.openUrl('/myVotes')}>
            <img src={ require('../images/menuIcons/myvotes_icon.png') } />
            My Votes
          </div>
          <div onClick={() => this.openUrl('/myPolls')}>
            <img src={ require('../images/menuIcons/mypolls_icon.png') } />
            My Polls
          </div>
          <div onClick={() => this.openUrl('/starPolls')}>
            <img src={ require('../images/menuIcons/star_icon.png') } />
            Star Polls
          </div>
          <div onClick={() => this.openUrl('/account')}>
            <img src={ require('../images/menuIcons/account_icon.png') } />
            Account & Settings
          </div>
          <div onClick={() => this.openExternalUrl('https://clearpoll.com/faq/')}>
            <img src={ require('../images/menuIcons/support_icon.png') } />
            FAQ & Support
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Menu);
