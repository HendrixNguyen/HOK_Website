
require("dotenv").config()

export function Db_config() {
    HOST: process.env.DB_HOST;
    USERNAME: process.env.DB_USERNAME_DEV;
    PASSWORD: process.env.DB_PASSWORD_DEV;
    DB: process.env.DB_NAME
};

