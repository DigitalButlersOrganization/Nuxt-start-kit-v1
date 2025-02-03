build: ## Build containers
	docker compose build

up: ## Up containers
	docker compose up -d

down: ## Down containers in current project
	docker compose down
