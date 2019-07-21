FROM node:10

# Whoami
LABEL maintainer="Amin Shah Gilani <amin@gilani.me>"

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

# Run the app
CMD [ "npm", "run", "start" ]
