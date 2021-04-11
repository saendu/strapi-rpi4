FROM node:12-alpine

RUN mkdir /srv/app && chown 1000:1000 -R /srv/app
WORKDIR /srv/app

COPY package.json ./
COPY yarn.lock ./
COPY nodemon.json ./

# ENV NODE_ENV production

RUN yarn config set network-timeout 600000
RUN yarn global add strapi

# RUN yarn --frozen-lockfile

# RUN yarn build

COPY . .

EXPOSE 1337

COPY docker-entrypoint.sh /usr/local/bin/
ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["strapi", "develop"]
# CMD ["strapi", "start"]
