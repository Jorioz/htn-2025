import Home from "./home";
import clientPromise from "../../lib/mongodb.js";

export default async function Page() {
  const client = await clientPromise;
  const db = client.db("charging");
  const chargers = await db.collection("chargers").find({}).toArray();
  return <Home chargers={chargers} />;
}