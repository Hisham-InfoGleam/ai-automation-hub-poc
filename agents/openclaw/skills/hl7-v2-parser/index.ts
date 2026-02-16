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

import { z } from "zod";

const Hl7InputSchema = z.object({
  message: z.string().min(1),
});

type Hl7ParseResult =
  | {
      ok: true;
      parsed: {
        messageType: string;
        triggerEvent: string;
        version: string;
        segments: Array<{
          name: string;
          fields: string[];
        }>;
      };
    }
  | {
      ok: false;
      error: string;
    };

function normalizeSegments(rawMessage: string): string[] {
  return rawMessage
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);
}

function getMshMetadata(mshFields: string[]): { messageType: string; triggerEvent: string; version: string } {
  const msh9 = mshFields[8] ?? "";
  const [messageType = "UNKNOWN", triggerEvent = "UNKNOWN"] = msh9.split("^");
  const version = mshFields[11] ?? "UNKNOWN";

  return {
    messageType,
    triggerEvent,
    version,
  };
}

export function runHl7V2Parser(input: unknown): Hl7ParseResult {
  const parsedInput = Hl7InputSchema.safeParse(input);
  if (!parsedInput.success) {
    return {
      ok: false,
      error: parsedInput.error.issues.map((issue: z.ZodIssue) => issue.message).join("; "),
    };
  }

  const segments = normalizeSegments(parsedInput.data.message).map((segmentText) => {
    const fields = segmentText.split("|");
    return {
      name: fields[0] ?? "UNKNOWN",
      fields,
    };
  });

  const mshSegment = segments.find((segment) => segment.name === "MSH");
  if (!mshSegment) {
    return {
      ok: false,
      error: "Invalid HL7 message: missing MSH segment.",
    };
  }

  const { messageType, triggerEvent, version } = getMshMetadata(mshSegment.fields);

  return {
    ok: true,
    parsed: {
      messageType,
      triggerEvent,
      version,
      segments,
    },
  };
}
