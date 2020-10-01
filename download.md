# Download the code

You can find a regular version of the server in Github with a free and open
source license (MIT). Apisearch is built on top of **PHP**, so you will need
[Composer](https://getcomposer.org) if you want to download the dependencies.

```bash
git clone https://github.com/apisearch-io/search-server.git
cd search-server
composer.phar install
```

> This is the Apisearch server layer and doesn't include Elasticsearch nor any
> other infrastructure dependency like Redis or Mysql.

## Download an image

If you want to deploy a regular version of the server, then you can use our
**Docker** image from the Docker hub registry

```bash
docker run -it apisearchio/search-server:latest
```

As you can see in [The server configuration](server-configuration.md) chapter, this creates an
empty server instance running, not even attached to any Elasticsearch node, and
with no tokens configured, so will be completely unreachable. Read that chapter
for more configuration information.

## Download a demo

If you just want to download a testing environment, then you can start with our
basic infrastructure demo, a basic setup with some of our plugins enabled. You
will just these two dependencies.

- [docker](https://docs.docker.com/install/)
- [docker-compose](https://docs.docker.com/compose/install/).

Until there's no stable releases, we will work with the HEAD of master version.

```bash
wget --no-check-certificate --content-disposition -O basic-infrastructure.tar.gz https://github.com/apisearch-io/basic-infrastructure/archive/master.tar.gz
tar -xvzf basic-infrastructure.tar.gz
cd basic-infrastructure-master
docker-compose up
```