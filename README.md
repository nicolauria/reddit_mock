# reddit_mock

## Express/MongoDB backend and React/Redux frontend
registering or logging in takes you to the posts page (PostsPage.js)<br />
the posts page renders posts, posts render comments, comments render child comments<br />
postsPage -> posts -> comments -> childComments

## Potential points of confusion

### There are two comment components
Comments are rendered in a cascading style with each comment making an ajax request to update the comments state 
and render it's child comments. Nesting the Comment component inside of itself caused a considerable number of bugs. 
Instead, I created two comment components (Comment and CommentTwo). Each component uses the other to display it's
children allowing for an endless number of nested comments.

You may notice that I have a 'comments' and 'childComments' property on the Post and Comment model. These two properties
are not currently being used but I realize now that a better implementation would have been to use these two properties
to populate my Post and Comment objects. I could then check to see if their child array is empty before making an ajax request.

### comments state
the comments reducer returns one main 'comments' object<br />
inside this object comments and their children are listed as key value pairs<br />
eg:
```
{
  comment1Id: [childComment1, childComment2],
  comment2Id: [childComment1, childComment2]
}
```
