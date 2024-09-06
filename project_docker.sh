#!/bin/bash

# NOT: Eğer linux üzeriden çalıştıracaksanız chmod ile çalıştırma yetkisini vermeliyiz
# x: eXecute
chmod +x project_docker.sh

# Docker Compose 
# docker-compose up -d

# Docker Compose ile tüm servisleri ayağa kaldır
docker-compose up --build