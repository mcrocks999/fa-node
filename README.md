# fa-node
FurAffinity wrapper for NodeJS

> Currently supports getting recent content and searching up content.

## Usage

To get the most recent content:

> Categories are a variable in the following example.

```javascript
var category = (['artwork','writing','music','crafts'])[0];
fapi.recent(category,function(data){
	if (!data.success) {
		msg.reply('An error occured! `'+data.error+'`');
		return;
	}
	// data contains information available below
});
```

To search up content:
```javascript
var query = 'example';
fapi.search(query,function(data){
	if (!data.success) {
		msg.reply('An error occured! `'+data.error+'`');
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
	"title": "content title",
	"url": "url_pointing_to_resource",
	"src": "url_pointing_to_directly_to_image_File",
	"artist": {
		"url": "url_pointing_to_artist",
		"name": "artist_name"
	}
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
