FROM --platform=linux/amd64 node:alpine

ENV PORT=80

ENV DATABASE_CONNECTION='mongodb+srv://admin:manhmanh123@cluster0.skgap.mongodb.net/?retryWrites=true&w=majority'

WORKDIR /back-end

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD [ "node", "index.js" ]