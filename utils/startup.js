import Role from "../models/Role.js";
import RoleServes from "../services/role.service.js";
import bcrypt from "bcrypt";
import env from "../config/env.js";
import usersService from "../services/users.service.js";
import roleService from "../services/role.service.js";
// import ownerService from "../services/ownerService.js";

const seedOwnerRole = async () => {
  const ownerRole = await Role.findOne({ roleName: "owner" });
  if (!ownerRole) {
    await RoleServes.createRole({
      roleName: "owner",
      description: "Owner Role",
      fullAccess: true,
    });
    console.log("Seeded: owner role created");
  }
};

const seedUserRole = async () => {
  const userRole = await Role.findOne({ roleName: "user" });
  if (!userRole) {
    await RoleServes.createRole({
      roleName: "user",
      description: "user Role",
      fullAccess: false,
    });
    console.log("Seeded: user role created");
  }
};

const seedDefaultOwner = async () => {
  const ownerRole = await RoleServes.getRole({roleName:"owner"})
  const ownerAccount = await usersService.getUser({role:ownerRole.id});
  if (!ownerAccount) {
    const ownerRoleDoc = await RoleServes.getRole({ roleName: "owner" });
    if (!ownerRoleDoc) throw new Error("Owner role not found during seeding");

    const hashedPassword = await bcrypt.hash(env.owner.password, 10);
    await usersService.createUser({
      fullName: "owner",
      email: env.owner.email,
      password: hashedPassword,
      default: true,
      role: ownerRoleDoc._id,
    });
    console.log("Seeded: default owner account created");
  }
};

export default async () => {
  await seedOwnerRole();
  await seedUserRole();
  await seedDefaultOwner();
};
