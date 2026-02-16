---
name: fhir-resource-mapper
version: 0.1.0
description: Map synthetic clinical payloads into FHIR Patient and Observation resources.
tags:
  - healthcare
  - fhir
  - interoperability
requires:
  bins:
    - node
entrypoint: index.ts
safeForPublicDemo: true
---

# fhir-resource-mapper

OpenClaw skill for transforming synthetic clinical input into FHIR-aligned resources.

## Why this exists
- Demonstrates domain-aware mapping for clinical interoperability POCs.
- Uses strict zod validation to reduce malformed tool argument risk.
- Produces deterministic JSON output suitable for API routing or chat delivery.

## Inputs
- `resourceType`: `Patient` or `Observation`
- `payload`: resource-specific input object

### Patient payload fields
- `id?`: local patient identifier
- `firstName`
- `lastName`
- `birthDate`: `YYYY-MM-DD`
- `gender`: `male|female|other|unknown`

### Observation payload fields
- `id?`: local observation identifier
- `patientId`
- `code`: short clinical code string
- `display`: human readable label
- `value`: numeric observation value
- `unit`: value unit (example: `mg/dL`)
- `effectiveDateTime`: ISO date-time string

## Output
- JSON object with:
  - `ok`: boolean
  - `resource`: FHIR-like `Patient` or `Observation`

## Demo Note
This skill is intentionally publish-safe: synthetic-only payloads, no real patient data, no real credentials.
