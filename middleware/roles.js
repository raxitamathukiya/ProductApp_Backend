function roles(role) {
    return (req, res, next) => {
        const user=req.session.user;
        console.log(user)
      if (user && user.role === role) {
        next(); 
      } else {
        res.status(403).send('Access denied'); 
      }
    };
  }

  module.exports=roles;