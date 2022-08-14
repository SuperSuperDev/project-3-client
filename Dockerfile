# Pull Docker Hub base image
FROM node:16.13.0-alpine3.14
# Set working directory
WORKDIR /usr/app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# Install app dependencies
COPY package*.json ./
RUN mkdir -p /usr/app/node_modules
RUN chown node:node /usr/app/node_modules
RUN npm install -qy
# Copy app to container
COPY . .
# build and run app
RUN node -v
# RUN npm run build
# RUN npm install -g serve
# CMD ["serve" "-s" "build"]
# Run the "start" script in package.json
CMD ["npm", "run", "start"]