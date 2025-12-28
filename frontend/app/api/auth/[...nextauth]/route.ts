
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    // ✅ Quand l'utilisateur se connecte, on enregistre ou met à jour le profil dans MongoDB
    async signIn({ user }) {
      try {
        await fetch("https://digicr-backend.onrender.com/api/users/google-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            image: user.image,
          }),
        });
        return true;
      } catch (error) {
        console.error("❌ Erreur d'enregistrement de l'utilisateur :", error);
        return false;
      }
    },

    // ✅ Ajout des infos utilisateur à la session
    async session({ session }) {
      try {
        const res = await fetch(`https://digicr-backend.onrender.com/api/users/by-email/${session.user?.email}`);
        const data = await res.json();
        session.user._id = data._id; // on stocke l'id Mongo
        session.user.isPremium = data.isPremium;
      } catch (error) {
        console.error("⚠️ Impossible de récupérer le user :", error);
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };


