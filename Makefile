TEST = test/*.js

CSS = static/css/
LESS = static/css/less/

.PHONY: test

build: build-bootstrap build-jquery compile-less

# Need to do a rm -rf/ hack since the Makefile is broken.
build-bootstrap: clean-bootstrap
	cd static/bootstrap && make bootstrap

build-jquery:
	cd static/jquery && make all

compile-less:
	for file in $(LESS)*.less; do \
		lessc $${file} > `echo $${file} | sed "s|\.less|\.css|"`; \
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
