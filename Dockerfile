FROM node:14-alpine
RUN apk add \
    bash \
    lcms2-dev \
    libpng-dev \
    python3 \
    bash \
    g++ \
    gcc \
    autoconf \
    automake \
    make \
    musl-dev \
    autoconf \
    automake \
    make \
    libtool \
    nasm \
    tiff \
    jpeg \
    zlib \
    zlib-dev \
    file \
    pkgconf \
    && rm -rf /var/cache/apk/*
ARG APPLICATION_PATH=/app
ARG FIREBASE_CONFIG
ARG GRAPHQL_URL
ARG API_URL
ARG SENTRY_DSN
ARG SEGMENT_WRITEKEY
ARG APP_ENV
ARG SEGMENT_WRITEKEY
ARG GOOGLE_MAPS_API_KEY
ENV FIREBASE_CONFIG $FIREBASE_CONFIG
ENV GRAPHQL_URL $GRAPHQL_URL
ENV API_URL $API_URL
ENV SENTRY_DSN $SENTRY_DSN
ENV SEGMENT_WRITEKEY $SEGMENT_WRITEKEY
ENV APP_ENV $APP_ENV
ENV GOOGLE_MAPS_API_KEY $GOOGLE_MAPS_API_KEY
WORKDIR ${APPLICATION_PATH}
ADD ./ ./
RUN yarn && yarn build
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
ENTRYPOINT yarn start
EXPOSE 8080
HEALTHCHECK --interval=12s --timeout=12s --start-period=30s CMD node healthcheck.js
