export type Action = 'create' | 'read' | 'delete' | 'update';
export type Possession = 'any' | 'own';

export type AccessControlResource = {
  [Key in `${Action}:${Possession}`]?: string[];
};

export type AccessControlPermissions<R extends string> = {
  [K in R]: AccessControlResource | any;
};
