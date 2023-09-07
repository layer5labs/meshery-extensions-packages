FROM golang:1.19 as bd
ARG TOKEN
ARG GIT_VERSION
ARG GIT_COMMITSHA
RUN adduser --disabled-login appuser
WORKDIR /github.com/l5io/meshery-cloud
ADD . .
RUN GOSUMDB=off CGO_ENABLED=0 go build -ldflags="-w -s -X main.globalTokenForAnonymousResults=$TOKEN -X main.version=$GIT_VERSION -X main.commitsha=$GIT_COMMITSHA" -a -o /meshery-cloud .

FROM node:16 as ui
ARG ENVIRONMENT
ADD ui ui
RUN cd ui; npm install; npm run build-$ENVIRONMENT && npm run export; mv out /

# Removing GOPROXY=direct in RUN line, because of go.sum security issues causing failures in builds
# GOPROXY=direct

FROM alpine
RUN apk --update add ca-certificates
RUN mkdir /lib64 && ln -s /lib/libc.musl-x86_64.so.1 /lib64/ld-linux-x86-64.so.2
COPY --from=bd /etc/passwd /etc/passwd
COPY --from=bd /meshery-cloud /app/
COPY --from=ui /out /app/ui/out
USER appuser
WORKDIR /app/
ADD ui/docs/index.html /app/ui/docs/
ADD /models/openapi-schema/ /app/models/openapi-schema/
ADD /meshmodels/ /app/meshmodels/
ADD database.yml /app/database.yml
ADD migrations /app/migrations
CMD ./meshery-cloud
