FROM node:current-alpine AS builder
WORKDIR /app
COPY . .
RUN ls
RUN yarn install
RUN yarn run build

FROM node:current-alpine
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "80", "-s", "."]