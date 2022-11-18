FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . /usr/src/app/
EXPOSE 80
CMD [ "npm", "start" ]