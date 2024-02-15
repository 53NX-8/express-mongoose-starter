import config from "config";
import mongoose from "mongoose";

const connect = async () => {
    const url = config.get<number>("db_url");
    try {
        const c = await mongoose.connect(`${url}`)
        console.log(
            "🔧 Connection established", c.connection.name
        );
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connect;