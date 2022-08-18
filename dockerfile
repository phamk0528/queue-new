FROM node:14.17.5-alpine3.14 as builder
RUN mkdir -p /first-admin-queue
WORKDIR /first-admin-queue
COPY . .
RUN yarn install
RUN yarn build
ARG BUILD_ENV
RUN yarn ${BUILD_ENV}

FROM node:14.17.5-alpine3.14
RUN mkdir -p /second-admin-queue
WORKDIR /second-admin-queue
COPY --from=builder /first-admin-queue/node_modules node_modules
COPY --from=builder /first-admin-queue/build build
COPY package.json package.json
COPY public public
COPY src src


CMD ["yarn", "start"]