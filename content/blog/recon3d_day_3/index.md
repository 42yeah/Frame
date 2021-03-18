+++
title = "Let's perform 3D reconstruction from multiple images! Day 3"
date = 2021-03-19
draft = true
[extra]
thumbnail = "../static/thumbs/recon3d_day_2.jpg"
author = "42yeah"
+++

## Baseline Triangulation

After that's done, it's time to commence baseline triangulation, which will generate our primitive point cloud based on the best matches we could find. But before all that, we should define our [camera intrinsics](http://ksimek.github.io/2013/08/13/intrinsic/).

### Camera Intrinsics

So what is camera intrinsics, really? Well, it consists of camera focal length and principal point. They make up a matrix in such a way that, when applied to a point, could turn it into camera-space position. The follwing illustrations explains what's focal length and principal point ([thanks ksimek!](http://ksimek.github.io/2013/08/13/intrinsic/))

![Pinhole camera](intrinsic_pinhole_camera.png)

![Focal length is distance of the film to the pinhole](intrinsic_focal_length.png)

![Principal point is intersection of the perpendicular line from pinhole camera to the film (which is called "principal ray") and the film](intrinsic_pp.png)

So, let's go ahead and add this to our `SfM` header:

```c++
struct Intrinsics {
    cv::Mat k;
    cv::Mat k_inv;
    cv::Mat distortion;
};

Intrinsics intrinsics;
```

And initialize it as follows:

```c++
intrinsics.k = intrinsics.k = (cv::Mat_<float>(3, 3) << 2500, 0, views[0].cols / 2,
                                0, 2500, views[0].rows / 2,
                                0, 0, 1);
intrinsics.k_inv = intrinsics.k.inv();
intrinsics.distortion = cv::Mat_<float>::zeros(1, 4);
```

... And we are ready for

### Match Sorting

Remember the feature match matrix? Now we are going to sort it so that view pairs with the best relevance ratio comes first. And to achieve this, we are going to use an `std::vector`, and use its `sort` functionality later.

#### Match Sorting Header

Gotta pop this to the `SfM` header real quick:

```c++
struct ViewPair {
    const int first;
    const int second;
    float match_ratio;
};

std::vector<ViewPair> sort_views_for_baseline();
```

#### Implementation

And now, the implementation:

```c++

```
