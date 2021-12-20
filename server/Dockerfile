FROM node:12 as dependencies

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
RUN npm ci --only=production

FROM node:12 as build
WORKDIR /usr/src/app
COPY . .

RUN npm ci
RUN npm run build
RUN npm run copy-to-dist

FROM node:12
WORKDIR /usr/src/app

# Bundle app source
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/build ./build
COPY package*.json ./
COPY config ./config
EXPOSE 4001
CMD [ "npm", "run", "start" ]
