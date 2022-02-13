# FPS in PDF

Can be played in browser PDF viewer of Chrome, Edge and probably Opera. [The game:](https://github.com/AntonKorn/PDFps/files/8055707/Output.pdf)

## Controls
3 "buttons" in the bottom of first page is WASD. When you press forward once, player will start moving forward. If you press it twice, he will stop moving forward. Same is applicable for any button.

## The simple FPS game in pdf file
This repo contains the logic for rendering a simple FPS shooter ins pdf file with usage of inputs as mean of rendering the screen and user control. In future logic for enemies and shooting will be added. The style of the graphics is similar to what we can see in Hover tank 3d. Most of Maths is taken from the https://github.com/OneLoneCoder/CommandLineFPS. 

## Why do you use different fields per each color.. lol
Chrome doesn't allow the use of functions necessary to change input color.

## How does it work?
There is a load of inputs on top of this pdf page, each of them is one thin vertical line on top of another. Each of them has different length and/or color. When the scene is randered, the ray is thrown into correct angle for each of them. The color and height of input depends on how long did it take for ray to hit the wall and which color this wall had.
