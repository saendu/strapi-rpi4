FROM node:12

WORKDIR /

# COPY package.json ./
COPY package.json yarn.lock ./

# ENV NODE_ENV production

RUN yarn config set network-timeout 600000
RUN yarn --frozen-lockfile

RUN yarn build

COPY . .

EXPOSE 1337

CMD ["strapi", "develop"]
