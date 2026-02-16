---
name: hl7-v2-parser
version: 0.1.0
description: Parse synthetic HL7 v2 messages into structured JSON for downstream interoperability workflows.
tags:
  - healthcare
  - hl7
  - interoperability
requires:
  bins:
    - node
entrypoint: index.ts
safeForPublicDemo: true
---

# hl7-v2-parser

OpenClaw skill for parsing HL7 v2 text messages (`MSH|...`) into normalized JSON.

## Why this exists
- Demonstrates legacy clinical interoperability handling in a modern agent workflow.
- Provides deterministic segment/field extraction for routing and mapping.
- Uses strict zod validation to prevent malformed parser input.

## Inputs
- `message`: HL7 v2 payload string, segment-delimited by newline (`\n`) or carriage return (`\r`).

## Output
- JSON object with:
  - `ok`: boolean
  - `parsed`: structured representation including `messageType`, `triggerEvent`, `version`, and raw segment fields.

## Demo Note
This skill is synthetic-only and publish-safe. Do not include real patient identifiers in public examples.
