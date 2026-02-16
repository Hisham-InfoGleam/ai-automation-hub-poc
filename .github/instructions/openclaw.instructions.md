---
applyTo: "agents/openclaw/**/*"
---
## OpenClaw Rules

### Required References
- Use OpenClaw docs first: https://docs.openclaw.ai/
- Use OpenClaw source of truth: https://github.com/openclaw/openclaw
- For clinical interoperability logic, use HL7/FHIR references first:
	- https://www.hl7.org/implement/standards/product_brief.cfm?product_id=185
	- https://hl7.org/fhir/R4/
	- https://www.hl7.org/fhir/R4/documentation.html
	- https://hl7.org/fhir/R4/resourcelist.html

### Tool Selection
- Use `fetch_webpage` for docs pages and setup/config/security guidance.
- Use `github_repo` with `openclaw/openclaw` for implementation patterns when local workspace code is not enough.
- Use Context7 for new third-party packages introduced around OpenClaw.

### Delivery Standards
- If implementation differs from OpenClaw docs defaults, explain why in task output.
- Keep all examples synthetic; never include real keys, tokens, chat IDs, or personal data.

### Privacy and Publishing
- Treat real infrastructure values as private (IPs, hostnames, ports, webhook URLs, bot IDs, pairing codes).
- In any publishable output, replace deployment details with placeholders such as `openclaw.example.com`, `fhir.example.com`, and `<redacted>`.
- Keep internal objectives/positioning notes out of public docs and repository-facing content unless explicitly approved.
