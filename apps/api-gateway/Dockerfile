FROM public.ecr.aws/docker/library/node:18-alpine AS development

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -g pnpm

COPY apps/api-gateway apps/api-gateway
COPY libs libs 

RUN pnpm install -r

RUN pnpm run build api-gateway

FROM public.ecr.aws/docker/library/node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --prod

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 8000

CMD ["node", "dist/apps/api-gateway/main"]