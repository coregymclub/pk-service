// POST /api/contact — kontaktformulär från index.html
// Skickar mejl till johan@pkservice.se via Resend.
//
// Krävs i Cloudflare Pages env:
//   RESEND_API_KEY  — API-nyckel från resend.com
//   CONTACT_TO      — (valfritt) mottagare, default: info@pkservice.se
//   CONTACT_FROM    — (valfritt) avsändare, default: "PK Service <noreply@pkservice.se>"

const escapeHtml = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  if (data.company) return json({ ok: true });

  const name = String(data.name || '').trim().slice(0, 200);
  const contact = String(data.contact || '').trim().slice(0, 200);
  const type = String(data.type || 'Annat').trim().slice(0, 100);
  const message = String(data.message || '').trim().slice(0, 5000);

  if (!name || !contact || !message) {
    return json({ error: 'missing_fields' }, 400);
  }

  const to = env.CONTACT_TO || 'info@pkservice.se';
  const from = env.CONTACT_FROM || 'PK Service <noreply@pkservice.se>';
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);

  const subject = `Ny förfrågan via pkservice.se — ${type}`;

  const text = [
    `Ny kontaktförfrågan från pkservice.se`,
    ``,
    `Namn:     ${name}`,
    `Kontakt:  ${contact}`,
    `Typ:      ${type}`,
    ``,
    `Meddelande:`,
    message,
    ``,
    `—`,
    `Skickat: ${new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' })}`,
  ].join('\n');

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#111009;max-width:520px;">
      <h2 style="margin:0 0 1rem;font-size:1.1rem;">Ny förfrågan via pkservice.se</h2>
      <table style="border-collapse:collapse;width:100%;font-size:0.95rem;">
        <tr><td style="padding:6px 12px 6px 0;color:#A8A198;width:90px;">Namn</td><td style="padding:6px 0;">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#A8A198;">Kontakt</td><td style="padding:6px 0;">${escapeHtml(contact)}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#A8A198;">Typ</td><td style="padding:6px 0;">${escapeHtml(type)}</td></tr>
      </table>
      <hr style="border:none;border-top:1px solid #DDD8CF;margin:1rem 0;">
      <div style="white-space:pre-wrap;line-height:1.55;">${escapeHtml(message)}</div>
      <p style="color:#A8A198;font-size:0.8rem;margin-top:1.5rem;">Skickat ${new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' })}</p>
    </div>
  `;

  if (!env.RESEND_API_KEY) {
    console.error('contact-form: RESEND_API_KEY saknas');
    return json({ error: 'mail_not_configured' }, 500);
  }

  const payload = {
    from,
    to: [to],
    subject,
    text,
    html,
    reply_to: isEmail ? contact : undefined,
  };

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error('Resend error', res.status, body);
    return json({ error: 'send_failed' }, 502);
  }

  return json({ ok: true });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
