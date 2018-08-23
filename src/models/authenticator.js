import ClearpollApi from './serverApi';
import jwt from 'jsonwebtoken';

import settings from '../../settings.json';

class Authenticator {
  static async login(username, desktopCode){
    let params = {
      function: 'DesktopSignup',
      username,
      desktopCode
    }

    let response = await ClearpollApi.request(params);

    if(!response.success) throw new Error('Invalid Auth');

    return jwt.sign({
      phoneNumber: response.phoneNumber,
      userId: response.userId,
      code: response.code
    }, settings.signingKey);
  }

  static verify(cookieString){
    let auth = jwt.verify(cookieString, settings.signingKey);

    return {
      phoneNumber: auth.phoneNumber,
      userId: auth.userId,
      code: auth.code
    }
  }
}


export default Authenticator;
