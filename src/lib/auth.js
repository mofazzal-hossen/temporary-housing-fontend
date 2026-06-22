import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const rawUri = process.env.MONGO_DB_URI;
const uri = typeof rawUri === 'string' ? rawUri.replace(/^"(.*)"$/, '$1') : undefined;
if (!uri) {
  throw new Error('MONGO_DB_URI is required and must be set in the project root .env file');
}
const client = new MongoClient(uri);
const db = client.db(process.env.AUTH_DB_NAME || 'temporary-housing');
console.log(process.env.MONGO_DB_URI, process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,

  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_SECRET_ID,

    },
  },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client
  }),
  user: {
    additionalFields: {
      role: {
        default: "Tenant",

      },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 60 * 60 * 24 * 30,
    }
  },
  plugins: [
    jwt()
  ]
});