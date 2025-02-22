import connectToDatabase from "../../lib/db";
import Donation from "../../models/Donation";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  await connectToDatabase();

  const { amount, type, userId, campaignId, instituteId } = req.body;

  try {
    const donation = new Donation({
      amount: parseInt(amount),
      type,
      userId,
      campaignId: campaignId || null,
      instituteId: instituteId || null,
    });
    await donation.save();
    res.status(201).json({ message: "Donation created", id: donation._id });
  } catch (error) {
    res.status(500).json({ error: "Failed to create donation" });
  }
}