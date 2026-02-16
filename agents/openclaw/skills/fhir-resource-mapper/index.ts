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

const GenderSchema = z.enum(["male", "female", "other", "unknown"]);

const PatientPayloadSchema = z.object({
  id: z.string().min(1).optional(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  gender: GenderSchema,
});

const ObservationPayloadSchema = z.object({
  id: z.string().min(1).optional(),
  patientId: z.string().min(1),
  code: z.string().min(1),
  display: z.string().min(1),
  value: z.number(),
  unit: z.string().min(1),
  effectiveDateTime: z.string().datetime(),
});

const MapperInputSchema = z.discriminatedUnion("resourceType", [
  z.object({
    resourceType: z.literal("Patient"),
    payload: PatientPayloadSchema,
  }),
  z.object({
    resourceType: z.literal("Observation"),
    payload: ObservationPayloadSchema,
  }),
]);

type MapperInput = z.infer<typeof MapperInputSchema>;

type MapperResult =
  | {
      ok: true;
      resource: Record<string, unknown>;
    }
  | {
      ok: false;
      error: string;
    };

function mapPatient(payload: z.infer<typeof PatientPayloadSchema>): Record<string, unknown> {
  const familyName = payload.lastName.trim();
  const givenName = payload.firstName.trim();

  return {
    resourceType: "Patient",
    id: payload.id ?? `pat-${familyName.toLowerCase()}-${givenName.toLowerCase()}`,
    name: [
      {
        family: familyName,
        given: [givenName],
      },
    ],
    birthDate: payload.birthDate,
    gender: payload.gender,
  };
}

function mapObservation(payload: z.infer<typeof ObservationPayloadSchema>): Record<string, unknown> {
  return {
    resourceType: "Observation",
    id: payload.id ?? `obs-${payload.patientId}-${payload.code.toLowerCase()}`,
    status: "final",
    subject: {
      reference: `Patient/${payload.patientId}`,
    },
    code: {
      coding: [
        {
          system: "http://loinc.org",
          code: payload.code,
          display: payload.display,
        },
      ],
      text: payload.display,
    },
    effectiveDateTime: payload.effectiveDateTime,
    valueQuantity: {
      value: payload.value,
      unit: payload.unit,
    },
  };
}

export function runFhirResourceMapper(input: unknown): MapperResult {
  const parsed = MapperInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues.map((issue: z.ZodIssue) => issue.message).join("; "),
    };
  }

  const request: MapperInput = parsed.data;

  if (request.resourceType === "Patient") {
    return {
      ok: true,
      resource: mapPatient(request.payload),
    };
  }

  return {
    ok: true,
    resource: mapObservation(request.payload),
  };
}
