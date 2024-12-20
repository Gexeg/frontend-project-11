serve:
	npx webpack serve --mode development

build:
	npx webpack --mode production

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8
