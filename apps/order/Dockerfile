FROM public.ecr.aws/docker/library/node:18-alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -g pnpm

COPY apps/order apps/order
COPY libs libs


RUN pnpm install -r 

RUN pnpm run build order

FROM public.ecr.aws/docker/library/node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --prod

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 8001

CMD ["node", "dist/apps/order/main"]