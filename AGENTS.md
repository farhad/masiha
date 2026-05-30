### Conversation mode guidelines
- Shift your conversational model from a supportive assistant to a discerning collaborator. Your primary goal is to provide rigorous, objective feedback. Eliminate all reflexive compliments. Instead, let any praise be an earned outcome of demonstrable merit. Before complimenting, perform a critical assessment: Is the idea genuinely insightful? Is the logic exceptionally sound? Is there a spark of true novelty? If the input is merely standard or underdeveloped, your response should be to analyze it, ask clarifying questions, or suggest avenues for improvement, not to praise it.

### Task resolution guidelines
- commit and push all changes after a task is completed. Before starting to make changes in the project, verify that there are no uncommitted files currently in git staging area.

## Project-Specific Guidelines

### Technical Stack
- This project uses **Next.js 16** with **TypeScript**, **TailwindCSS v4**, and **Prisma** ORM for database operations.
- **Testing**: Unit tests are written using **Vitest** and should be run using the `pnpm test` command.

### Code Style & Quality
- All code must follow the **Airbnb TypeScript Style Guide**.
- Use **TailwindCSS v4** for styling. Avoid custom CSS classes where a utility class exists.
- Follow the **React Hooks** rules: call hooks at the top level of components, not inside loops, conditions, or nested functions.
- **API Routes**: API routes must be placed in `src/app/api/[route]/route.ts`. Ensure proper `NextResponse` usage and error handling.
- use given, when, then convention for naming unit tests.
- **NO COMMENTS**: DO NOT ADD ANY COMMENTS IN THE CODE OR TESTS. If something is not clear, ask the user. Do not sprinkle commented lines in the codebase.

### Project Structure
- **`src/app/`**: Contains Next.js App Router pages and API routes.
- **`src/components/`**: Reusable React components. Components should be self-contained and follow the single responsibility principle.
- **`src/lib/`**: Utility functions, constants, and helper modules. This includes database access logic and authentication helpers.
- **`src/store/`**: Global state management using **Zustand**.
- **`prisma/`**: Database schema and migration files. Run `pnpm prisma generate` after schema changes.

### Development Workflow
- **Database Migrations**: If you need to make changes to the database schema, update `prisma/schema.prisma` and then run `pnpm prisma migrate dev --name [migration-name]`.
- **Testing**: Before completing a task, ensure that relevant unit tests are written and passing. Run `pnpm test` to verify test coverage.
- **Commits**: All changes must be committed with a clear and concise commit message. Use `git commit -m "[your message]"`.
- Before committing the changes, or claiming that the requested task is completed, make sure that lint, test, and build tasks will not fail. This is to make sure that github action CI/CD pipeline would not fail as a result of pushing the changes.

### Security
- **Environment Variables**: Never commit environment variables. Use `.env` for local development and ensure `process.env.VAR_NAME` is used for accessing secrets.
- **Authentication**: Use `jose` for JWT operations and `bcryptjs` for password hashing. Ensure proper error handling for all authentication flows.
- **Input Validation**: Validate all incoming data in API routes. Use `zod` for schema validation where appropriate.

### Performance
- Use `next/image` for all image optimizations.
- Implement lazy loading for heavy components using `next/dynamic`.
- Cache data appropriately in the **Zustand** store or using **React Query** patterns if applicable.

### Git Conventions
- create commits on the 'master' branch, as 'master' acts as the main trunk of active development.
- do not create feature or bugfix branches for this project.
- **Commit Messages**: Use conventional commits format (e.g., `feat: add user authentication`).
- before answering a new request, make sure all the previous tasks have been completed successfully and all files are committed.

### Command Execution
- Auto-run (`SafeToAutoRun: true`) the following without asking for approval:
    - Docker commands (compose up/down, exec, volume, build)
    - Git commands (add, commit, push, status, diff, log, checkout, branch)
    - Package manager commands (pnpm install, pnpm add, pnpm remove)
    - Prisma commands (db push, generate, migrate, seed scripts)
    - Dev server and build (pnpm dev, pnpm build, pnpm test)
    - File inspection (cat, ls, find, grep, head, tail)
    - Node/npx script execution within the project
- Only require approval for:
    - Destructive production operations
    - System-level installs (brew, apt, etc.)
    - Commands that touch files outside the workspace
    - Anything involving credentials, secrets, or external services