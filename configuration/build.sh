#!/usr/bin/env bash

echo 'Build initialized ..'
echo 'Checking environment ..'

command -v python >/dev/null 2>&1 || {
	echo $'\'python\' command not found...\nplease install python before continuing..' >&2;
	exit -1;
}

command -v pip >/dev/null 2>&1 || {
	echo $'\'pip\' command not found...\nplease install pip before continuing..' >&2;
	exit -1;
}

echo 'Installing dependencies ...'
pip install -U pip
pip install pipreqs
pip install -r requirements.txt
echo 'Dependencies installation done'

OS_NAME=$(uname)
if [[ "$OS_NAME" == CYGWIN* || "$OS_NAME" == MINGW* ]]; then
	pip install waitress
else
	pip install gunicorn
fi

echo 'WSGI server installation done'
echo 'Build successful!'
