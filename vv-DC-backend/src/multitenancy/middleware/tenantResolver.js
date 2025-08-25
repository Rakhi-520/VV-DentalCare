import mongoose from 'mongoose';
import Tenant from '../models/Tenant.js';

/**
 * Resolve tenant from subdomain (clinicSlug.yourdomain.com) or URL prefix (/t/:slug/*)
 * and attach req.tenantId + req.tenant.
 */
export async function tenantResolver(req, res, next) {
  try {
    let slug = null;

    // URL prefix strategy
    if (req.path.startsWith('/t/')) {
      const parts = req.path.split('/').filter(Boolean); // ["t", ":slug", ...]
      if (parts.length >= 2) slug = parts[1];
    }

    // Subdomain strategy
    if (!slug) {
      const host = req.headers.host || '';
      const [sub, ...rest] = host.split('.');
      const baseDomain = process.env.BASE_DOMAIN || ''; // e.g., yourdomain.com
      if (baseDomain && host.endsWith(baseDomain) && sub && sub !== 'www' && sub !== baseDomain) {
        slug = sub.toLowerCase();
      }
    }

    // Fallback: x-tenant-id header (admin tools)
    if (!slug && req.headers['x-tenant-slug']) {
      slug = String(req.headers['x-tenant-slug']).toLowerCase();
    }

    if (!slug) {
      return res.status(400).json({ message: 'Tenant not specified' });
    }

    const tenant = await Tenant.findOne({ slug, status: 'active' }).lean();
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found or inactive' });
    }

    req.tenantId = tenant._id;
    req.tenant = tenant;
    return next();
  } catch (err) {
    return next(err);
  }
}