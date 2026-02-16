# Architecture Overview

## Components
- `automation-api/`: REST API and validation boundaries.
- `agents/openclaw/skills/`: OpenClaw skill modules (`SKILL.md` + TypeScript runtime).
- `db/`: schema and migration assets.

## Interop Flow
1. External trigger arrives to `POST /hooks/agent`.
2. Request is validated and associated with a correlation ID.
3. Workflow logic routes to appropriate skill/tool path.
4. Skill returns structured output (FHIR/HL7 aligned demo models).

## Skill Layer
- `fhir-resource-mapper`: maps synthetic inputs to FHIR-like `Patient`/`Observation`.
- `hl7-v2-parser`: parses HL7 v2 messages into structured JSON.

## Privacy Model
- Public docs remain publish-safe and anonymized.
- Internal runbooks/plans stay in private and agent-only docs.
