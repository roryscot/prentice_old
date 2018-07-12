
from django.conf.urls import include, url
from rest_framework import routers

from .api import NoteViewSet

router = routers.DefaultRouter()
router.register('^', NoteViewSet, 'notes')


urlpatterns = [
    url("^", include(router.urls)),
]