import { isString } from '@daria/shared';
import type { RouteNamedMap } from 'vue-router/auto/routes';

type RouteName = keyof RouteNamedMap & {};

export const useAuthGuard = () => {
  const router = useRouter();

  const isAuthenticated = useIsAuthenticated();

  const getRedirectUrl = (
    needsAuth: boolean,
    currentPath: string,
    from: any
  ): { name: RouteName; query?: any } | string | undefined => {
    const isAuth = isAuthenticated.value;
    if (needsAuth && !isAuth) {
      return {
        name: 'Login',
        query: { from: encodeURIComponent(currentPath) }
      };
    }

    if (!needsAuth && isAuth) {
      if (isString(from)) return decodeURIComponent(from);
      return {
        name: 'Home'
      };
    }
  };

  router.beforeEach((to, from, next) => {
    const redirectUrl = getRedirectUrl(!!to.meta.needsAuth, to.fullPath, from.query.from);

    if (redirectUrl) return next(redirectUrl);

    return next();
  });

  router.isReady().then(() => {
    const redirectUrl = getRedirectUrl(
      !!router.currentRoute.value.meta.needsAuth,
      router.currentRoute.value.fullPath,
      router.currentRoute.value.query.from
    );

    if (redirectUrl) router.push(redirectUrl as any);
  });
};
