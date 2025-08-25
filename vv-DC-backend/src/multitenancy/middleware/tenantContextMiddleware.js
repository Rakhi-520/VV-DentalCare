import { withTenantContext } from '../plugins/tenantContext.js';

export function tenantContextMiddleware(req, res, next) {
  return withTenantContext(req, res, next);
}