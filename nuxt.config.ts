// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  ssr: false,
  app: {
    head: {
      title: "Список задач",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
    },
  },
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxt/icon", "@nuxtjs/google-fonts"],
  css: ["~/assets/css/main.scss"],
  colorMode: {
    preference: "light",
  },
  googleFonts: {
    families: {
      Manrope: [400, 500, 600],
    },
  },
});
