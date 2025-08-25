import { AsyncLocalStorage } from 'async_hooks';

export const tenantStorage = new AsyncLocalStorage();

export function withTenantContext(req, res, next) {
  const ctx = { tenantId: req.tenantId || null, actorId: req.user?._id || null };
  tenantStorage.run(ctx, () => next());
}

export function getTenantContext() {
  return tenantStorage.getStore() || { tenantId: null, actorId: null };
}