import mongoose from 'mongoose';
import { getTenantContext } from './tenantContext.js';

export function tenantPlugin(schema, options = {}) {
  // Ensure tenantId exists on the schema
  if (!schema.path('tenantId')) {
    schema.add({
      tenantId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true, ref: 'Tenant' },
    });
  }

  // Guard writes to include tenantId
  schema.pre(['save', 'validate'], function(next) {
    const { tenantId } = getTenantContext();
    if (tenantId && !this.tenantId) {
      this.tenantId = tenantId;
    }
    if (!this.tenantId) {
      return next(new Error('tenantId is required'));
    }
    next();
  });

  const injectTenantFilter = function() {
    const { tenantId } = getTenantContext();
    if (tenantId) {
      // Only add filter if not already present
      const filter = this.getFilter();
      if (!('tenantId' in filter)) {
        this.where({ tenantId });
      }
    }
  };

  schema.pre('find', injectTenantFilter);
  schema.pre('findOne', injectTenantFilter);
  schema.pre('count', injectTenantFilter);
  schema.pre('countDocuments', injectTenantFilter);
  schema.pre('findOneAndUpdate', injectTenantFilter);
  schema.pre('updateMany', injectTenantFilter);
  schema.pre('updateOne', injectTenantFilter);
  schema.pre('aggregate', function() {
    const { tenantId } = getTenantContext();
    if (tenantId) {
      this.pipeline().unshift({ $match: { tenantId } });
    }
  });
}