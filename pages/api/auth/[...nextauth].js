import NextAuth from "next-auth";
import { getSession } from "next-auth/client";
import Providers from "next-auth/providers";
import { getUserFavs, getUserId } from "../../../lib/getUserInfo";

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  // A database is optional, but required to persist accounts in a database
  database: {
    type: "postgres",
    host: process.env.HOST,
    port: process.env.PORT,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DB,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
  callbacks: {
    session: async (session, user) => {
      // console.log(session);
      if (!session.user.id || !session.user.favorites) {
        const { id } = await getUserId(user.email);
        const { favorite_list } = await getUserFavs(await id);

        session.user.id = await id;
        session.user.favorites = await favorite_list.favorites;
      }

      return Promise.resolve(session);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
