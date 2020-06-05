select *, users.username
from posts
join users on posts.author_id = users.user_id;