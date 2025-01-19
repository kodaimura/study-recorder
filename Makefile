DOCKER_COMPOSE = docker compose
ENV ?= dev
DOCKER_COMPOSE_FILE = $(if $(filter prod,$(ENV)),-f docker-compose.prod.yml,)
DOCKER_COMPOSE_CMD = $(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE)

up:
	$(DOCKER_COMPOSE_CMD) up -d

build:
	$(DOCKER_COMPOSE_CMD) build --no-cache

prod-setup:
	mkdir -p frontend/build/graph
	ln -sf index.html frontend/build/login
	ln -sf index.html frontend/build/calendar
	ln -sf index.html frontend/build/editor
	ln -sf ../index.html frontend/build/graph/monthly
	ln -sf ../index.html frontend/build/graph/total

down:
	$(DOCKER_COMPOSE_CMD) down

stop:
	$(DOCKER_COMPOSE_CMD) stop

exec-frontend:
	$(DOCKER_COMPOSE_CMD) exec frontend bash

exec-backend:
	$(DOCKER_COMPOSE_CMD) exec backend bash

log-frontend:
	$(DOCKER_COMPOSE_CMD) logs -f frontend

log-backend:
	$(DOCKER_COMPOSE_CMD) logs -f backend

ps:
	$(DOCKER_COMPOSE_CMD) ps

help:
	@echo "Usage: make [target] [ENV=dev|prod]"
	@echo ""
	@echo "Targets:"
	@echo "  up                Start containers in the specified environment (default: dev)"
	@echo "  build             Build containers without cache"
	@echo "  prod-setup        Set up production-specific symbolic links and directories"
	@echo "  down              Stop and remove containers, networks, and volumes"
	@echo "  stop              Stop containers"
	@echo "  exec-frontend     Access the frontend container via bash"
	@echo "  exec-backend      Access the backend container via bash"
	@echo "  log-frontend      Show logs for the frontend service"
	@echo "  log-backend       Show logs for the backend service"
	@echo "  ps                Show container status"
