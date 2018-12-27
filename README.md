# reddit_mock

## Express/MongoDB backend and React/Redux frontend
registering or logging in takes you to the posts page (PostsPage.js)<br />
the posts page renders posts, posts render comments, comments render child comments<br />
postsPage -> posts -> comments -> childComments

## Application State
there are 4 main slices of state:
```
{
  auth: authReducer,
  errors: errorsReducer,
  posts: postReducer,
  comments: commentsReducer
}
```
The comments state groups comments by their parent ids. This makes it easy to update smaller portions of the DOM instead of the entire object. Also, because the comments use a postId and parentId this schema can be used with a relational database as well.
eg:
```
{
  comment1Id: [childComment1, childComment2],
  comment2Id: [childComment1, childComment2]
}
```

### NOTE: There are two comment components
Comments are rendered in a cascading style. Nesting the Comment component inside of itself caused a considerable number of bugs. Instead, I created two comment components (Comment and CommentTwo). Each component uses the other to display it's
children allowing for an endless number of nested comments.
