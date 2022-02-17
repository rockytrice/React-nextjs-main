import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { statelessSessions, withItemData } from '@keystone-next/keystone/session';

import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { User } from './schemas/User';
import { insertSeedData } from './seed-data';

import 'dotenv/config';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long should they stay signed in?
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
    // Todo add in inital roles here
  },
});

export default withAuth(
  config({
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
      async onConnect(keystone) {
        console.log('connected to the database!');
        // once connected to database inject all of these items straight away
        // only insert this data if we run npm run seed-data
        if (process.argv.includes('--seed-data')) {
          await insertSeedData(keystone);
        }
      },
    },
    lists: createSchema({
      // Schema items go here
      User,
      Product,
      ProductImage,
    }),
    ui: {
      // Show the UI only for people who pass this test
      isAccessAllowed: ({ session }) =>
        // console.log(session);
        !!session?.data,
    },
    // TODO add session values here
    session: withItemData(statelessSessions(sessionConfig), {
      // this will pass the id and any other data that we query along with every session. Anytime we want to access the sesion we will have access to the user's name,email,ID etc.
      User: 'id name email',
    }),
  })
);
