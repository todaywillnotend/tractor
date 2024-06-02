FROM node:18

LABEL maintainer="Tuesday <todaywillnotend@gmail.com>" \
      org.label-schema.vendor="Backend (strapi)" \
      org.label-schema.name="Backend (strapi) Docker image" \
      org.label-schema.description="Backend (strapi) containerized" \
      org.label-schema.url="https://strapi.io" \
      org.label-schema.vcs-url="https://github.com/strapi/strapi-docker" \
      org.label-schema.version=latest \
      org.label-schema.schema-version="1.0"

WORKDIR /usr/src/api

RUN echo "unsafe-perm = true" >> ~/.npmrc

RUN npm install -g @strapi/strapi@4.24.0

COPY ./scripts/strapi.sh ./
RUN chmod +x ./strapi.sh

EXPOSE 1337

COPY ./scripts/healthcheck.js ./
HEALTHCHECK --interval=15s --timeout=5s --start-period=30s \
      CMD node /usr/src/api/healthcheck.js

CMD ["./scripts/strapi.sh"]