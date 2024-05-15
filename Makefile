up:
	docker compose up -d

down:
	docker compose down

start:
	docker compose start

stop:
	docker compose stop

front:
	docker exec -i -t frontend bash

back:
	docker exec -i -t backend bash

build:
	docker compose build --no-cache