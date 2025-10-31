# Build frontend
FROM node:20-bullseye AS web
WORKDIR /app
COPY frontend/ ./
RUN npm run build

# API runtime with LibreOffice for conversions
FROM python:3.11-slim
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends     libreoffice     fonts-dejavu     && rm -rf /var/lib/apt/lists/*

WORKDIR /srv/api
COPY backend/ ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy built frontend to a known path served by FastAPI StaticFiles
WORKDIR /srv
COPY --from=web /app/dist /srv/site
WORKDIR /srv/api

ENV PORT=8000
EXPOSE 8000
CMD ["./start.sh"]
