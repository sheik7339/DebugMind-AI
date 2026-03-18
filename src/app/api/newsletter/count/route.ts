import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getCountFromServer } from "firebase/firestore";
import fs from "fs";
import path from "path";

// Global flag to prevent terminal spam
let isFirestoreOffline = false;
const LOCAL_DB_PATH = path.join(process.cwd(), "src/data/subscribers.json");

export async function GET() {
  let localCount = 0;
  try {
    if (fs.existsSync(LOCAL_DB_PATH)) {
      const subscribers = JSON.parse(fs.readFileSync(LOCAL_DB_PATH, "utf8"));
      localCount = subscribers.length;
    }
  } catch (e) {}

  if (isFirestoreOffline) {
    return NextResponse.json({ count: localCount });
  }

  try {
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 400));
    const firestoreTask = (async () => {
      const coll = collection(db, "newsletter");
      const snapshot = await getCountFromServer(coll);
      return snapshot.data().count;
    })();

    const cloudCount: any = await Promise.race([firestoreTask, timeoutPromise]);
    
    return NextResponse.json({ 
      count: cloudCount + localCount 
    });
  } catch (error: any) {
    isFirestoreOffline = true;
    console.warn("⚠️ [LOCAL LOG MODE] Switching to local count only.");
    return NextResponse.json({ count: localCount });
  }
}
