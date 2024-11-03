DOCKER_COMPOSE_DEV = docker compose
DOCKER_COMPOSE_PROD = docker compose -f docker-compose.prod.yml

dev:
	$(DOCKER_COMPOSE_DEV) up -d

prod:
	$(DOCKER_COMPOSE_PROD) up -d

dev-build:
	$(DOCKER_COMPOSE_DEV) build --no-cache

prod-build:
	$(DOCKER_COMPOSE_PROD) build --no-cache

down:
	$(DOCKER_COMPOSE_DEV) down
	$(DOCKER_COMPOSE_PROD) down

stop:
	$(DOCKER_COMPOSE_DEV) stop
	$(DOCKER_COMPOSE_PROD) stop

infront:
	$(DOCKER_COMPOSE_DEV) exec frontend bash || $(DOCKER_COMPOSE_PROD) exec frontend bash

inback:
	$(DOCKER_COMPOSE_DEV) exec backend bash || $(DOCKER_COMPOSE_PROD) exec backend bash

logfront:
	docker compose logs -f frontend

logback:
	docker compose logs -f backend