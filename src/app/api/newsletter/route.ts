import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import fs from "fs";
import path from "path";

// Global flag to prevent terminal spam
let isFirestoreOffline = false;
const LOCAL_DB_PATH = path.join(process.cwd(), "src/data/subscribers.json");

// Helper to handle local simulation storage
function saveToLocal(email: string) {
  try {
    let subscribers = [];
    if (fs.existsSync(LOCAL_DB_PATH)) {
      subscribers = JSON.parse(fs.readFileSync(LOCAL_DB_PATH, "utf8"));
    }
    if (!subscribers.includes(email)) {
      subscribers.push(email);
      fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(subscribers, null, 2));
    }
  } catch (e) {
    console.error("Local save failed", e);
  }
}

function checkLocal(email: string) {
  try {
    if (fs.existsSync(LOCAL_DB_PATH)) {
      const subscribers = JSON.parse(fs.readFileSync(LOCAL_DB_PATH, "utf8"));
      return subscribers.includes(email);
    }
  } catch (e) { return false; }
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email identity detected." }, { status: 400 });
    }

    // VARIETY ERROR MESSAGES
    const duplicateMessages = [
      "This email is already registered on our grid.",
      "You've already established a link with this email.",
      "Transmission failed: Email already exists in our local log.",
      "Entry denied. You are already on our list!"
    ];
    const randomError = duplicateMessages[Math.floor(Math.random() * duplicateMessages.length)];

    // 1. IF OFFLINE, USE LOCAL STORAGE IMMEDIATELY
    if (isFirestoreOffline) {
      if (checkLocal(email)) {
        return NextResponse.json({ error: randomError }, { status: 409 });
      }
      saveToLocal(email);
      return NextResponse.json({ success: true, message: "Welcome to the grid! (Synced to Local Log)" });
    }

    // 2. ATTEMPT REAL DATABASE WITH FAST RACE
    try {
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 400));
      const firestoreTask = (async () => {
        const q = query(collection(db, "newsletter"), where("email", "==", email));
        const existing = await getDocs(q);
        if (!existing.empty) return { status: 409 };
        
        await addDoc(collection(db, "newsletter"), {
          email, timestamp: serverTimestamp(), source: "footer_newsletter",
        });
        return { status: 200 };
      })();

      const result: any = await Promise.race([firestoreTask, timeoutPromise]);
      
      if (result.status === 409) {
        return NextResponse.json({ error: randomError }, { status: 409 });
      }

    } catch (error: any) {
      // IF TIMEOUT OR PERMISSION ERROR -> SWITCH TO PERMANENT LOCAL MODE
      isFirestoreOffline = true;
      console.warn("⚠️ [LOCAL LOG MODE] Firestore unreachable. Saving emails to src/data/subscribers.json instead.");
      
      if (checkLocal(email)) {
        return NextResponse.json({ error: randomError }, { status: 409 });
      }
      saveToLocal(email);
      return NextResponse.json({ success: true, message: "Welcome aboard! Insights incoming (Local Log Sync)." });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Connection established. Insights incoming soon." 
    });

  } catch (error: any) {
    return NextResponse.json({ error: "Sync failed. Please try again." }, { status: 500 });
  }
}
