VERSION = 420.69
flags = -DVERSION="\"${VERSION}\""
pp = cpp -traditional-cpp -P ${flags}

extension:
	mkdir -p dist
	mkdir -p build/js
	$(pp) manifest.json > build/manifest.json
	$(pp) src/main.js > build/js/main.js
	cd build && zip -9r ../dist/ALSWikiEditor.zip .
