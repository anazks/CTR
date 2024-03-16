from . import views
from django.urls import path

urlpatterns = [
    path("", views.home, name="home"),
    path("home", views.home, name="home"),
    path("ad_login", views.ad_login, name="ad_login"),
    path("ad_home", views.ad_home, name="ad_home"),
    path("signout", views.signout, name="signout"),





]



