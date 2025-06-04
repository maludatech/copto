import { connectToDb } from "@/lib/database";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    // Connect to database
    await connectToDb();

    // Parse request body
    const { walletAddress } = await req.json();

    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required to sign in" },
        { status: 400 }
      );
    }

    // Basic wallet address validation (e.g., Ethereum address format)
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      return NextResponse.json(
        { error: "Invalid wallet address format" },
        { status: 400 }
      );
    }

    // Check if user already exists
    let user = await User.findOne({
      walletAddress: walletAddress.toLowerCase(),
    });

    if (!user) {
      // Create new user if doesn't exist
      user = await User.create({
        walletAddress: walletAddress.toLowerCase(), // Store in lowercase for consistency
      });
    }

    return NextResponse.json(
      { message: "User signed in successfully", user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during sign-in:", error);
    return NextResponse.json(
      { error: "Failed to sign in: Internal server error" },
      { status: 500 }
    );
  }
};
