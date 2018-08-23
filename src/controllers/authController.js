import Authenticator from '../models/authenticator';

export default async ( req, res ) => {
  console.dir(req.cookies);

  try {
    let token = await Authenticator.login(req.body.username, req.body.desktopCode);

    res.cookie('_auth', token);
    res.send({ success: true });

  } catch(e){
    res.cookie('_auth', '');
    res.send({ success: false });  
  }
};
