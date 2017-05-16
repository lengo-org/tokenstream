.PHONY: test

PACKAGE_NAME         := $(shell grep '"name"' package.json | sed -r 's/(^.*:|[", ])//g')
VERSION_PACKAGE_JSON := grep '"version"' package.json | sed "s/[^0-9.]//g"
VERSION_CHANGELOG    := grep "^\#\#" -m1 CHANGELOG.md | sed "s/\#\#\s*//"
VERSION_GIT_LOCAL    := 2>/dev/null git describe --abbrev=0 --tags
VERSION_GIT_REMOTE   := 2>/dev/null git ls-remote --tags | sed -r "s/^[0-9a-f]+\s+(\S+\/)//g"| sort -r -V | head -n1
VERSION_NPM_REMOTE   := 2>/dev/null npm view $(PACKAGE_NAME) dist-tags.latest
NOT_AVAILABLE        := "\033[1;31mN/A\033[0m"

NODE_BIN  := ./node_modules/.bin
ARTIFACTS := (\.js(\.map)?|\.d\.ts)$$

TSC_SRC_PARAM  :=
TSC_TEST_PARAM :=

list: 			# Display this list
	@cat Makefile \
	 	| grep "^[a-z0-9_]\+:" \
		| sed -r "s/:[^#]+?#?(.*)?/\r\t\t\t-\1/" \
		| sed "s/^/ • make /" \
		| sort

clean:			# Remove artefacts created by the build process
	@echo -n "Clean up ... "
	@rm -rf ./coverage
	@rm -rf ./lib
	@find ./src  -type f | grep -E "$(ARTIFACTS)" | xargs -I{} rm {};
	@find ./test -type f | grep -E "$(ARTIFACTS)" | xargs -I{} rm {};
	@echo "done."

distclean: clean # Remove build artefacts and './node_modules' directory
	@echo -n "Removing ./node_modules ... "
	@rm -rf ./node_modules
	@echo "done."

install: 		# Install dependencies into './node_modules' directory
	@echo "Installing dependencies to ./node_modules ... "
	@rm -rf ./node_modules
	@npm install | grep -v "[│├└]"
	@echo -n "Installed dependencies: "
	@du -sh ./node_modules | sed "s/\t/ in /"

build: clean 	# Compile TypeScript sources to JavaScript
	@echo -n "Compiling ./src -> ./lib ... "
	@$(NODE_BIN)/tsc $(TSC_SRC_PARAM) -p .
	@echo "done."

	@echo -n "Preparing types in ./lib ... "
	@node ./tool/typings.js > lib/index.d.ts.new
	@mv lib/index.d.ts.new lib/index.d.ts
	@find ./lib  -type f | grep -E "\.d\.ts$$" | grep -v "index.d.ts" | xargs -I{} rm {};
	@echo "done."

test: build 	# Perform tests
	@echo -n "Compiling ./test -> ./test ... "
	@$(NODE_BIN)/tsc $(TSC_TEST_PARAM) -p ./test
	@echo "done."
	@echo "Begin testing:"
	@npm test ${ARGS}
	@echo "Testing done."

	@echo -n "JavaScript coverage: "
	@echo "<file://`pwd`/coverage/lcov-report/index.html>"

prepublish: build test # Display files to be published to NPM
	@echo
	@echo "To be published to NPM:"
	@echo "-----------------------"
	@$(NODE_BIN)/pkgfiles -f --sort=name | sed "1d; s/^PKG.*$$//" | sed "s/^/  /" | uniq
	@echo

	@$(eval VERSION := $(shell $(VERSION_PACKAGE_JSON)))
	@echo "package.json:" $(if $(VERSION), $(VERSION), $(NOT_AVAILABLE))

	@$(eval VERSION := $(shell $(VERSION_CHANGELOG)))
	@echo "CHANGELOG.md:" $(if $(VERSION), $(VERSION), $(NOT_AVAILABLE))

	@$(eval VERSION := $(shell $(VERSION_GIT_LOCAL)))
	@echo "   git local:" $(if $(VERSION), $(VERSION), $(NOT_AVAILABLE))

	@$(eval VERSION := $(shell $(VERSION_GIT_REMOTE)))
	@echo "  git remote:" $(if $(VERSION), $(VERSION), $(NOT_AVAILABLE))

	@$(eval VERSION := $(shell $(VERSION_NPM_REMOTE)))
	@echo "  npm remote:" $(if $(VERSION), $(VERSION), $(NOT_AVAILABLE))

	@echo
