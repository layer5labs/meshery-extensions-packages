# Copyright Layer5, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

include ../install/Makefile.show-help.mk

## Install site dependencies
setup:
	npm install; cd ..

## Build and run site in development environment
site-dev:
	npm run start; cd ..

## Build site; generate static site
build:
	npm run build; cd ..

## Build and run site
site:
	npm start; cd ..

## Empty build cache and run layer5.io on your local machine.
clean: 
	gatsby clean; cd ..; make site

#-----------------------------------------------------------------------------
# Docker-based Builds
#-----------------------------------------------------------------------------

# ## Build and run site in a container
# docker:
# 	docker run --name site -d --rm -p 4000:4000 -v `pwd`:"/srv/jekyll" jekyll/jekyll:4.0.0 bash -c "bundle install; jekyll serve --drafts --livereload"

.PHONY: setup-libs site-setup build docker site setup
