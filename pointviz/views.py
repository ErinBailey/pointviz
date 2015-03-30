from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect
from django.contrib import auth
from django.core.context_processors import csrf
import sys
import os
import subprocess
#cross-site request forgery 



def index(request):
	return render(request, 'index.html', {})

def request_page(request):
	subprocess.call('python test_query.py', shell=True)
	return render(request, 'index.html', {})
