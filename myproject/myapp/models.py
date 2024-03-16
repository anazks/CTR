from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Adds(models.Model):  # Fixed typo from CreateAdd to CreateAd
    name = models.CharField(max_length=100, null=True, blank=True)
    price = models.CharField(max_length=100, null=True, blank=True)
    offer_price = models.CharField(max_length=100, null=True, blank=True)
    description = models.CharField(max_length=250, null=True, blank=True)

class Ctr(models.Model):
    addId = models.CharField(max_length=100, null=True, blank=True)
    UserName =  models.CharField(max_length=100, null=True, blank=True)
    Email = models.CharField(max_length=100, null=True, blank=True)


class Users(models.Model):
    UserName =  models.CharField(max_length=100, null=True, blank=True)
    Email = models.CharField(max_length=100, null=True, blank=True)
    Password =  models.CharField(max_length=100, null=True, blank=True)
   

    