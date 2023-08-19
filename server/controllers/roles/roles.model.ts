export type RoleNames = 'USER' | 'ADMIN';

export interface Role {
  id: number;
  name: string;
}

export interface RoleController {
  findRole: (roleName: RoleNames) => Promise<Role>;
}
