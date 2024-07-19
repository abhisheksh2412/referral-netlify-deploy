export const RemoveSpaces = (role = "Project Manager") => {
  const newRole = role?.split(" ");
  let roleString;
  if (role.length > 1) {
    roleString =
      newRole.join("-").charAt(0).toUpperCase() +
      newRole.join("-").slice(1).toLowerCase();
  } else {
    roleString =
      role.charAt(0).toUpperCase() + role.join("-").slice(1).toLowerCase();
  }
  return roleString;
};
