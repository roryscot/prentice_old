#!/usr/bin/env bash
echo ''
echo 'Starting django development server...'
echo ''

python manage.py runserver --settings=configuration.dev_settings