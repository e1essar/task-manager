const { authJwt } = require("../middleware");
const userController = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/test/getmanagerstasks",
    [authJwt.verifyToken, authJwt.isManager],
    userController.getManagerTasks
  );

  app.get(
    "/api/test/getcollaboratortasks",
    [authJwt.verifyToken, authJwt.isCollaborator],
    userController.getCollaboratorTasks
  );

};