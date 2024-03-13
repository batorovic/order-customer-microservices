
# Order and Customer Microservices Project

This project demonstrates a microservices architecture with a focus on managing orders and customers. It utilizes Docker for containerization, enabling easy deployment and scalability.

## Quick Start

To get this project up and running on your system, ensure you have Docker, Docker Compose, and pnpm installed.

### Steps to Run

1. Clone the project repository:
```bash
git clone https://github.com/batorovic/order-customer-microservices.git
```

2. Enter the project directory:
```bash
cd order-customer-microservices
```

3. Prepare the environment and build the project:
```bash
pnpm run prep-and-build
```
This command performs the following actions:
- Installs all necessary dependencies.
- Runs the automated tests to ensure everything is in order.
- Builds Docker images for the services.


## Built With

- NestJS - A progressive Node.js framework for building efficient and scalable server-side applications.
- Docker & Docker Compose - For containerizing and orchestrating the microservices.
- MongoDB - NoSQL database for storing data.
- BullMQ: Manages events and background tasks in the microservices architecture, using Redis for reliable queuing and job processing, facilitating efficient inter-service communication.


