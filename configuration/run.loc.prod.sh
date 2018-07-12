#!/usr/bin/env bash

echo "Starting server with production settings."
python manage.py runserver --settings=configuration.production_settings.py