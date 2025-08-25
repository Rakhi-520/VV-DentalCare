
# Multi-Tenant Upgrade Scaffold (Row-Level Tenancy)

**Important:** The backend code you provided has multiple truncated files (containing literal `...`),
so it cannot run as-is. I have added a *non-breaking* multi-tenant scaffold that does **not** change
your frontend UI/UX. When you provide the complete backend source, this scaffold will enforce
row-level isolation and unlock SuperAdmin vs ClinicAdmin.

## What I added

- `src/multitenancy/plugins/tenantContext.js` — per-request context using `AsyncLocalStorage`.
- `src/multitenancy/plugins/tenantPlugin.js` — global Mongoose plugin that:
  - ensures every schema has `tenantId`,
  - auto-injects `{ tenantId }` into all queries and aggregates,
  - enforces `tenantId` on writes.
- `src/multitenancy/middleware/tenantResolver.js` — resolves tenant by subdomain (`slug.baseDomain`) **or** by URL prefix `/t/:slug/*`.
- `src/multitenancy/middleware/tenantContextMiddleware.js` — wires request to the tenant context.
- `src/multitenancy/models/Tenant.js` and `src/multitenancy/models/User.js` — new models for tenants and multi-role users.
- `src/routes/superadmin.routes.js` — minimal tenant management API (SuperAdmin only).
- `src/cli/tenant-cli.js` — create a clinic tenant and its admin user.

## How to wire this into your app

1. **Apply global plugin** right after connecting Mongoose (in `src/index.js` or `src/db/connect.js`):

   ```js
   import mongoose from 'mongoose';
   import { tenantPlugin } from './multitenancy/plugins/tenantPlugin.js';
   mongoose.plugin(tenantPlugin);
   ```

2. **Add resolver + context middleware** in `src/app.js` **before** your protected routes:

   ```js
   import { tenantResolver } from './multitenancy/middleware/tenantResolver.js';
   import { tenantContextMiddleware } from './multitenancy/middleware/tenantContextMiddleware.js';

   app.use(['/api', '/t'], tenantResolver, tenantContextMiddleware);
   ```

   - With this, all `/api/*` and `/t/:slug/*` requests will carry `req.tenantId` and all Mongoose queries will be tenant-scoped automatically.

3. **Role-gate admin APIs** and split SuperAdmin vs ClinicAdmin:

   ```js
   import superAdminRoutes from './routes/superadmin.routes.js';
   import { requireRole } from './multitenancy/middleware/requireRole.js';

   app.use('/api/super', authMiddleware, requireRole('SuperAdmin'), superAdminRoutes);
   ```

4. **Branding & config per tenant:** Put per-tenant theme tokens, logos, and provider keys under `Tenant.branding`/`Tenant.providers`.
   Serve them to the frontend from an endpoint like `/api/public/config` which reads from `req.tenantId`.

5. **Environment:** add to `.env`

   ```bash
   BASE_DOMAIN=yourdomain.com     # enables subdomain-based tenancy
   MULTI_TENANT_MODE=on           # feature flag you can check in code
   ```

6. **Create a tenant for testing:**

   ```bash
   node src/cli/tenant-cli.js create --name "Acme Dental" --slug acme \
     --adminEmail admin@acme.test --adminPassword Passw0rd!
   ```

## Files in your backend that are truncated (need full source)

- `src/app.js`
- `src/index.js`
- `src/models/Admin.js`
- `src/models/Doctor.js`
- `src/models/Appointment.js`
- `src/controllers/appointment.controller.js`

These contain literal `...` markers and prevent the project from building. Once you provide the complete files,
the multi-tenant layer here will work without changing your UI.

## Zero UI/UX Changes

No frontend files were modified. The scaffolding only affects backend isolation, roles, and tenant management.

## Optional next steps

- Audit logging model, S3/GCS signed uploads, background job queue, per-tenant email/SMS/payment providers.
- Docker Compose for local Mongo + API + Frontend.
- E2E tests for booking flow.
