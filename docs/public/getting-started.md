# Getting Started

## Purpose
OpenClaw Clinical Interop POC demonstrates secure, self-hosted agentic workflows with healthcare interoperability examples.

## What You Get
- API endpoints for health checks, automation placeholders, and hook intake.
- OpenClaw skill examples for FHIR resource mapping and HL7 v2 parsing.
- Validation-first patterns using TypeScript + zod.

## Prerequisites
- Node.js 22+
- npm
- Docker (for local MariaDB)

## Local Setup
1. Copy environment placeholders:
   - `cp .env.example .env`
2. Start database:
   - `docker-compose up -d`
3. Install API dependencies:
   - `cd automation-api && npm install`
4. Run API in development mode:
   - `npm run dev`

## Verify
- Health endpoint: `GET /health`
- Hook endpoint: `POST /hooks/agent` with header `x-openclaw-token` when configured.

## Security Notes
- Use synthetic/demo payloads only.
- Do not place real IPs, tokens, or chat IDs in public docs.
