# evowizz.dev

The source for [evowizz.dev](https://evowizz.dev), my personal website and writing archive. It is built with Next.js, React, Tailwind CSS, Content Collections, Drizzle ORM, and Neon Postgres.

## Local development

You need [Bun](https://bun.sh) and Node.js 24.

1. Clone the repository and enter it:

   ```bash
   git clone https://github.com/evowizz/evowizz.dev.git
   cd evowizz.dev
   ```

2. Install the dependencies:

   ```bash
   bun install
   ```

3. Create the local environment file:

   ```bash
   cp .env.example .env.local
   ```

4. Set `DRIZZLE_DATABASE_URL` in `.env.local` to a Postgres connection string, then apply the schema:

   ```bash
   bun run db:migrate
   ```

5. Start the development server on [localhost:3000](http://localhost:3000):

   ```bash
   bun run dev
   ```

## Quality checks

Run the same checks as CI before opening a pull request:

```bash
bun run lint
bun run typecheck
```

## Contributing

New features are not currently being accepted, but bug reports and focused fixes are welcome. Please open an issue before larger changes.

## License

Licensed under the [Apache License 2.0](LICENSE).
