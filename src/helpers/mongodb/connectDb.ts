/* eslint-disable node/prefer-global/process */
/* eslint-disable import/no-mutable-exports */
import mongoose from "mongoose";

export let client: mongoose.Connection | null = null;

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

async function connectToDb() {
    if (client) return { client };
    if (!DB_CONNECTION_STRING) throw new Error("DB_CONNECTION_STRING is not defined");

    await mongoose.connect(DB_CONNECTION_STRING);
    // Use web db
    client = mongoose.connection;

    return { client };
}

export default connectToDb;
