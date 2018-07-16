from .dev_settings import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "dist","bundles"),
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, "dist", "bundles"), ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WEBPACK_LOADER = {
    'DEFAULT': {
            'BUNDLE_DIR_NAME': 'bundles/',
            'STATS_FILE': os.path.join(BASE_DIR, 'webpack-stats.prod.json'),
        }
}