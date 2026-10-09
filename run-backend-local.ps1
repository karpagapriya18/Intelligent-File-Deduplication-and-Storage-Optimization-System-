$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$backend = Join-Path $root "backend"
Set-Location $backend

if (-not (Test-Path ".deps")) {
  New-Item -ItemType Directory -Force -Path "..\..\pip-temp", "..\..\pip-cache" | Out-Null
  $env:TEMP = (Resolve-Path "..\..\pip-temp").Path
  $env:TMP = $env:TEMP
  $env:PIP_CACHE_DIR = (Resolve-Path "..\..\pip-cache").Path
  python -m pip install --target .deps -r requirements.txt
}

if (-not (Test-Path ".env")) {
  @"
DATABASE_URL=sqlite:///./dedup_dev.db
REDIS_URL=memory://
CELERY_TASK_ALWAYS_EAGER=true
JWT_SECRET_KEY=local-dev-secret-change-me
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=480
UPLOAD_DIR=app/storage/uploads
MAX_UPLOAD_SIZE_MB=512
ALLOWED_CONTENT_TYPES=application/pdf,image/png,image/jpeg,text/plain,application/zip,application/octet-stream
"@ | Set-Content -Encoding UTF8 ".env"
}

$env:PYTHONPATH = ".deps;."
python -m alembic upgrade head
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
