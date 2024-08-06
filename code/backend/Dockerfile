# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.11.1
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"
ENV PORT=3000
ENV DB_URL="postgresql://students_catalog_user:6ZGXArDApnsL8cxx1Lbp5dWEnC3aDPqb@dpg-cqp3krg8fa8c73c635ig-a.frankfurt-postgres.render.com/students_catalog"
ENV ACCESS_TOKEN_SECRET="f8899c68505302ae0095e9d40c809425750aa78d35a5285937557426f8c31a9ed595e587daf9da156284d2c0498a0193172c8dfb788f97c53dc8bc876b8d28d0"

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY package.json ./
RUN npm install

# Copy application code
COPY . .


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npm", "run", "start" ]
