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

  return (
    <UserContext.Provider
      value={{
        userLoaded,
        session,
        sessionLoaded,
        client,
        users,
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
