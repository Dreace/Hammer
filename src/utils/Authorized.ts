import RenderAuthorize from '@/components/Authorized';
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-mutable-exports */
let Authorized = RenderAuthorize('guest');

// Reload the rights component
const reloadAuthorized = (authority: string | string[]): void => {
  Authorized = RenderAuthorize(authority);
};

/**
 * hard code
 * block need it。
 */
window.reloadAuthorized = reloadAuthorized;

export { reloadAuthorized };
export default Authorized;
