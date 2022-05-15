FROM node:16.14.2 as Builder

WORKDIR /usr/dev/rogo-sh

COPY . .

RUN yarn install 

RUN yarn build 

FROM nginx:latest

COPY --from=Builder /usr/dev/rogo-sh/build/ /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]