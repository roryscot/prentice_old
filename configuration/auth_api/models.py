from django.contrib.auth.models import AbstractUser
from django.db import models

from standardized_tests.models import StandardizedTest
from assignments.models import AssignmentWeek


class Institution(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100)
    rating = models.SmallIntegerField()


class User(AbstractUser):
    app_label = "User"
    created_at = models.DateTimeField(auto_now_add=True)
    is_student = models.BooleanField(default=False)
    is_tutor = models.BooleanField(default=False)
    is_entrepreneur = models.BooleanField(default=False)
    institution = models.ForeignKey(Institution, related_name="users", on_delete=models.PROTECT, null=True)


    def __str__(self):
        """Returns the person's full name."""
        return '%s %s' % (self.first_name, self.last_name)


class Entrepreneur(models.Model):
    entrepreneur_id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)


class Student(models.Model):
    student_id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    tests = models.ManyToManyField(StandardizedTest, related_name="students")
    assignments = models.ManyToManyField(AssignmentWeek, related_name="students")


class Tutor(models.Model):
    tutor_id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    rating = models.SmallIntegerField()
    students = models.ManyToManyField(Student, through='Tutoring')


class Relative(models.Model):
    '''
    Parents etc. may want to view and appraise their children's success. These user accounts
    will give them read access to their child's information.
    '''
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    students = models.ManyToManyField(Student)

class Tutoring(models.Model):
    '''
    This is an intermediary table to keep track of the tutoring details
    with respect to students and tutors.
    '''

    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    tutor = models.ForeignKey(Tutor, on_delete=models.CASCADE)
    start_date = models.DateField()

