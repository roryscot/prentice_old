#!/usr/bin/env bash
echo ''
echo 'Starting django ssl development server...'
echo ''

python manage.py runsslserver --settings=configuration.dev_settings