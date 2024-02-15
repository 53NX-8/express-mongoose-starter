import { cleanEnv, port, str } from "envalid";

function validateEnv() {
    cleanEnv(process.env, {
        DATABASE_URL: str(),
        PORT: port(),
        NODE_ENV: str(),
        CLIENT_URL: str(),
    });
}

export default validateEnv;