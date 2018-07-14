from django.db import models
from configuration.dev_settings import AUTH_USER_MODEL
from auth_api.models import Student, Tutor

class Note(models.Model):
    text = models.CharField(max_length=255)
    owner = models.ForeignKey(AUTH_USER_MODEL, related_name="notes", on_delete=models.CASCADE, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text

class Progress_Report(Note):
    student = models.ForeignKey(Student, related_name="progress_reports", on_delete=models.CASCADE)
    tutor = models.ForeignKey(Tutor, related_name="progress_reports", on_delete=models.CASCADE)