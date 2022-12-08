#DOCKER FILE CONFIGS ACORDING TO: https://docs.docker.com/engine/reference/builder/

# INITIAL CONFIGS ================================
FROM node:latest
WORKDIR /app/
COPY . .

# BUILD PACKAGES =================================
RUN npm run build

# DELETE FOLDERS =================================
RUN rm -r apps
RUN rm -r scripts

# EXPOSE PORTS ===================================
EXPOSE $PORT

# RUN COMMAND ====================================
CMD npm run start
