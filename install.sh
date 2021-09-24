#!/bin/bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
cd NodeJS
npm install
node src/mongoose/db/defaultDB.js
cd ../test
npm install

python3 -m pip install chromedriver-binary-auto; python3 -c "import chromedriver_binary"; if ! grep -q "chromedriver" ~/.bashrc; then echo "export PATH=\$PATH:/home/labuser/.local/lib/python3.5/site-packages/chromedriver_binary/chromedriver" >> ~/.bashrc; fi


