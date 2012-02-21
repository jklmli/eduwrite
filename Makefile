TEST = test/*.js

CSS = static/css/
LESS = static/css/less/

.PHONY: test

build: build-less

build-less:
	for file in $(LESS)*.less; do \
		lessc $${file} > `echo $${file} | sed "s|\.less|\.css|"`; \
	done
	mv $(LESS)*.css $(CSS)

test:
	@NODE_ENV=test mocha \
			--require should \
			--reporter list \
			--slow 20 \
			--growl \
			$(TEST)
