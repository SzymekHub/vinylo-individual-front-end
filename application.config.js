export const applicationConfig = {
    ...(import.meta.env.VITE_BACKEND_URL && {
      "backend-server-url": import.meta.env.VITE_BACKEND_URL,
    }),
    ...(import.meta.env.VITE_BACKEND_WS_URL && {
      "backend-server-url-ws": import.meta.env.VITE_BACKEND_WS_URL,
    }),
  };