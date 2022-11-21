const db = require("../../models")
const config = require("../../config/auth.config")
const User = db.user
const Role = db.role
const Task = db.task

const Op = db.Sequelize.Op

let jwt = require("jsonwebtoken")
let bcypt = require("bcryptjs")

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.createManager = (req, res) => {
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles([2]).then(() => {
            res.status(200).send({ message: "Manager was created successfully!" });
          });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.createCollaborator = (req, res) => {
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles([3]).then(() => {
            res.status(200).send({ message: "Collaborator was created successfully!" });
          });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

exports.createTask = (req, res) => {
  Task.create({
    description: req.body.description,
    type: req.body.type,
    status: req.body.status,
    weight: req.body.weight,
    time: req.body.time,
    assign: req.body.assign,
    creator: req.body.creator,
    title: req.body.title
  })
}
  