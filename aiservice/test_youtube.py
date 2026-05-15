from youtube_service import get_youtube_comments

url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

comments = get_youtube_comments(url)

print(comments[:5])