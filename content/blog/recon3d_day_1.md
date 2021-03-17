+++
title = "Let's perform 3D reconstruction from multiple images! Day 1"
date = 2021-03-17
[extra]
thumbnail = "../static/thumbs/recon3d_day_1.jpg"
author = "42yeah"
+++

Yep. This is my grad design - 3D reconstruction from multiple images. It looks great from afar, but coming close reveals the requirements to achieve that: a thorough understanding of multiple view geometry, ability to write clean & fast code, and a patient heart for rapid debugging.

<!-- more -->

And when I don't have any of that, at least I have [OpenCV](https://opencv.org/) by my side. I really tried, however implementing SIFT itself is hard enough to make me kneel. And today, we are going to first take a look at the beautiful procedure of 3D reconstruction, then dive into it!

## Getting Started

As this is day one, let's stay on theoretical stuffs, alright? 3D reconstruction has a pipeline, and it is as following:

1. Input multiple images (duh)
2. Extract features from those images (and start calling them "views" from now on)
3. Match features among those images
4. Using the best feature matching pair to triangulate points among these two views and form the original point cloud
5. Using the original point cloud's points to restore other sub-par views' camera, so that you can calculating their keypoint positions in the 3D world.
6. Add them to the point cloud too. Done!

So only six steps. Easy! Well, surprise surprise, it's not. But before we begin our grand adventure, there's still one more thing to do: install necessary tools!

## Installing Tools

First off, we need to install [OpenCV](https://opencv.org/). Can't stress this enough. I tried to implement its functions by myself, however the result is too slow, and the memory usage too high - even if I accelerated it using OpenGL calls. If you can implement it yourself, go ahead! And you will have my greatest respect.

After that, well, nothing! We are all set. I recommend you to clone the source code from [royshil/SfM-Toy-Library](https://github.com/royshil/SfM-Toy-Library/issues) as this is where I learn (and copy) from. I also recommend you to read [The MVG Bible](https://www.robots.ox.ac.uk/~vgg/hzbook/) if you can. 

## Final Words

My major is not CV/CG, and I only have such a frail knowledge of computer graphics, I had quite a hard time scouring through the Internet. It is nevertheless quite fun, but I still hope it will do me way, way better if my major is computer vision / computer graphics.

Well, that's all! Now we are all set & ready for day 2!
