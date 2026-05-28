"use client";

import { useAuth } from "@/src/providers/AuthProvider";

export const useUser = () => {
  const { user, accessToken } = useAuth();

  // Return the data directly from the context memory cache.
  // No useEffect, no fetch calls, no async code!
  return {
    user, // Contains: id, email, firstName, lastName, etc.
    isAuthenticated: !!accessToken,
  };
};