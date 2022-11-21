const db = require("../../models")
const ROLES = db.ROLES
const User = db.user

checkDublicateUser = (res, req, next) => {
    User.findOne({
        where: {
            name: req.body.name
        }
    }).then(user => {
        if(user) {
            res.status(400).send({
                message: "Failed! User is already created!" + req.body.roles[i]
            });
            return;
        }
        next();
    })
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          res.status(400).send({
            message: "Failed! Role does not exist = " + req.body.roles[i]
          });
          return;
        }
      }
    }
    
    next();
  };

  const verifySignUp = {
    checkDublicateUser: checkDublicateUser,
    checkRolesExisted: checkRolesExisted
  };
  
  module.exports = verifySignUp;