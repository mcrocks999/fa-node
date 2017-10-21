# [fa-node](https://github.com/mcrocks999/fa-node)
FurAffinity wrapper for NodeJS

[![NPM](https://nodei.co/npm/furaffinity.png)](https://nodei.co/npm/furaffinity/)

[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/furaffinity) [![npm](https://img.shields.io/npm/dt/furaffinity.svg)](https://www.npmjs.com/package/furaffinity)

## Usage

To get the most recent content:

> furaffinity.types has all possible results

```javascript
var furaffinity = require('furaffinity');
furaffinity.recent(furaffinity.types.artwork, limit, (data, err) => {
	if (err) return; // handle err however needs be
	// data contains information available below
});
```

Checking available types:

```javascript
console.log(Object.keys(furaffinity.types));
// artwork, writing, music, crafts, any
```

To search up content:
```javascript
var furaffinity = require('furaffinity');
var query = 'example';
furaffinity.search(query, limit, (data, err) => {
	if (err) return err; // handle err however needs be
	// data contains information available below
});
```

## Sample data

```json
[
	{
		"title": "content title",
		"url": "url_pointing_to_resource",
		"src": "url_pointing_to_directly_to_image_File",
		"artist": {
			"url": "url_pointing_to_artist",
			"name": "artist_name"
		}
	},
	...
]
```

## Possible errors:

Error | Reason
--- | ---
`That is not a valid type!` | You did not use a valid type in your request. (see furaffinity.types)
`No content found!` | Your search did not return any results!
`Could not connect!` | Cannot connect to the required service!
