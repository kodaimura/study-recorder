up:
	docker compose up -d

down:
	docker compose down

start:
	docker compose start

stop:
	docker compose stop

infront:
	docker compose exec frontend bash

inback:
	docker compose exec backend bash

indb:
	docker compose exec db bash

build:
	docker compose build --no-cache