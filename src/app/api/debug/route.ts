import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code, error, logs, language } = await req.json();
    
    // Key sourcing logic
    const customKey = req.headers.get("x-gemini-key");
    const MASTER_KEY = "AIzaSyDFUsyagMfDGOsXLqGWoMajpQaYxvF37bM";
    
    const isValidKey = (k: any) => k && typeof k === 'string' && k.length > 20 && !k.includes("your-");
    const TARGET_KEY = isValidKey(customKey) ? customKey!.trim() : MASTER_KEY;

    console.log(`REAL_NEURAL_LINK: Syncing via Node [${TARGET_KEY.slice(0, 8)}...]`);

    const genAI = new GoogleGenerativeAI(TARGET_KEY);
    
    // Core Cluster for REAL AI ONLY
    // Detected Next-Gen API Key: Targeting Gemini 2.5 and 2.0 architectures
    const neuralCluster = [
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-flash-latest",
      "gemini-pro-latest"
    ];
    
    let failureLog: any[] = [];

    for (const modelID of neuralCluster) {
      try {
        console.log(`Neural Handshake: Syncing with [${modelID}]...`);
        const model = genAI.getGenerativeModel({ model: modelID });

        const prompt = `
          Senior Neural Architect Mode: Analyze and FIX this ${language || 'generic programming'} code.
          Programming Language Context: ${language || 'Auto-detect'}
          Code to Fix:
          ${code}

          Error Output / Context:
          ${error}

          Logs / Traces:
          ${logs || "None"}

          Format Instructions: Strict JSON only. 
          Keys: root_cause, neural_insight, security_audit, suggested_fix, optimization_tip.
          No conversational text. Return valid JSON only.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        // Clean JSON extraction
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("Neural output did not contain valid JSON.");
        
        const parsedData = JSON.parse(jsonMatch[0]);
        console.log(`REAL_NEURAL_LINK: Success established via [${modelID}]`);
        return NextResponse.json(parsedData);

      } catch (err: any) {
        console.warn(`Neural node [${modelID}] interface failed:`, err.message);
        failureLog.push(`${modelID}: ${err.message}`);
        
        const errMsg = err.message?.toLowerCase() || "";
        
        // Fatal key error
        if (errMsg.includes("key") && (errMsg.includes("not valid") || errMsg.includes("401"))) {
          break;
        }

        // Wait slightly before trying next node
        await new Promise(r => setTimeout(r, 400));
        continue;
      }
    }

    // If we reach here, ALL models failed. 
    console.error("NEURAL_CLUSTER_FAILURE:", failureLog);
    
    return NextResponse.json({ 
      error: `REAL AI DEBUG FAILED: Cluster refused connection. Details: [${failureLog.join(" | ")}]. Check your API key at aistudio.google.com.`
    }, { status: 500 });

  } catch (error: any) {
    console.error("NEURAL_SYSTEM_CRASH:", error);
    return NextResponse.json({ 
      error: `Neural Integrity Lost: ${error.message || "Unknown error"}`
    }, { status: 500 });
  }
}
