# Running OpenMapTiles Map Server Locally

Install docker with the following command:
`curl -sSL https://get.docker.com/ | sh`


Docker script to run the map locally:
`docker run --rm -it -v $(pwd):/data -p 8080:80 klokantech/openmaptiles-server`

Website for locally hosting maps:
https://openmaptiles.com/server/
