FROM alpine
# base - linux на минималках

RUN apk add --update redis
RUN apk add --update gcc
# exec prepare custom image

CMD [ "redis-server" ]
# exec in container