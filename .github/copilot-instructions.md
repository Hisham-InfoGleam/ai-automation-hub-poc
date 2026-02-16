# AI Automation POC — Copilot Instructions

You are assisting Hisham Alrashdan building "AI Automation Hub" as a portfolio-grade POC that demonstrates automation, integrations, and agentic workflows.

## Project Goals
- Build a clean, modular automation platform suitable for demos and learning.
- Prefer reproducible, testable workflows and clear boundaries between services.
- Keep examples synthetic; never embed secrets or real credentials.

## Permitted Tech Stack
- Orchestration: n8n or LangGraph (as needed)
- Backend: Node.js + TypeScript (strict) + Express or Fastify
- Validation: zod
- ORM: Prisma (preferred) or TypeORM
- Data: PostgreSQL or MariaDB (choose one per feature)
- Security: helmet, bcrypt, jsonwebtoken, dotenv

## Project Layout (Recommended)
- /automation-api — Core API (REST) and workflow endpoints
- /agents — Agent logic and tools
- /db — Schema, migrations, seed (synthetic only)
- /docs/public — Publishable user-facing docs
- /docs/agent — Agent-only execution plans and heartbeat roadmaps (private)
- /docs/private — Owner-only learning notes, glossary, and runbooks (private)

## Documentation Types Policy (Required)
Maintain documentation in exactly three types:

1) Type 1 (Private Owner Docs)
- Purpose: owner learning, internal understanding, personal references.
- Location: `docs/private/`
- Rule: never publish or commit sensitive operational details.

2) Type 2 (Agent Working Docs)
- Purpose: agent execution plans (day-by-day), implementation strategy, progress heartbeat.
- Location: `docs/agent/`
- Rule: private only; can be continuously rewritten, removed, or restructured as work evolves.

3) Type 3 (Public User Docs)
- Purpose: customer-facing docs, install/run guides, architecture explanations, diagrams.
- Location: `docs/public/`
- Rule: publish-safe only; never include private infrastructure, credentials, internal objectives, or roadmap internals.

Enforcement:
- Keep `docs/private/` and `docs/agent/` ignored by git.
- Keep `docs/public/` publishable and free of private details.
- Do not include agent progress roadmap details in public docs or README.

## Engineering Workflow (Required)
1. Plan: Max 8 bullets explaining logic
2. Context: Use Context7 (mcp_context7_resolve-library-id) for new libraries
3. Diffs: List files to create/modify
4. Implement: Small, testable chunks (< 300 lines)
5. Security: Verify no secrets or PII in logs/tests
6. Gates: Run npm run lint and npm run test before finishing

## Output Format
- Keep changes under 300 lines unless approved
- Add MIT header to new logic files
- Add/adjust tests for non-trivial logic
- Ask 1-3 precise questions when uncertain

## Publishing (GitHub)
- Repo naming: use a clear slug without quotes (example: https://github.com/Hisham-InfoGleam/<project-name>)
- Before publishing: run npm run lint and npm run test
- README must include: project summary, tech stack, author, and license (MIT)
- Do not commit secrets, internal IPs, or private business content
- If not accepting contributions, add a short note in README instead of adding CONTRIBUTING.md

## Confidentiality & Anonymization Policy (Always On)
- Treat business strategy, freelancing positioning, internal objectives, and private infrastructure details as confidential by default.
- Never publish or commit real VPS IPs, internal hostnames, private URLs, access tokens, chat IDs, phone numbers, or webhook secrets.
- For public artifacts (README, docs, examples, demos), always replace sensitive deployment values with anonymized placeholders:
	- `OPENCLAW_GATEWAY_URL=https://openclaw.example.com`
	- `FHIR_BASE_URL=https://fhir.example.com`
	- `TELEGRAM_CHAT_ID=<your_chat_id>`
- Keep private deployment notes in local-only files (for example `*.private.md`, `*.local.md`, `.env`) and ensure they are ignored by git.
- When generating code or docs, separate internal runbooks from publish-safe docs; default to publish-safe output unless explicitly asked for a private local note.

## Development Triggers (Hisham's Commands)
- "Prepare my POC for GitHub" → Generate Tier 1 docs + security checklist
- "Check before push" → Run strict pre-push checklist in `docs/agent/pre-push-checklist.agent.md` + pre-push security verification

## OpenClaw Reference Policy (Required)
- For any task related to OpenClaw (agents, skills, integrations, configs, troubleshooting), use these as primary references first:
	- https://docs.openclaw.ai/
	- https://github.com/openclaw/openclaw
- Preferred tool usage:
	- Use `fetch_webpage` for OpenClaw docs pages and setup/config guidance.
	- Use `github_repo` for searching implementation patterns from `openclaw/openclaw` when workspace code is insufficient.
	- Use Context7 (`mcp_context7_resolve-library-id` then docs retrieval) when a new OpenClaw-adjacent library/package is introduced.
- If generated code differs from OpenClaw docs defaults, explicitly document the reason in task output.
- Keep OpenClaw examples synthetic and never include real tokens, chat IDs, or personal data.

## HL7/FHIR Reference Policy (Required)
- For any healthcare interoperability logic (FHIR mapping, HL7 parsing, resource modeling), use these references first:
	- https://www.hl7.org/implement/standards/product_brief.cfm?product_id=185
	- https://hl7.org/fhir/R4/
	- https://www.hl7.org/fhir/R4/documentation.html
	- https://hl7.org/fhir/R4/resourcelist.html
- Prefer standards-aligned field names and structures in examples.
- Keep all healthcare payloads synthetic and publish-safe.
