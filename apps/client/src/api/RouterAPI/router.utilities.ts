import { Access } from '@api/RouterAPI/router.types';
import store from '@store/store';

export const isRouteAccessible = (access: Access): boolean => {
  const accessCheck: Record<Access, () => boolean> = {
    [Access.PUBLIC]: () => true,
    [Access.UNAUTHORIZED]: () => store.getState().authStatus === false,
    [Access.AUTHORIZED]: () => store.getState().authStatus === true,
  };

  return accessCheck[access]();
};
