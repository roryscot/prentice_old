from django.db import models
from django.utils import timezone

class AssignmentWeek(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    assignment_week_title = models.CharField(max_length=75)

    def __str__(self):
        return "{}".format(self.assignment_week_title)

class Assignment(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    assignment_title = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    complete = models.BooleanField(default=False)
    due_date = models.DateField(default=timezone.now)

    assignment_week_group = models.ForeignKey(AssignmentWeek, related_name="assignments", on_delete="cascade")

    development_points = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return "Task: {}".format(self.assignment_title)
