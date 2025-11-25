import React from "react";
import { QueryClient } from "@tanstack/react-query";
import {
  PersistQueryClientProvider,
  type PersistQueryClientProviderProps,
} from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { RNStorage } from "./supabase";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // NOTE
      // refetchOnWindowFocus breaks some UIs (like feeds)
      // so we only selectively want to enable this
      // -prf
      refetchOnWindowFocus: false,
      // Structural sharing between responses makes it impossible to rely on
      // "first seen" timestamps on objects to determine if they're fresh.
      // Disable this optimization so that we can rely on "first seen" timestamps.
      structuralSharing: false,
      // We don't want to retry queries by default, because in most cases we
      // want to fail early and show a response to the user. There are
      // exceptions, and those can be made on a per-query basis. For others, we
      // should give users controls to retry.
      retry: false,
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
    mutations: {
      retry: false,
    },
  },
});

const dehydrateOptions: PersistQueryClientProviderProps["persistOptions"]["dehydrateOptions"] =
  {
    shouldDehydrateMutation: (_: any) => false,
    shouldDehydrateQuery: (query) => {
      return true;
    },
  };
export const clientPersister = createAsyncStoragePersister({
  storage: RNStorage,
});

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister: clientPersister, dehydrateOptions }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
