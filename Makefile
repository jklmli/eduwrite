TESTS = test/*.js

test:
	@NODE_ENV=test mocha \
			--require should \
			--reporter list \
			--slow 20 \
			--growl \
			$(TESTS)
.PHONY: test
