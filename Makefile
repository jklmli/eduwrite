TEST = test/*.js

CSS = static/css/
LESS = static/css/less/

.PHONY: test

# Hacky fix so build-bootstrap can access node_modules tools
PATH := ${PATH}:../../node_modules/less/bin:../../node_modules/uglify-js/bin
export PATH

build: update-submodules build-bootstrap build-jquery compile-less


# Taken from jquery/jquery Makefile
#
# change pointers for submodules and update them to what is specified in jQuery
# --merge  doesn't work when doing an initial clone, thus test if we have non-existing
# submodules, then do an real update
update-submodules:
	@@echo "Updating submodules..."
	@@if [ -d .git ]; then \
		if git submodule status | grep -q -E '^-'; then \
			git submodule update --init --recursive; \
		else \
			git submodule update --init --recursive --merge; \
		fi; \
	fi;

# Need to do a rm -rf/ hack since the Makefile is broken.
# See https://github.com/twitter/bootstrap/pull/1672
build-bootstrap: clean-bootstrap
	@@echo "Building bootstrap..."
	@@cd static/bootstrap && make bootstrap

build-jquery:
	@@echo "Building jquery..."
	@@cd static/jquery && make core

compile-less:
	@@echo "Compiling .less files..."
	@@for file in $(LESS)*.less; do \
		(node_modules/less/bin/lessc $${file} || lessc $${file}) > `echo $${file} | sed "s|\.less|\.css|"`; \
	done
	@@mv $(LESS)*.css $(CSS)

clean: clean-bootstrap clean-jquery

clean-bootstrap:
	@@echo "Cleaning bootstrap..."
	@@rm -rf static/bootstrap/bootstrap/

clean-jquery:
	@@echo "Cleaning jquery..."
	@@cd static/jquery && make clean

test:
	@@NODE_ENV=test mocha \
			--require should \
			--reporter list \
			--slow 20 \
			--growl \
			$(TEST)
