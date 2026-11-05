// src/lib/email/resend.ts
//
// Drop-in replacement for `import { Resend } from "resend"`.
// In demo mode (see src/config/demo.ts) every send resolves with a fake
// success response and nothing reaches Resend.
import { Resend as RealResend } from "resend";
import { randomUUID } from "crypto";
import { DEMO_FORMS_SILENT } from "@/config/demo";

function fakeResult() {
  return Promise.resolve({
    data: { id: `demo_${randomUUID()}` },
    error: null,
    headers: null,
  });
}

export class Resend extends RealResend {
  constructor(key?: string) {
    super(key || process.env.RESEND_API_KEY || "re_demo_mode");

    if (DEMO_FORMS_SILENT) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const silent = (async () => fakeResult()) as any;
      this.emails.send = silent;
      this.emails.create = silent;
      this.batch.send = silent;
      this.batch.create = silent;
    }
  }
}
