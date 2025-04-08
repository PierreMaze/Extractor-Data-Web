// app/src/features/auth/auth.config.js

import config from "../../config/app.config.js";

export const AuthConfig = {
  user: config.auth.user,
  password: config.auth.password,
  loginUrl: config.urls.loginUrl,
};
