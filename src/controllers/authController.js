import Authenticator from '../models/authenticator';

export default class AuthController {
  static async login( req, res ) {
    try {
      let token = await Authenticator.login(req.body.username, req.body.desktopCode);

      res.cookie('_auth', token);
      res.send({ success: true });

    } catch(e){
      res.clearCookie('_auth');
      res.send({ success: false });  
    }
  }

  static async logout( req, res ) {
    res.clearCookie('_auth');
    res.redirect('/login');
  }
}
