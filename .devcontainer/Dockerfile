# Note: You can use any Debian/Ubuntu based image you want.
FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu

# Options
ARG SCRIPT_LIBRARY_VERSION="master"

ARG INSTALL_ZSH="true"
ARG UPGRADE_PACKAGES="true"
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

ARG NODE_VERSION="lts/*"
ENV NVM_DIR=/usr/local/share/nvm
ENV NVM_SYMLINK_CURRENT=true \
  PATH=${NVM_DIR}/current/bin:${PATH}

ARG ENABLE_NONROOT_DOCKER="true"
ARG SOURCE_SOCKET=/var/run/docker-host.sock
ARG TARGET_SOCKET=/var/run/docker.sock

ARG SCRIPT_LIBRARY_BASE_URL=https://raw.githubusercontent.com/microsoft/vscode-dev-containers/${SCRIPT_LIBRARY_VERSION}/script-library
# Install needed packages and setup non-root user. Use a separate RUN statement to add your own dependencies.
RUN curl -sSL -o- "$SCRIPT_LIBRARY_BASE_URL/common-debian.sh" \
  | bash -s -- "${INSTALL_ZSH}" "${USERNAME}" "${USER_UID}" "${USER_GID}" "${UPGRADE_PACKAGES}" \
  # Use Node script from script library to set things up
  && curl -fsSLo- "$SCRIPT_LIBRARY_BASE_URL/node-debian.sh" \
  | bash -s -- "${NVM_DIR}" "${NODE_VERSION}" "${USERNAME}" \
  # Use Docker script from script library to set things up
  && curl -fsSLo- "$SCRIPT_LIBRARY_BASE_URL/docker-debian.sh" \
  | bash -s -- "${ENABLE_NONROOT_DOCKER}" "${SOURCE_SOCKET}" "${TARGET_SOCKET}" "${USERNAME}" \
  # Clean up
  && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/* /tmp/library-scripts/

# Setting the ENTRYPOINT to docker-init.sh will configure non-root access to
# the Docker socket if "overrideCommand": false is set in devcontainer.json.
# The script will also execute CMD if you need to alter startup behaviors.
ENTRYPOINT [ "/usr/local/share/docker-init.sh" ]
CMD [ "sleep", "infinity" ]

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

RUN npm install -g commitizen
