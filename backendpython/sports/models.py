from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('organization_manager', 'Organization Manager'),
        ('judge', 'Judge'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='organization_manager')

    # Fix Many-to-Many related names for avoiding conflicts
    groups = models.ManyToManyField(Group, related_name="sports_users", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="sports_users_permissions", blank=True)

    class Meta:
        swappable = 'AUTH_USER_MODEL'


class Organization(models.Model):
    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='organization_logos/', blank=True, null=True)
    description = models.TextField(blank=True)
    contact_email = models.EmailField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="organizations")

    def __str__(self):
        return self.name


class Athlete(models.Model):
    name = models.CharField(max_length=255 ,default="")
    profile_image = models.ImageField(upload_to='athlete_profiles/', blank=True, null=True)
    bio = models.TextField(blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    organization = models.ForeignKey(Organization, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name


class Competition(models.Model):
    name = models.CharField(max_length=255)
    date = models.DateField()
    location = models.CharField(max_length=255)
    rules = models.TextField()
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name="competitions")

    def __str__(self):
        return self.name


class Judge(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    certification = models.CharField(max_length=255, blank=True)
    experience_years = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username


class CompetitionParticipation(models.Model):
    competition = models.ForeignKey(Competition, on_delete=models.CASCADE, related_name="participants")
    athlete = models.ForeignKey(Athlete, on_delete=models.CASCADE, related_name="competitions")
    score = models.FloatField(default=0.0, blank=True, null=True)

    class Meta:
        unique_together = ('competition', 'athlete')

    def __str__(self):
        return f"{self.athlete.name} - {self.competition.name}"


class Statistics(models.Model):
    athlete = models.ForeignKey(Athlete, on_delete=models.CASCADE, related_name="stats")
    matches_played = models.IntegerField(default=0)
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)
    average_score = models.FloatField(default=0.0)

    def __str__(self):
        return f"{self.athlete.name} Stats"


class JudgeAssignment(models.Model):
    competition = models.ForeignKey(Competition, on_delete=models.CASCADE, related_name="judges")
    judge = models.ForeignKey(Judge, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.judge.user.username} assigned to {self.competition.name}"
