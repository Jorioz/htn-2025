import clientPromise from "../../../../lib/mongodb.js";
import { ObjectId } from "mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("charging");
  const chargers = await db.collection("chargers").find({}).toArray();
  return Response.json(chargers);
}

export async function POST(request) {
  const client = await clientPromise;
  const db = client.db("charging");
  const body = await request.json();

  if (body.action === "updateSession") {
    const { chargerId, available, customerId } = body;
    await db.collection("chargers").updateOne(
      { _id: new ObjectId(chargerId) },
      { $set: { available, customerId } }
    );
    return Response.json({ success: true });
  }
  return Response.json({ error: "Invalid action" }, { status: 400 });
}
