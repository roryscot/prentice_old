from rest_framework import viewsets, permissions


from .serializers import AssignmentWeekSerializer, AssignmentSerializer
from .models import AssignmentWeek, Assignment

class AssignmentWeekViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    queryset = AssignmentWeek.objects.all()
    serializer_class = AssignmentWeekSerializer

    def get_queryset(self):
        return self.queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class AssignmentViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer

    def get_queryset(self):
        return self.queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    # def perform_update(self, serializer):
    #     serializer.save(owner=self.request.user)


