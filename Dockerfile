FROM node:18.7

RUN mkdir -p /app
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package*.json /app/
COPY ./ /app/

RUN truffle init -y && truffle migrate

CMD ["npm", "start"]
