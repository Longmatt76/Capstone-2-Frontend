FROM node:16.13-alpine AS Production

WORKDIR /capstone2

# ENV NODE_ENV =production
ENV PORT=3000

COPY package*.json ./

COPY . .

RUN npm ci

EXPOSE 3000

CMD ["npm", "start"]