#!/usr/bin/env node
import mongoose from 'mongoose';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import Tenant from '../multitenancy/models/Tenant.js';
import User from '../multitenancy/models/User.js';

const argv = yargs(hideBin(process.argv))
  .command('create', 'Create a tenant', y => y
    .option('name', { type: 'string', demandOption: true })
    .option('slug', { type: 'string', demandOption: true })
    .option('adminEmail', { type: 'string', demandOption: true })
    .option('adminPassword', { type: 'string', demandOption: true })
  )
  .help().argv;

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vv-dental';

async function main() {
  await mongoose.connect(MONGO_URI);
  const { name, slug, adminEmail, adminPassword } = argv;
  const t = await Tenant.create({ name, slug });
  const u = new User({ email: adminEmail, roles: ['ClinicAdmin'], tenantId: t._id });
  await u.setPassword(adminPassword);
  await u.save();
  console.log('Created tenant', { id: t._id.toString(), slug: t.slug });
  await mongoose.disconnect();
}

main().catch(err => { console.error(err); process.exit(1); });