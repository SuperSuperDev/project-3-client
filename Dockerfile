# # Pull Docker Hub base image
# FROM node:16.13.0-alpine3.14 as build
# # Set working directory
# RUN mkdir /usr/app
# WORKDIR /usr/app
# # add `/app/node_modules/.bin` to $PATH
# ENV PATH ./node_modules/.bin:$PATH
# # Install app dependencies
# COPY package*.json ./
# RUN mkdir -p /usr/app/node_modules
# RUN chown node:node /usr/app/node_modules
# RUN npm install -qy
# # Copy app to container
# COPY . ./
# # build and run app
# RUN node -v
# RUN npm run build
# # RUN npm install -g serve
# # CMD ["serve" "-s" "build"]
# # Run the "start" script in package.json
# # CMD ["npm", "run", "start"]

# # production build
# FROM nginx:stable-alpine
# COPY --from=build /usr/app/build /usr/share/nginx/html
# EXPOSE 4000
# CMD nginx -g 'daemon off;'
FROM node:16.13.0-alpine3.14 as builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV NODE_ENV production
ENV API_URL http://cloudify-server.capt.nonovium.com/api
COPY . /usr/src/app
RUN npm install
RUN npm run build

# production environment
FROM nginx:stable-alpine
ENV API_URL http://cloudify-server.capt.nonovium.com/api
RUN rm -rf /etc/nginx/conf.d
RUN mkdir -p /etc/nginx/conf.d
COPY ./default.conf /etc/nginx/conf.d/
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
