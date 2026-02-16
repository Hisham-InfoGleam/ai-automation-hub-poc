/*
MIT License

Copyright (c) 2026 Hisham Alrashdan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { Router } from "express";
import { z } from "zod";
import { env } from "../utils/env";

const hookSchema = z.object({
  event: z.string().min(1),
  message: z.string().min(1),
  deliver: z.boolean().default(false),
  channel: z.enum(["telegram"]).optional(),
  requestSessionKey: z.boolean().optional(),
  metadata: z.record(z.unknown()).optional(),
});

export const hooksRouter = Router();

hooksRouter.post("/hooks/agent", (req, res) => {
  const configuredToken = env.OPENCLAW_HOOK_TOKEN;
  const incomingToken = req.header("x-openclaw-token");

  if (configuredToken && incomingToken !== configuredToken) {
    return res.status(401).json({ error: "Unauthorized hook token." });
  }

  const parsed = hookSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid hook payload." });
  }

  if (parsed.data.requestSessionKey) {
    return res.status(400).json({ error: "requestSessionKey is not allowed." });
  }

  return res.status(202).json({
    accepted: true,
    correlationId: res.locals.correlationId,
    event: parsed.data.event,
    deliver: parsed.data.deliver,
    channel: parsed.data.channel ?? null,
    note: "Hook accepted for workflow orchestration.",
  });
});
