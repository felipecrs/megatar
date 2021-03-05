FROM gitpod/workspace-base

# Install volta
ENV VOLTA_HOME="${HOME}/.volta"
ENV PATH="${VOLTA_HOME}/bin:${PATH}"
RUN bash -c "$(curl -fsSL https://get.volta.sh)" -- --skip-setup
