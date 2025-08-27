import { useEffect, useState, createContext, useContext } from "react";
import { useSession, useUser } from "@clerk/nextjs";
import { createClerkSupabaseClient } from "@/utils/supabase";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // The `useUser()` hook will be used to ensure that Clerk has loaded data about the logged in user
  const { user, isLoaded: userLoaded } = useUser();
  // The `useSession()` hook will be used to get the Clerk session object
  const { session, isLoaded: sessionLoaded } = useSession();

  // console.log(user);
  // console.log(session);
  const { getToken } = session;

  const client = createClerkSupabaseClient(getToken);

  useEffect(() => {
    if (!userLoaded || !sessionLoaded || !user || !session) {
      console.log("Not ready:", {
        userLoaded,
        sessionLoaded,
        user: !!user,
        session: !!session,
      });
      return;
    }

    async function loadUsers() {
      setLoading(true);
      setError(null);

      try {
        if (!client) {
          throw new Error("Failed to create Supabase client");
        }

        // UPDATED: Get token without template parameter
        const token = session?.getToken();
        console.log("Token:", token ? "Present" : "Missing");

        const { data, error } = await client.from("clerk_users").select();

        if (error) {
          console.error("Supabase error:", error);
          setError(`Failed to load users: ${error.message}`);
        } else {
          console.log("Users loaded:", data);
          setUsers(data || []);
        }
      } catch (err) {
        console.error("Load users error:", err);
        setError(
          `Failed to load users: ${
            err instanceof Error ? err.message : "Unknown error"
          }`
        );
      }

      setLoading(false);
    }

    loadUsers();
  }, [user, userLoaded, sessionLoaded, session]);

  async function createUser(e) {
    // e.preventDefault();

    // if (!e.target.username.trim()) {
    //   setError("User name is required");
    //   return;
    // }

    if (!session) {
      setError("No active session");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (!client) {
        throw new Error("Failed to create Supabase client");
      }

      // UPDATED: Get token without template parameter
      const token = await session.getToken();
      console.log("Creating task with token:", token ? "Present" : "Missing");

      const { data, error } = await client
        .from("clerk_users")
        .insert({
          username: user.username.trim(),
          first_name: user.first_name.trim(),
          last_name: user.last_name.trim(),
          profile_image_url: user.profile_image_url,
          password_enabled: user.password_enabled,
          two_factor_enabled: user.two_factor_enabled,
          email_address: user.email_addresses[0]?.email_address,
          email_verified:
            user.email_addresses[0]?.verification?.status === "verified",
          phone_numbers: user.phone_numbers,
          password_last_updated_at: user.password_last_updated_at,
          last_sign_in_at: user.last_sign_in_at,
          banned: user.banned,
          locked: user.locked,
          verification_attempts_remaining: user.verification_attempts_remaining,
          created_at: user.created_at,
          updated_at: user.updated_at,
          last_active_at: user.last_active_at,
        })
        .select();

      if (error) {
        console.error("Insert error:", error);
        setError(`Failed to create user: ${error.message}`);
      } else {
        console.log("User created:", data);
        // Update state directly instead of reloading
        if (data && data.length > 0) {
          setUsers((prev) => [...prev, ...data]);
        }
      }
    } catch (err) {
      console.error("Create user error:", err);
      setError(
        `Failed to create user: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    }

    setLoading(false);
  }

  return (
    <UserContext.Provider
      value={{
        userLoaded,
        session,
        sessionLoaded,
        client,
        users,
        createUser,
        error,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
};
