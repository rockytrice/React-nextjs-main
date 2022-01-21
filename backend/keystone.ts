import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { User } from './schemas/User';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long should they stay signed in?
  secret: process.env.COOKIE_SECRET,
};

export default config({
  // boiler plate
  server: {
    cors: {
      orgin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    // TODO: Add data seeding here
  },
  lists: createSchema({
    // Schema items go here
    User,
  }),
  ui: {
    // TODO change this for role
    isAccessAllowed: () => true,
  },
  // TODO add session values here
});
