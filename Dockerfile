FROM mhart/alpine-node-auto
RUN mkdir /game-controller -p
WORKDIR /game-controller
COPY package.json .
RUN npm install --production
COPY . .
CMD ["npm", "start", "--production"]
