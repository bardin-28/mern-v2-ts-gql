#!/usr/bin/env bash
#/---------------------------------------------------------
#| build.sh [env=local] [registry_user?] [registry_password?] [prune?]
#|---------------------------------------------------------
#| Examples:
#| ./build.sh
#| ./build.sh local
#| ./build.sh local gitlab-ci-token gitlab-ci-token-password --prune
#/
set +x

ENV=${1:-local}
ENV_FILE=".env.$ENV"
[ ! -f "$ENV_FILE" ] && ENV_FILE=".env.$ENV.example"
# shellcheck disable=SC1090
source "$ENV_FILE"

APP_IMAGE=${APP_IMAGE:-registry.gitlab.com/postalspy/frontend}
APP_VERSION=${APP_VERSION:-latest}
IMAGE="$APP_IMAGE:$APP_VERSION"
GIT_REV=$(git rev-parse --short HEAD)

REGISTRY=${APP_REGISTRY:-$APP_IMAGE}
REGISTRY_USER=${2}
REGISTRY_PASS=${3}
PRUNE=${4}

build() {
    docker build --pull -t "$IMAGE" --build-arg ENV="$ENV" .

    docker tag "$IMAGE" "$APP_IMAGE:$ENV"
    docker tag "$IMAGE" "$APP_IMAGE:$GIT_REV"
    docker tag "$IMAGE" "$APP_IMAGE:$GIT_REV-$ENV"

    # shellcheck disable=SC2086
    [[ -n $REGISTRY_USER && -n $REGISTRY_PASS ]] && docker login "$REGISTRY" -u $REGISTRY_USER -p $REGISTRY_PASS || docker login "$REGISTRY"
    docker push -a "$APP_IMAGE"

    # shellcheck disable=SC2046
    [[ -n $PRUNE ]] && docker rmi -f $(docker images "$IMAGE" -q) || echo "Skip prune."
}

main() {
    echo -e "\033[33mBuild started.\033[0m"
    set -ex
    build
    set +x
    echo -e "\n\033[32mBuild done!\033[0m"
}

main
