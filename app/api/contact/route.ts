import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO_EMAIL = process.env.CONTACT_EMAIL ?? "nayanam@photography.com";

    // If no API key configured, log and return success (dev/preview mode)
    if (!RESEND_API_KEY) {
      console.log("📧 Contact form submission (set RESEND_API_KEY to send real emails):", {
        name,
        email,
        message,
      });
      return NextResponse.json({ success: true });
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Stories by Nayanam <onboarding@resend.dev>",
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New enquiry from ${name}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 560px; color: #1a1a1a;">
            <h2 style="font-size: 1.4rem; margin-bottom: 24px;">New Portfolio Enquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <hr style="margin: 24px 0; border: none; border-top: 1px solid #e0e0e0;" />
            <p style="white-space: pre-line; line-height: 1.7;">${message}</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
