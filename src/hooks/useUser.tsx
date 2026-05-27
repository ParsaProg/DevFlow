"use client";

import { useAuth } from "../providers/AuthProvider";

export const useUser = () => {
  const { user, accessToken, loading } = useAuth();

  if (loading) {
    return { user: null, isAuthenticated: false, isResolving: true };
  }

  return {
    user, // Contains: id, email, firstName, lastName, avatarUrl
    isAuthenticated: !!accessToken,
    isResolving: false,
  };
};
