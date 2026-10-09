# Intelligent File Deduplication & Storage Optimization

Full-stack file management application for detecting identical file content, grouping duplicates, and estimating recoverable storage.

## Stack

- Backend: Python 3.12, FastAPI, SQLAlchemy, Alembic, Pydantic, Celery, Redis, JWT
- Frontend: React, Vite, TypeScript, Material UI, Axios, React Router, Chart.js
- Database: MySQL 8.0
- Tooling: Docker Compose, Swagger/OpenAPI, Postman, pytest

## Features

- Upload, download, delete, search, filter, paginate, and sort files
- SHA-256 content hashing detects duplicates even with different names or upload times
- Async hashing through Celery and Redis so large uploads do not block API responses
- Duplicate groups with original file, duplicate files, storage consumed, and potential savings
- Analytics dashboard for total files, total storage, duplicate storage, savings, largest files, and recent uploads
- Safe deletion with confirmation, protected-file checks, deletion history, and audit logs
- Chunked file writes and hashing to avoid loading large files fully into memory
- JWT authentication and owner-scoped file access

## Run With Docker

1. Copy the environment file:

   ```bash
   cp .env.example .env
   ```

2. Start the application:

   ```bash
   docker compose up --build
   ```

3. Open:

   - Frontend: http://localhost:5173
   - Swagger/OpenAPI: http://localhost:8000/docs
   - Health check: http://localhost:8000/health

The React login screen can register and sign in a demo user automatically with `demo@example.com` and `password123`.

## Local Backend Commands

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

Run the worker in another terminal:

```bash
cd backend
celery -A app.tasks.celery_app.celery_app worker --loglevel=INFO --include app.tasks.hash_tasks
```

If Redis is not installed during local development, set `CELERY_TASK_ALWAYS_EAGER=true` in `.env`. Upload hashing will run immediately inside the API process, which is convenient for demos but not recommended for production.

## Local Frontend Commands

```bash
cd frontend
npm install
npm run dev
```

## Quick Local Demo Without Docker

On Windows, open two PowerShell windows from the project root:

```powershell
.\run-backend-local.ps1
```

```powershell
.\run-frontend-local.ps1
```

This demo mode uses SQLite and eager hashing so you can view the backend and frontend without installing MySQL or Redis. The production-style Docker path still uses MySQL and Redis.

## Tests

```bash
cd backend
pytest
```

The included unit tests verify that identical bytes produce the same SHA-256 hash and different bytes produce different hashes.

## API Notes

Authentication uses `/api/v1/auth/register` and `/api/v1/auth/login`. Use the bearer token for file endpoints.

Key endpoints:

- `GET /auth/me` returns the logged-in user
- `POST /files/upload` uploads a file and queues async hashing
- `GET /files/` lists files with search, filtering, pagination, and sorting
- `GET /files/history/deletions` lists deletion history
- `GET /files/duplicate-groups` returns duplicate groups
- `POST /files/duplicate-groups/rebuild` rebuilds duplicate groups
- `GET /files/duplicate-groups/{group_id}` returns one duplicate group
- `GET /files/storage/statistics` returns dashboard metrics
- `POST /files/{file_id}/hash` generates a file hash
- `POST /files/{file_id}/check-duplicate` checks one file for duplicates
- `GET /files/{file_id}/download` downloads an owned file
- `DELETE /files/{file_id}?confirm=true` deletes a file safely
- `GET /audit-logs` lists audit events

The same API is also available under `/api/v1` for the React frontend.

## Database Tables

- `users`
- `files`
- `file_hashes`
- `duplicate_groups`
- `file_metadata`
- `deletion_history`
- `audit_logs`
