import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeCookie: {
    name: "BUILD_ROOM_LOCALE",
    sameSite: "lax",
  },
});

export type AppLocale = (typeof routing.locales)[number];
