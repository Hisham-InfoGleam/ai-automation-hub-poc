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

import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../src/app";

describe("POST /hooks/agent", () => {
  it("accepts a valid hook payload", async () => {
    const response = await request(app).post("/hooks/agent").send({
      event: "lab.critical",
      message: "Synthetic alert for demo.",
      deliver: true,
      channel: "telegram",
      metadata: {
        source: "demo",
      },
    });

    expect(response.status).toBe(202);
    expect(response.body.accepted).toBe(true);
    expect(response.body.event).toBe("lab.critical");
  });

  it("rejects payload with requestSessionKey enabled", async () => {
    const response = await request(app).post("/hooks/agent").send({
      event: "lab.critical",
      message: "Synthetic alert for demo.",
      requestSessionKey: true,
    });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("requestSessionKey is not allowed.");
  });
});
