DOCKER_COMPOSE = docker compose
ENV ?= dev
DOCKER_COMPOSE_FILE = $(if $(filter prod,$(ENV)),-f docker-compose.prod.yml,)
DOCKER_COMPOSE_CMD = $(DOCKER_COMPOSE) $(DOCKER_COMPOSE_FILE)

up:
	@if [ "$(ENV)" = "prod" ]; then \
		mkdir -p frontend/build/graph \
		ln -sf index.html frontend/build/login \
		ln -sf index.html frontend/build/calendar \
		ln -sf index.html frontend/build/editor \
		ln -sf ../index.html frontend/build/graph/monthly \
		ln -sf ../index.html frontend/build/graph/total \
	fi
	$(DOCKER_COMPOSE_CMD) up -d

build:
	$(DOCKER_COMPOSE_CMD) build --no-cache

down:
	$(DOCKER_COMPOSE_CMD) down

stop:
	$(DOCKER_COMPOSE_CMD) stop

infront:
	$(DOCKER_COMPOSE_CMD) exec frontend bash

inback:
	$(DOCKER_COMPOSE_CMD) exec backend bash

logfront:
	$(DOCKER_COMPOSE_CMD) logs -f frontend

logback:
	$(DOCKER_COMPOSE_CMD) logs -f backend

ps:
	$(DOCKER_COMPOSE_CMD) ps

help:
	@echo "Usage: make [target] [ENV=dev|prod]"
	@echo ""
	@echo "Targets:"
	@echo "  up                Start containers in the specified environment (default: dev)"
	@echo "  build             Build containers without cache"
	@echo "  down              Stop and remove containers, networks, and volumes"
	@echo "  stop              Stop containers"
	@echo "  infront           Access the frontend container via bash"
	@echo "  inback            Access the backend container via bash"
	@echo "  logfront          Show logs for the frontend service"
	@echo "  logback           Show logs for the backend service"
	@echo "  ps                Show container status"
