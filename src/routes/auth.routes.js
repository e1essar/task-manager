const { verifySignUp, authJwt } = require("../middleware")
const controller = require("../controllers/auth.controller")

module.exports = function(app) {
  
    app.post(
        "/api/auth/createmanager",
        [
            verifySignUp.checkDuplicateUser,
            verifySignUp.checkRolesExisted,
            authJwt.verifyToken,
            authJwt.isAdmin
        ],
        controller.createManager
    )

    app.post(
        "/api/auth/createcollaborator",
        [
            verifySignUp.checkDuplicateUser,
            verifySignUp.checkRolesExisted,
            authJwt.verifyToken,
            authJwt.isManager
        ],
        controller.createCollaborator
    )

    app.post(
        "/api/auth/createtask",
        [
            authJwt.verifyToken,
            authJwt.isManager
        ],
        controller.createTask
    )

    app.post("/api/auth/signin", controller.signin);
}