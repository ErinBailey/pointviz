from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect
from django.contrib import auth
from django.core.context_processors import csrf
#cross-site request forgery 



def index(request):
	return render(request, 'index.html', {})
