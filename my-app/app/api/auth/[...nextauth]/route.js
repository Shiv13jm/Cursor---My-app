import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client (with safety check)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

const handler = NextAuth({
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    // GitHub OAuth Provider
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    // Email/Password Credentials Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password || !supabase) {
          return null;
        }

        // Check user in Supabase
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .single();

        if (error || !user) {
          // User doesn't exist, you could create them here or return null
          return null;
        }

        // In production, you should hash and compare passwords properly
        // This is a simple example - use bcrypt in production!
        if (user.password === credentials.password) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Store user in Supabase when they sign in
      if (!supabase) {
        console.warn("Supabase not configured - skipping user storage");
        return true;
      }
      try {
        const { data: existingUser } = await supabase
          .from("users")
          .select("*")
          .eq("email", user.email)
          .single();

        if (!existingUser) {
          // Create new user
          const { error } = await supabase.from("users").insert([
            {
              email: user.email,
              name: user.name || profile?.name || user.email?.split("@")[0],
              image: user.image || profile?.picture || profile?.avatar_url,
              provider: account?.provider || "credentials",
              provider_id: account?.providerAccountId || null,
              created_at: new Date().toISOString(),
              last_login: new Date().toISOString(),
            },
          ]);

          if (error) {
            console.error("Error creating user:", error);
          }
        } else {
          // Update last login
          await supabase
            .from("users")
            .update({ 
              last_login: new Date().toISOString(),
              name: user.name || existingUser.name,
              image: user.image || existingUser.image,
            })
            .eq("email", user.email);
        }
      } catch (err) {
        console.error("Error in signIn callback:", err);
      }

      return true;
    },
    async session({ session, token }) {
      // Add user id to session
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

