MODEL_TESTS = test/model/*.js
EASYSYNC_TESTS = test/easysync/*.js

CSS = static/css/
LESS = static/css/less/

.PHONY: run test

# Hacky fix so build-bootstrap can access node_modules tools
PATH := ${PATH}:../../node_modules/less/bin:../../node_modules/uglify-js/bin
export PATH

build: update-submodules update-node_modules build-submodules core

core: compile-less

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

update-node_modules:
	@@echo "Updating node modules..."
	@@npm install -d

build-submodules: build-bootstrap build-jquery

build-bootstrap:
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

clean: clean-node_modules clean-submodules

clean-node_modules:
	@@echo "Cleaning node modules..."
	@@rm -rf node_modules/

clean-submodules: clean-bootstrap clean-jquery

clean-bootstrap:
	@@echo "Cleaning bootstrap..."
	@@rm -rf static/bootstrap/bootstrap/

clean-jquery:
	@@echo "Cleaning jquery..."
	@@cd static/jquery && make clean

run: build
	@@bin/run.sh

test: easysync-tests model-tests 

model-tests: update-node_modules
	@@NODE_ENV=test node_modules/mocha/bin/mocha \
			--require should \
			--reporter list \
			--slow 20 \
			--growl \
			$(MODEL_TESTS)

easysync-tests: update-node_modules
	@@NODE_ENV=test node_modules/mocha/bin/mocha \
			--require should \
			--reporter list \
			--slow 20 \
			--growl \
			$(EASYSYNC_TESTS)

docs: update-node_modules
	@@node_modules/docco-husky/bin/generate -name "Eduwrite" node test
