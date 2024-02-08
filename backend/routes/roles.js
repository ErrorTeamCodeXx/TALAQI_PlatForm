const express = require("express");
const { createNewRole, createNewPermission,createNewRolePermission } = require("../controllers/roles");
// Create roles router
const roleRouter = express.Router();

roleRouter.post("/", createNewRole);
roleRouter.post("/permission", createNewPermission);
roleRouter.post("/role_permission", createNewRolePermission);

module.exports = roleRouter;