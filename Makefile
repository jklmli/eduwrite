TEST = test/*.js

CSS = static/css/
LESS = static/css/less/

.PHONY: test

# Hacky fix so build-bootstrap can access node_modules tools
PATH := ${PATH}:../../node_modules/less/bin:../../node_modules/uglify-js/bin
export PATH

build: build-submodules build-bootstrap build-jquery compile-less

build-submodules:
	git submodule init && git submodule update
	cd static/jquery && git submodule init && git submodule update

# Need to do a rm -rf/ hack since the Makefile is broken.
build-bootstrap: clean-bootstrap
	cd static/bootstrap && make bootstrap

build-jquery:
	cd static/jquery && make all

compile-less:
	for file in $(LESS)*.less; do \
		(node_modules/less/bin/lessc $${file} || lessc $${file}) > `echo $${file} | sed "s|\.less|\.css|"`; \
	done
	mv $(LESS)*.css $(CSS)

clean: clean-bootstrap clean-jquery

clean-bootstrap:
	rm -rf static/bootstrap/bootstrap/

clean-jquery:
	cd static/jquery && make clean

test:
	@NODE_ENV=test mocha \
			--require should \
			--reporter list \
			--slow 20 \
			--growl \
			$(TEST)
