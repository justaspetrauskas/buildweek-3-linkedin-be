# LinkedIn Clone BE

# MODELS #
    PROFILE Model:
    {
        "_id": "5d84937322b7b54d848eb41b", //server generated -- uuid
        "name": "Diego",
        "surname": "Banovaz",
        "email": "diego@strive.school",
        "bio": "SW ENG",
        "title": "COO @ Strive School",
        "area": "Berlin",
        "image": ..., //server generated on upload, set a default here
        "username": "admin",
        "createdAt": "2019-09-20T08:53:07.094Z", //server generated
        "updatedAt": "2019-09-20T09:00:46.977Z", //server generated
    }



    EXPERIENCE Model:
    {
        "_id": "5d925e677360c41e0046d1f5",  //server generated
        "role": "CTO",
        "company": "Strive School",
        "startDate": "2019-06-16T22:00:00.000Z",
        "endDate": "2019-06-16T22:00:00.000Z", //could be null
        "description": "Doing stuff here and there",
        "area": "Berlin",
        "username": "admin",
        "createdAt": "2019-09-30T19:58:31.019Z",  //server generated
        "updatedAt": "2019-09-30T19:58:31.019Z",  //server generated
        "image": ... //server generated on upload, set a default here
    }



    POST Model:
    {
        "_id": "5d93ac84b86e220017e76ae1", //server generated
        "text": "this is a text 12312 1 3 1",  <<--- THIS IS THE ONLY ONE YOU'LL BE SENDING!!!
        "username": "admin",
        "user": {
            "_id": "5d84937322b7b54d848eb41b", //server generated
            "name": "Diego",
            "surname": "Banovaz",
            "email": "diego@strive.school",
            "bio": "SW ENG",
            "title": "COO @ Strive School",
            "area": "Berlin",
            "image": ..., //server generated on upload, set a default here
            "username": "admin",
            "createdAt": "2019-09-20T08:53:07.094Z", //server generated
            "updatedAt": "2019-09-20T09:00:46.977Z", //server generated
        }
        "createdAt": "2019-10-01T19:44:04.496Z", //server generated
        "updatedAt": "2019-10-01T19:44:04.496Z", //server generated
        "image": ... //server generated on upload, set a default here
    }



# API #
    PROFILES:
    - GET https://yourapi.herokuapp.com/api/profile/
    Retrieves list of profiles

    - GET https://yourapi.herokuapp.com/api/profile/{userId}
    Retrieves the profile with userId = {userId}

    - POST https://yourapi.herokuapp.com/api/profile/
    Create the user profile with all his details

    - PUT https://yourapi.herokuapp.com/api/profile/
    Update current user profile details

    - POST https://yourapi.herokuapp.com/api/profile/{userId}/picture
    Replace user profile picture (name = profile)

    - GET https://yourapi.herokuapp.com/api/profile/{userId}/CV
    Generates and download a PDF with the CV of the user (details, picture, experiences)



    EXPERIENCE:
    - GET https://yourapi.herokuapp.com/api/profile/userName/experiences
    Get user experiences

    - POST https://yourapi.herokuapp.com/api/profile/userName/experiences
    Create an experience.

    - GET https://yourapi.herokuapp.com/api/profile/userName/experiences/:expId
    Get a specific experience

    - PUT https://yourapi.herokuapp.com/api/profile/userName/experiences/:expId
    Get a specific experience

    - DELETE https://yourapi.herokuapp.com/api/profile/userName/experiences/:expId
    Get a specific experience

    - POST https://yourapi.herokuapp.com/api/profile/userName/experiences/:expId/picture
    Change the experience picture

    - GET https://yourapi.herokuapp.com/api/profile/userName/experiences/CSV
    Download the experiences as a CSV



    POSTS:
    - GET https://yourapi.herokuapp.com/api/posts/
    Retrieve posts

    - POST https://yourapi.herokuapp.com/api/posts/
    Creates a new post

    - GET https://yourapi.herokuapp.com/api/posts/{postId}
    Retrieves the specified post

    - PUT https://yourapi.herokuapp.com/api/posts/{postId}
    Edit a given post

    - DELETE https://yourapi.herokuapp.com/api/posts/{postId}
    Removes a post

    - POST https://yourapi.herokuapp.com/api/posts/{postId}
    Add an image to the post under the name of "post"
 
#EXTRA: Find a way to return also the user with the posts, in order to have the Name / Picture to show it correcly on the frontend


# COMMENTS #
    COMMENT Model:
    {
        "_id": "5d84937322b7b54d848eb41b", //server generated
        //user who posted it (as reference? nested? Your choice!)
        "comment": "I totally agree with you! Great post!",
        //post (as reference? nested? your choice)
        "createdAt": "2019-09-20T08:53:07.094Z", //server generated
        "updatedAt": "2019-09-20T09:00:46.977Z", //server generated
    }


    LIKE Model:
    {
        "_id": "5d925e677360c41e0046d1f5",  //server generated
        //user who liked it (as reference? nested? Your choice!)
        //post liked (as reference? nested? Your choice!)
        "createdAt": "2019-09-30T19:58:31.019Z",  //server generated
        "updatedAt": "2019-09-30T19:58:31.019Z",  //server generated
    }   



# API #

      POSTS:
      - POST https://striveschool-api.herokuapp.com/api/posts/{id}/like
      Like the post for current user (each user can like only once per post)

      - DELETE https://striveschool-api.herokuapp.com/api/posts/{id}/like
      Remove the like for current user

      - GET https://striveschool-api.herokuapp.com/api/posts/{id}/comment
      Retrieve the list of comments for a given post

      - POST https://striveschool-api.herokuapp.com/api/posts/{id}/comment
      Create the a new comment for a given post

      - DELETE https://striveschool-api.herokuapp.com/api/posts/{id}/comment/{commentId}
      Deletes a given comment

      - PUT https://striveschool-api.herokuapp.com/api/posts/{id}/comment/{commentId}
      Edit a given comment

Note:

    You can also return the comments with a given POST if you like, without implementing a specific route.
    Remember that you should return the number of like for each post.
    Would be nice to know also if the current user already like-d the current post in order to show it correctly on the frontend side.

# EXXXTRA #
Implement friend requests.


# FRONTEND #
Start from a previous version and make it work with the current APIs.
Here lies a lot of work! You should update your frontend in order to make this new features available.

So:
- like (add and remove) from posts
- comments on the posts itself

 
# FINALLY  #
Both frontend and backend MUST be deployed on Heroku/Vercel and made them available for the general public.
