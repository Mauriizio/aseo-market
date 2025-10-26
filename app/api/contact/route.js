import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const form = await req.formData();
    const payload = Object.fromEntries(form);
    // Aquí luego conectamos n8n o Resend
    console.log("Lead:", payload);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
