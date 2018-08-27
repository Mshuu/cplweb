import ClearpollApi from './webApi';
import moment from 'moment';

function numberToCommaFormat(num){
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class Poll {
  constructor(params){
    Object.assign(this, params);
  }

  get timeRemaining(){
    let now = moment();
    let endTime = moment(1000*this.pollTime);
    let duration = moment.duration(endTime.diff(now));

    if(duration.get('days') > 0)
      return `${ duration.get('days') }D ${ duration.get('hours') }H`;
    else //if(duration.get('hours') > 0)
      return `${ duration.get('hours') }:${ duration.get('minutes') < 10 ? '0' + duration.get('minutes') : duration.get('minutes') }`;
  }

  get hasExpired(){
    let now = moment();
    let endTime = moment(1000*this.pollTime);

    return endTime <= now;
  }

  get votes(){
    return numberToCommaFormat(this.pollVotes);
  }
}

export default Poll;
