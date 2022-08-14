# Pull Docker Hub base image
FROM node:16.13.0-alpine3.14
# Set working directory
WORKDIR /usr/app
# Install app dependencies
COPY package*.json ./
RUN npm install -qy
# Copy app to container
COPY . .
# build and run app
RUN node -v
RUN npm run build
# Run the "start" script in package.json
CMD ["npm", "run", "start"]