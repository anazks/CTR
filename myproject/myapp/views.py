from django.shortcuts import  redirect, render
from . models import *
from django.contrib import messages
from django.contrib.auth import authenticate,login,logout

def home(request):
    context = {}
    return render(request, "abc/ad_login.html", context)


def ad_login(request):
    if request.method == "POST":
        username = request.POST.get('uname')
        password = request.POST.get('pswd')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("ad_home")
        else:
            messages.error(request, 'Username or password incorrect')
            return redirect('ad_login')
    return render(request, 'abc/ad_login.html')



def signout(request):
    logout(request)
    return redirect('home')  

def ad_home(request):
    context = {}
    return render(request, "abc/ad_home.html", context)