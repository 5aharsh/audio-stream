# Audio Stream
An application with JS and HTML5 audio streaming.

Application can be used to stream any kind of audio file or bunch of them. In order to do so follow these steps - 

1. Navigate to `js/tracks.js`
2. Add `name`, `url' and `img` of track that needs to be added. Format will be like - 
<pre>
{
  "name": "Just Awake - Hunter x Hunter",
  "url": "https://host.site/audio_file.mp3",
  "img": "https://host.site/background_image.jpg"
}
</pre>
3. Append this in `tracks` array.
<pre>
var tracks = [
  ...,
  {
    "name": "Just Awake - Hunter x Hunter",
    "url": "https://host.site/audio_file.mp3",
    "img": "https://host.site/background_image.jpg"
  }
];
</pre>
4. Good to go.

#### Notes:
1. Tracks are randomly shuffled at the beginning and thats the order in which they play.
2. Last track in `tracks.js` is an non-working dummy entry to check for error prompt.

#### Working Demo - https://audio-stream.js.org
