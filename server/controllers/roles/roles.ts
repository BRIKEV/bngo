import { RoleController, RoleNames } from './roles.model';

const start = (): RoleController => {
  const findRole = async (roleName: RoleNames) => {
    return Promise.resolve({
      id: 1,
      name: 'RoleNames',
    })
  };

  return { findRole };
};

export default start;
