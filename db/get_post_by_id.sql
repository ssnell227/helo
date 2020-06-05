select title, img, content, username, profile_pic
from posts
join users on posts.author_id = users.user_id
where post_id = $1;