FROM node:14.15 AS ui-build
WORKDIR /usr/src/app
COPY front/ ./front/
RUN cd front && npm install @angular/cli && npm install --force && npm run build

FROM node:14.15 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/front/dist ./front/dist
COPY api/package*.json ./
RUN npm install
COPY api/. .

EXPOSE 8081



CMD ["node", "index.js"]
