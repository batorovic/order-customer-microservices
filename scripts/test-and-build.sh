set -e

echo "Running tests for the order service..."
pnpm exec jest order

echo "Running tests for the customer service..."
pnpm exec jest customer

echo "Tests passed. Proceeding with Docker compose build and up."

docker-compose -f "docker-compose.yaml" up -d --build api-gateway mongo customer redis log order

echo "Docker containers are up and running."
