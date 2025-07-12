FROM --platform=linux/amd64 node:20

EXPOSE 3000
WORKDIR /app
COPY package.json package-lock.json ./ 
RUN npm install
COPY . . 

ENTRYPOINT npm run start
