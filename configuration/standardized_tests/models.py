from django.db import models
from django.core.validators import MaxValueValidator
from django.core.exceptions import ValidationError, ImproperlyConfigured
from django.utils.translation import ugettext as _


import re


class CategoryManager(models.Manager):

    def new_category(self, category):
        new_category = self.create(category=re.sub('\s+', '-', category)
                                   .lower())

        new_category.save()
        return new_category


class Category(models.Model):

    category = models.CharField(
        verbose_name=_("Category"),
        max_length=250, blank=True,
        unique=True, null=True)

    objects = CategoryManager()

    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")

    def __str__(self):
        return self.category


'''
Base Classes: https://github.com/tomwalker/django_quiz
'''


class StandardizedTest(models.Model):
    """
    Base class for all question types.
    Shared properties placed here.
    """
    type = models.CharField(
        verbose_name="Type of Test",
        max_length=100, blank=False)

    title = models.CharField(
        verbose_name=_("Title"),
        max_length=60, blank=False)

    description = models.TextField(
        verbose_name=_("Description"),
        blank=True, help_text=_("a description of the test"))

    url = models.SlugField(
        max_length=60, blank=False,
        help_text=_("a user friendly url"),
        verbose_name=_("user friendly url"))

    category = models.ForeignKey(
        Category, null=True, blank=True,
        verbose_name=_("Category"),
        on_delete=models.CASCADE)

    random_order = models.BooleanField(
        blank=False, default=False,
        verbose_name=_("Random Order"),
        help_text=_("Display the questions in "
                    "a random order or as they "
                    "are set?"))

    max_questions = models.PositiveIntegerField(
        blank=True, null=True, verbose_name=_("Max Questions"),
        help_text=_("Number of questions to be answered on each attempt."))

    exam_paper = models.BooleanField(
        blank=False, default=True,
        help_text=_("If yes, the result of each"
                    " attempt by a user will be"
                    " stored. Necessary for marking."),
        verbose_name=_("Exam Paper"))

    single_attempt = models.BooleanField(
        blank=False, default=False,
        help_text=_("If yes, only one attempt by"
                    " a user will be permitted."
                    " Non users cannot sit this exam."),
        verbose_name=_("Single Attempt"))

    goal_score = models.SmallIntegerField(
        blank=True, default=0,
        verbose_name=_("Pass Mark"),
        help_text=_("Percentage required to pass exam."),
        validators=[MaxValueValidator(100)])

    success_text = models.TextField(
        blank=True, help_text=_("Displayed if user achieves goal score."),
        verbose_name=_("Success Text"))

    fail_text = models.TextField(
        verbose_name=_("Fail Text"),
        blank=True, help_text=_("Displayed if user fails to achieve goal score."))

    def save(self, force_insert=False, force_update=False, *args, **kwargs):
        self.url = re.sub('\s+', '-', self.url).lower()

        self.url = ''.join(letter for letter in self.url if
                           letter.isalnum() or letter == '-')

        if self.single_attempt is True:
            self.exam_paper = True

        if self.goal_score > 100:
            raise ValidationError('%s is above 100' % self.goal_score)

        super(StandardizedTest, self).save(force_insert, force_update, *args, **kwargs)

    class Meta:
        verbose_name = _("Standardized Test")
        verbose_name_plural = _("Standardized Tests")

    def __str__(self):
        return self.title

    def get_questions(self):
        return self.question_set.all().select_subclasses()

    @property
    def get_max_score(self):
        return self.get_questions().count()

    def anon_score_id(self):
        return str(self.id) + "_score"

    def anon_q_list(self):
        return str(self.id) + "_q_list"

    def anon_q_data(self):
        return str(self.id) + "_data"


class StandardizedTestSection(models.Model):
    """
    Base class for all question types.
    Shared properties placed here.
    """
    test = models.ForeignKey(
        StandardizedTest,
        verbose_name="Test",
        help_text="The test to which the section belongs",
        on_delete=models.CASCADE)

    number = models.SmallIntegerField(
        verbose_name=_("Section Number"), blank=False)

    category = models.ForeignKey(
        Category, null=True, blank=True,
        verbose_name=_("Category"),
        on_delete=models.CASCADE)

    random_order = models.BooleanField(
        blank=False, default=False,
        verbose_name=_("Random Order"),
        help_text=_("Display the questions in "
                    "a random order or as they "
                    "are set?"))

    max_questions = models.PositiveIntegerField(
        blank=True, null=True, verbose_name=_("Max Questions"),
        help_text=_("Number of questions to be answered on each attempt."))

    answers_at_end = models.BooleanField(
        blank=False, default=True,
        help_text=_("Correct answer is NOT shown after question."
                    " Answers displayed at the end."),
        verbose_name=_("Answers at end"))

    exam_paper = models.BooleanField(
        blank=False, default=True,
        help_text=_("If yes, the result of each"
                    " attempt by a user will be"
                    " stored. Necessary for marking."),
        verbose_name=_("Exam Paper"))

    single_attempt = models.BooleanField(
        blank=False, default=False,
        help_text=_("If yes, only one attempt by"
                    " a user will be permitted."
                    " Non users cannot sit this exam."),
        verbose_name=_("Single Attempt"))

    goal_score = models.SmallIntegerField(
        blank=True, default=0,
        verbose_name=_("Pass Mark"),
        help_text=_("Percentage required to pass exam."),
        validators=[MaxValueValidator(100)])

    success_text = models.TextField(
        blank=True, help_text=_("Displayed if user achieves goal score."),
        verbose_name=_("Success Text"))

    fail_text = models.TextField(
        verbose_name=_("Fail Text"),
        blank=True, help_text=_("Displayed if user fails to achieve goal score."))

    draft = models.BooleanField(
        blank=True, default=False,
        verbose_name=_("Draft"),
        help_text=_("If yes, the quiz is not displayed"
                    " in the quiz list and can only be"
                    " taken by users who can edit"
                    " quizzes."))

    def save(self, force_insert=False, force_update=False, *args, **kwargs):
        self.url = re.sub('\s+', '-', self.url).lower()

        self.url = ''.join(letter for letter in self.url if
                           letter.isalnum() or letter == '-')

        if self.single_attempt is True:
            self.exam_paper = True

        if self.pass_mark > 100:
            raise ValidationError('%s is above 100' % self.pass_mark)

        super(StandardizedTest, self).save(force_insert, force_update, *args, **kwargs)

    class Meta:
        verbose_name = _("Standardized Test")
        verbose_name_plural = _("Standardized Tests")

    def __str__(self):
        return self.title

    def get_questions(self):
        return self.question_set.all().select_subclasses()

    @property
    def get_max_score(self):
        return self.get_questions().count()

    def anon_score_id(self):
        return str(self.id) + "_score"

    def anon_q_list(self):
        return str(self.id) + "_q_list"

    def anon_q_data(self):
        return str(self.id) + "_data"




class Question(models.Model):
    """
    Base class for all question types.
    Shared properties placed here.
    """

    test_section = models.ManyToManyField(
        StandardizedTestSection,
        verbose_name=_("Test Section"),
        blank=True)
    question_number = models.SmallIntegerField(
        "Question Number",
        blank=True)

    category = models.ForeignKey(
        Category,
        verbose_name=_("Category"),
        blank=True,
        null=True,
        on_delete=models.CASCADE)

    figure = models.ImageField(
        upload_to='uploads/%Y/%m/%d',
        blank=True,
        null=True,
        verbose_name=_("Figure"))

    content = models.CharField(
        max_length=1000,
        blank=False,
        help_text=_("Enter the question text that "
                    "you want displayed"),
        verbose_name=_('Question'))

    explanation = models.TextField(max_length=2000,
                                   blank=True,
                                   help_text= ("Explanation to be shown "
                                               "after the question has "
                                               "been answered."),
                                   verbose_name=_('Explanation'))


    class Meta:
        verbose_name = _("Question")
        verbose_name_plural = _("Questions")
        ordering = ['category']

    def __str__(self):
        return self.content


ANSWER_ORDER_OPTIONS = (
    ('content', ('Content')),
    ('random', ('Random')),
    ('none', ('None'))
)


class MCQuestion(Question):

    answer_order = models.CharField(
        max_length=30, null=True, blank=True,
        choices=ANSWER_ORDER_OPTIONS,
        help_text = ("The order in which multichoice "
                    "answer options are displayed "
                    "to the user"),
        verbose_name = ("Answer Order"))

    def check_if_correct(self, guess):
        answer = Answer.objects.get(id=guess)

        if answer.correct is True:
            return True
        else:
            return False

    def order_answers(self, queryset):
        if self.answer_order == 'content':
            return queryset.order_by('content')
        if self.answer_order == 'random':
            return queryset.order_by('?')
        if self.answer_order == 'none':
            return queryset.order_by()
        return queryset

    def get_answers(self):
        return self.order_answers(Answer.objects.filter(question=self))

    def get_answers_list(self):
        return [(answer.id, answer.content) for answer in
                self.order_answers(Answer.objects.filter(question=self))]

    def answer_choice_to_string(self, guess):
        return Answer.objects.get(id=guess).content

    class Meta:
        verbose_name = _("Multiple Choice Question")
        verbose_name_plural = _("Multiple Choice Questions")


class Answer(models.Model):
    question = models.ForeignKey(
        MCQuestion,
        verbose_name=_("Question"),
        on_delete=models.CASCADE)

    content = models.CharField(max_length=1000,
                               blank=False,
                               help_text=_("Enter the answer text that "
                                           "you want displayed"),
                               verbose_name=_("Content"))

    correct = models.BooleanField(blank=False,
                                  default=False,
                                  help_text=_("Is this a correct answer?"),
                                  verbose_name=_("Correct"))

    def __str__(self):
        return self.content

    class Meta:
        verbose_name = _("Answer")
        verbose_name_plural = _("Answers")