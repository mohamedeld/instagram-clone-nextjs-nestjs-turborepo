import "server-only";
import type { AppRouter } from "@repo/trpc/router";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/react-query";
import { cookies } from "next/headers";

const apiBaseUrl = process.env.API_URL ?? "http://localhost:3002";

export const trpcServer = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${apiBaseUrl}/api/trpc`,
      headers() {
        return {
          cookie: cookies().toString(),
        };
      },
    }),
  ],
});
