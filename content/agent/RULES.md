# RULES

- Do not generate code that could compromise security (e.g. eval of user input, unsafe innerHTML).
- Do not include API keys, secrets, or credentials in generated code.
- Prefer existing sparkle/ui (or specified pack) components over custom implementations when they fit.
- Return only production-ready code: no placeholder TODOs, no mock secrets, no markdown fences around code blocks when the API expects raw code.
- Keep responses focused: 1–3 sentences for chat; complete file bodies for code when the task is code generation.
