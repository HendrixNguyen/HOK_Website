FROM nobidev/nodejs:16

ADD --chown=admin package.json yarn.lock /app/

RUN yarn

ADD --chown=admin start.sh /etc/services.d/75-backend
ADD --chown=admin healthcheck.sh /etc/healthcheck.d/75-backend

ADD --chown=admin . /app/
