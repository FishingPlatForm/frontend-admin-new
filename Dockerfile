FROM node:latest
COPY sources.list /etc/apt/sources.list

RUN apt update -y

RUN npm config set registry https://registry.npmmirror.com
RUN mkdir -p /app
COPY . /app
WORKDIR /app
RUN npm install
RUN npm install @craco/craco --save
# RUN npm install -g serve
ONBUILD ENTRYPOINT ["/app"]