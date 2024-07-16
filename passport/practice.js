const allRoles = {
    user: [],
    admin: ['getUsers', 'manageUsers'],
  };
  
  const roles = Object.keys(allRoles);

  console.log(Object.entries(allRoles));


  const roleRights = new Map(Object.entries(allRoles));
  
//   console.log("roles", roles);
  console.log("roleRights",roleRights)