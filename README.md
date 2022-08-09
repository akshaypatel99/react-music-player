# Chillhop

### **_A chillhop music player built with React_**

#### Check out the live site [**here**](https://tinyurl.com/chillhop-react).

## Project Overview

Chillhop is an online music player that plays soothing lo-fi
beats music perfect for coding, studying or relaxing.

Users can play, pause, skip, rewind and fast-forward tracks. There is also a menu to browse all tracks in the library.

### Stack

- React
- SASS

## Purpose and Goal

I had used images in all of my previous projects, but I wanted to try my hand at working with audio files and creating a music player. I came across chillhop.com, which is a great site that showcases jazzy and lo-fi hip hop music. The music is freely available to use for members of the Creator's Program.

## Implementation & Features

This is a single page application with a React front-end and SASS for styling. The project was a little daunting at first, though this was in part not having worked with audio methods and event handlers before.

A problem I had when I added the library to the app, was that I needed audioRef (useRef value) across the component tree when it was only available in a single child component. The solution I found was to lift the state that lived in the Player component up to the parent App component and then share the state across all child components. There are other methods of handling state here, which I will experiment with in later versions.

## Lessons Learned

Other than learning how to work with audio files, I learned how to break down the steps of each music player action, e.g. how to skip a track forwards and backwards, how to repeat a playlist when it comes to the end, synchronicity between the player and library. An unexpected issue was waiting for the song to load before the play function could be called, which was resolved by using a promise before executing the function.
