from django.contrib import admin
from .models import Organization, Athlete, Competition, Judge, Statistics, CompetitionParticipation, JudgeAssignment, User

admin.site.register(User)
admin.site.register(Organization)
admin.site.register(Athlete)
admin.site.register(Competition)
admin.site.register(Judge)
admin.site.register(Statistics)
admin.site.register(CompetitionParticipation)
admin.site.register(JudgeAssignment)
