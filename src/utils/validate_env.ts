import { cleanEnv, port, str } from "envalid";

function validateEnv() {
    //   process.env["NODE_CONFIG_DIR"] = __dirname;
    cleanEnv(process.env, {
        DATABASE_URL: str(),
        PORT: port(),
        NODE_ENV: str(),
        CLIENT_URL: str(),
    });
}

export default validateEnv;