#  Create a new image from the base nodejs 8 image.

FROM node:12.18.4-alpine3.12

# Create the target directory in the image
RUN mkdir -p /usr/src/app

# Set the created directory as the working directory
WORKDIR /usr/src/app

# Copy the package.json inside the working directory
COPY package.json /usr/src/app

# Install required dependencies
RUN npm install

RUN npm install -g @angular/cli

# Copy the client application source files. You can use .dockerignore to exlcude files. Works just as .gitignore does.
COPY . /usr/src/app

# Open port 4200. This is the port that our development server uses
EXPOSE 4200

# Start the application. This is the same as running ng serve.
CMD ng serve --host 0.0.0.0 --disable-host-check
# CMD ["npm", "start"]
