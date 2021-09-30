FROM ubuntu:18.04

RUN apt-get update && \
    apt-get upgrade -y

RUN apt-get install -y sudo

RUN useradd runner -U -r -m -s $(which bash)

RUN echo '%runner ALL=(ALL:ALL) NOPASSWD:ALL' > /etc/sudoers.d/runner

USER runner

RUN sudo apt-get install -y curl wget git jq

RUN NVM_RELEASE=$(curl -o- https://api.github.com/repos/nvm-sh/nvm/releases/latest | jq -r ".tag_name") && \
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/${NVM_RELEASE}/install.sh | bash

RUN NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")" && \
    sudo ln -sf ${NVM_DIR} /usr/local/lib/nvm

ENV NVM_DIR=/usr/local/lib/nvm

RUN . ${NVM_DIR}/nvm.sh && \
    nvm install 16

RUN . ${NVM_DIR}/nvm.sh && \
    npm install --global npm && \
    sudo ln -sf $(which node) /usr/local/bin/ && \
    sudo ln -sf $(which npm) /usr/local/bin/

RUN . ${NVM_DIR}/nvm.sh && \
    npm install --global yarn && \
    sudo ln -sf $(which yarn) /usr/local/bin/

COPY --chown=runner server/package.json /app/

WORKDIR /app

RUN yarn

COPY --chown=runner server/ /app/

RUN yarn

CMD [ "yarn", "start" ]