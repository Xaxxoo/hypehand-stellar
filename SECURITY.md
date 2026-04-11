# Security Policy

## Dependency Auditing

### Automated Audit

Run the security audit locally:

```bash
cd backend
npm run audit
```

Generate a JSON report:

```bash
npm run audit:report
```

Fix auto-fixable vulnerabilities:

```bash
npm run audit:fix
```

### CI Integration

The security audit workflow runs on every push and pull request to `main`, plus weekly on Mondays. It checks for high-severity vulnerabilities in npm dependencies.

### Handling Advisories

1. Run `npm audit` to see the full report
2. For auto-fixable issues: `npm audit fix`
3. For breaking changes: `npm audit fix --force` (review changes carefully)
4. If a vulnerability cannot be fixed (e.g., transitive dependency with no patch), document the exception in this file under "Known Exceptions"

### Known Exceptions

None currently.

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly by opening a private issue or contacting the maintainers directly. Do not open a public issue for security vulnerabilities.

## Secret Management

- Never commit `.env` files or secret keys to the repository
- Use the `StellarKeysModule` for secure key handling (see `backend/src/stellar-keys/`)
- Secret keys are stored in memory buffers and wiped on application shutdown
- See `backend/.env.example` for required environment variables
