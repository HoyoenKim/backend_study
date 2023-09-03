FROM node:lts-buster
LABEL author hoyeonKim

COPY . /user/src/app

WORKDIR /user/src/app
RUN npm ci

RUN npm run build

EXPOSE 3000
CMD npm run start