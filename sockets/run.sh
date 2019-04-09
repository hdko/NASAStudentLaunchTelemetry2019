#!/bin/bash
#run as ./run.sh

sudo pkill sudo
sudo pkill python3

function timestamp {
    date
}

LOGPATH=./data/"$(date +%d-%m-%Y_%H:%M:%S)".txt

#cd ./maps
#sudo docker run --rm -v $(pwd):/data -p 8090:80 klokantech/openmaptiles-server &
#cd ..

sudo nice -20 python3 readdata.py > $LOGPATH & websocketd --port=8080 --staticdir=. tail -f $LOGPATH
#sudo nice -20 python3 readdata.py > ./data/"$(timestamp)".txt & sudo websocketd --port=8080 --staticdir=. sudo python3 readdata.py
