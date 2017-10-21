# [fa-node](https://github.com/mcrocks999/fa-node)
FurAffinity wrapper for NodeJS

[![NPM](https://nodei.co/npm/furaffinity.png)](https://nodei.co/npm/furaffinity/)

[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/furaffinity) [![npm](https://img.shields.io/npm/dt/furaffinity.svg)](https://www.npmjs.com/package/furaffinity)

## Usage

To get the most recent content:

> Categories are a variable in the following example.

```javascript
var furaffinity = require('furaffinity');
var category = (['artwork','writing','music','crafts','all'])[0];
furaffinity.recent(category,limit,function(data){
	if (!data.success) {
		// handle data.error
		return;
	}
	// data contains information available below
});
```

To search up content:
```javascript
var furaffinity = require('furaffinity');
var query = 'example';
furaffinity.search(query,limit,function(data){
	if (!data.success) {
		// handle data.error
		return;
	}
	// data contains information available below
});
```

## Sample data response

On success:
```json
{
	"success": true,
	"figures": [
		{
			"title": "content title",
			"url": "url_pointing_to_resource",
			"src": "url_pointing_to_directly_to_image_File",
			"artist": {
				"url": "url_pointing_to_artist",
				"name": "artist_name"
			}
		}
	]
}
```

On failure:
```json
{
	"success": false,
	"err": 0,
	"error": "error message"
}
```

## Possible errors:

err | error | what happen
--- | --- | ---
0 | `That is not a valid type!` | You did not use a valid category in your request. (This should be [artwork, writing, music, crafts])
1 | `No content found!` | Your search did not return any results!
2 | `Could not connect!` | Cannot connect to the required service!
