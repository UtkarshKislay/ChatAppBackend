
import mongoose from "mongoose";

const dbName = "chatApp";
const userName = 'utkarsh2237';
const password = '4lKVSUT2f6ScG6lq';
const ConnectDB = async () => {
    try {
        const conn = await mongoose.connect(
            `mongodb+srv://${userName}:${password}@cluster1.9yqmnpn.mongodb.net/${dbName}
        ?retryWrites=true&w=majority`,
            {
                // useNewUrlParser:true,
                // useUnifiedTopology:true
            });
        console.log(conn.connection.host);
        return conn;
    } catch (err) {
        console.log(err);
        throw err;
    }
}


export default ConnectDB;