develop: ts
	NODE_ENV=develop npm run server

ts:
	rm -rf dist
	tsc --build tsconfig.json