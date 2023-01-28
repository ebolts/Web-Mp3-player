# Web-Mp3-player
Welcome to my mp3 player!

Here you can search for songs by their name or artist, select from a genre, or upload your own all while saving them to your library or playlists. Songs retrieved online are limited to 30 seconds as this isn’t a proper streaming service, however, songs uploaded directly can be played in full so you can enjoy listening to your favourite tracks all in one place. 

![mp3 player screenshot](https://user-images.githubusercontent.com/86194451/215233705-1dd8be37-343d-4451-8ce9-cf17d9292ff0.png)
## About

This is my first full-stack application that is built entirely with HTML, CSS and Javascript. it utilises the indexedDB API to create object stores for persistent data allowing the user to save songs and playlists to their browser. Along with this songs can be searched by their name or artist, this is handled by the Napster API that fetches the necessary data to be stored and displayed to the user.

I chose Napster API over other services like Apple Music and Spotify because the data returned could easily be stored as .jpg and .mp3. Furthermore, no login is required as their documentation provides a public API key that can be used and this is what is used in the application. The downside to using Napster over the other services is that the full length of songs isn't saved only in their preview as there is no login to a user's account. Another quirk is their search results, while it's functional some of the results can vary from time.

Users can upload their own music granted it's a .mp3 file with data tags for the song name, artist, and image (all of which come with the purchase of legally downloaded music).
