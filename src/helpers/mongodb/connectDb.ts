/* eslint-disable node/prefer-global/process */
/* eslint-disable import/no-mutable-exports */
import mongoose from "mongoose";

export let client: mongoose.Connection | null = null;
export let mongooseInstance: typeof mongoose | null = null;

const MONGOB_URI = process.env.MONGOB_URI;

async function connectToDb() {
    if (client) return { client };
    if (!MONGOB_URI) throw new Error("MONGOB_URI is not defined");

    await mongoose.connect(MONGOB_URI);
    // Use web db
    mongooseInstance = mongoose;
    client = mongoose.connection;

    return { client };
}

export default connectToDb;
