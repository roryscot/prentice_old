from .api import AssignmentWeekViewSet
from django.conf.urls import include, url

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'', AssignmentWeekViewSet)

# urlpatterns = router.urls
urlpatterns = [
    url("^", include(router.urls)),
]