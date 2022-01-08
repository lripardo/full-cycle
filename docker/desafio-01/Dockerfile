FROM golang:latest as builder
LABEL stage=intermediate
WORKDIR /go/src/desafio-01
COPY main.go .
RUN GO111MODULE=off go build -ldflags "-s -w" -o app

FROM scratch
COPY --from=builder /go/src/desafio-01/app .
ENTRYPOINT ["./app"]