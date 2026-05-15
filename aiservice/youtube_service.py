from googleapiclient.discovery import build
import re
from fastapi import HTTPException
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("YOUTUBE_API_KEY")

youtube = build(
    "youtube",
    "v3",
    developerKey=API_KEY
)

def extract_video_id(url):
    regex = r"(?:v=|\/)([0-9A-Za-z_-]{11}).*"
    match = re.search(regex, url)
    return match.group(1) if match else None
    



def get_youtube_comments(video_url, max_comments=100):
    video_id = extract_video_id(video_url)
    if not video_id:
        raise ValueError("Invalid YouTube URL")
    comments = []
    request = youtube.commentThreads().list(
        part="snippet",
        videoId=video_id,
        maxResults=100,
        textFormat="plainText"
    )
    
    response = request.execute()
    while request and len(comments) < max_comments:
        for item in response["items"]:
            comment = item["snippet"]["topLevelComment"][
                "snippet"
            ]["textDisplay"]
            comments.append(comment)
            if len(comments) >= max_comments:
                break
        request = youtube.commentThreads().list_next(
            request,
            response
        )
        if request:
            response = request.execute()
            
    return comments