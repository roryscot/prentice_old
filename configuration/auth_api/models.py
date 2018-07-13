from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # identifier = models.CharField(max_length=40, unique=True)

    app_label = "User"
    is_student = models.BooleanField(default=False)
    is_tutor = models.BooleanField(default=False)
    is_entrepreneur = models.BooleanField(default=False)

    # USERNAME_FIELD = 'identifier'
    # EMAIL_FIELD = models.EmailField(max_length=40, unique=True)
    # PASSWORD_FIELD = models.CharField(max_length=100)

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    # tests = models.ManyToManyField(Test, through='TakenTest')
    # interests = models.ManyToManyField(Subject, related_name='interested_students')