from rest_framework import serializers

from .models import AssignmentWeek, Assignment


class AssignmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Assignment
        fields = '__all__'


class AssignmentWeekSerializer(serializers.ModelSerializer):
    assignments = AssignmentSerializer(read_only=True, many=True)

    class Meta:
        model = AssignmentWeek
        fields = '__all__'