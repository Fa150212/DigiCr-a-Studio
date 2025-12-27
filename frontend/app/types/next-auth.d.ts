import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      isPremium?: boolean;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
