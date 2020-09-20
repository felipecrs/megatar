# Note: You can use any Debian/Ubuntu based image you want.
FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu

# script-library options
ARG SCRIPT_LIBRARY_URL=https://raw.githubusercontent.com/microsoft/vscode-dev-containers/master/script-library
ARG USERNAME=vscode

# node-debian.sh options
ARG NODE_VERSION="lts/*"
ENV NVM_DIR=/usr/local/share/nvm
ENV NVM_SYMLINK_CURRENT=true \
  PATH=${NVM_DIR}/current/bin:${PATH}

# docker-debian.sh options
ARG ENABLE_NONROOT_DOCKER="true"
ARG SOURCE_SOCKET=/var/run/docker-host.sock
ARG TARGET_SOCKET=/var/run/docker.sock

# Use Node script from script library to set things up
RUN bash -c "$(curl -fsSL "$SCRIPT_LIBRARY_URL/node-debian.sh")" -- "${NVM_DIR}" "${NODE_VERSION}" "${USERNAME}" \
  # Use Docker script from script library to set things up
  && bash -c "$(curl -fsSL "$SCRIPT_LIBRARY_URL/docker-debian.sh")" -- "${ENABLE_NONROOT_DOCKER}" "${SOURCE_SOCKET}" "${TARGET_SOCKET}" "${USERNAME}" \
  # Clean up
  && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/* /tmp/library-scripts/

# Setting the ENTRYPOINT to docker-init.sh will configure non-root access to
# the Docker socket if "overrideCommand": false is set in devcontainer.json.
# The script will also execute CMD if you need to alter startup behaviors.
ENTRYPOINT [ "/usr/local/share/docker-init.sh" ]
CMD [ "sleep", "infinity" ]

RUN npm install -g commitizen
