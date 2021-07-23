#!/usr/bin/make -f

PROJECT_NAME := 'Hasane API'
FLAGSHIP_STORE_SERVICE := flagship-store-api
CONTAINER_NAME := flagship-store_api_1

FLAGSHIP_STORE_ROOT_FOLDER := $(shell pwd)
DOCKER_COMPOSE_FILE := $(FLAGSHIP_STORE_ROOT_FOLDER)/docker-compose.yml
DOCKER_PROJECT_NAME := flagship-store
DOCKER_COMMAND := docker-compose -p $(DOCKER_PROJECT_NAME) -f $(DOCKER_COMPOSE_FILE)


build: ## Build project image
	$(DOCKER_COMMAND) build --no-cache

env-start: ## Start project containers defined in docker-compose
	$(DOCKER_COMMAND) up -d

env-stop: ## Stop project containers defined in docker-compose
	$(DOCKER_COMMAND) stop

env-recreate: env-stop build env-start

env-restart: env-stop env-start

bash: ## Open a bash shell in project's main container
	docker exec -it ${CONTAINER_NAME} bash

view-logs: ## Display interactive logs
	$(DOCKER_COMMAND) logs -f

test: ## Run test
	docker exec -it ${CONTAINER_NAME} npm run test
