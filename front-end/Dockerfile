FROM --platform=linux/amd64 node:12.18.1

ENV PORT=80
ENV REACT_APP_BACKEND_URL="https://manhpn.api.internship.designveloper.com/api"

WORKDIR /front-end

COPY ["package.json", "package-lock.json*", "./"]
#COPY package*.json .

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

#CMD [ "npm", "start" ]

# FROM nginx:1.21.0-alpine as production
# ENV NODE_ENV production
# COPY --from=builder /app/build /usr/share/nginx/html
# ADD your nginx.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# RUN the "dev" script in package.json
# CMD ["nginx", "-g", "daemon off;"]
