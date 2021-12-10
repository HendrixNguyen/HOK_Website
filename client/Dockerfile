FROM nobidev/nodejs:16

ADD --chown=admin package.json /app/

RUN yarn

ADD --chown=admin . /app/

RUN yarn build

FROM nobidev/nginx-ssl

RUN sudo rm /etc/nginx/snippets/http.d/90-redirect.conf

COPY --from=0 /app/build/ /app/
