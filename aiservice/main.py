from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from youtube_service import get_youtube_comments
from fastapi import HTTPException
import emoji

app = FastAPI()

sentiment_map = {
    "joy": "positive",
    "love": "positive",
    "surprise": "positive",

    "anger": "negative",
    "fear": "negative",
    "sadness": "negative",

    "neutral": "neutral"
}

class BatchInput(BaseModel):
    texts: list[str]

class YouTubeInput(BaseModel):
    url: str
    max_comments: int = 100

classifier = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    top_k=None
)

summarizer = pipeline(
    "summarization",
    model="sshleifer/distilbart-cnn-12-6"
)

class TextInput(BaseModel):
    text: str

@app.get("/")
def home():
    return {"message": "Emotion Analysis API Running"}


def preprocess_text(text):

    # Convert emojis into readable text
    text = emoji.demojize(text)

    # Remove extra colons from emoji conversion
    text = text.replace(":", " ")

    # Remove extra underscores
    text = text.replace("_", " ")

    return text


def generate_summary(comments):

    try:

        filtered_comments = [
            comment
            for comment in comments
            if isinstance(comment, str) and len(comment.strip()) > 5
        ]

        combined_text = " ".join(filtered_comments[:30])

        tokens = summarizer.tokenizer.encode(
            combined_text,
            truncation=True,
            max_length=1024
        )

        truncated_text = summarizer.tokenizer.decode(
            tokens,
            skip_special_tokens=True
        )

        summary = summarizer(
            truncated_text,
            max_length=80,
            min_length=25,
            do_sample=False
        )

        return summary[0]["summary_text"]

    except Exception as e:

        return f"Summary generation failed: {str(e)}"


@app.post("/analyze")
def analyze_sentiment(data: TextInput):

    cleaned_text = preprocess_text(data.text)
    result = classifier(cleaned_text)[0]

    sorted_result = sorted(
        result,
        key=lambda x: x["score"],
        reverse=True
    )

    top_emotion = sorted_result[0]

    return {
        "text": data.text,
        "emotion": top_emotion["label"],
        "confidence": round(top_emotion["score"], 4),
        "all_emotions": sorted_result
    }

@app.post("/analyze-batch")
def analyze_batch(data: BatchInput):

    cleaned_texts = [
    preprocess_text(text)
    for text in data.texts]

    results = classifier(cleaned_texts)


    final_results = []

    for text, prediction in zip(data.texts, results):

        sorted_result = sorted(
            prediction,
            key=lambda x: x["score"],
            reverse=True
        )

        top_emotion = sorted_result[0]

        final_results.append({
            "text": text,
            "emotion": top_emotion["label"],
            "confidence": round(top_emotion["score"], 4)
        })

        sentiment = sentiment_map.get(
        top_emotion["label"],
        "neutral"
        )

    return {
        "total_texts": len(data.texts),
        "results": final_results,
        "sentiment": sentiment
    }

@app.post("/analyze-text")
def analyze_text(data: dict):

    text = data.get("text")

    if not text:

        raise HTTPException(
            status_code=400,
            detail="Text is required"
        )
    cleaned_text = preprocess_text(text)

    result = classifier(cleaned_text)[0]

    sorted_result = sorted(
        result,
        key=lambda x: x["score"],
        reverse=True
    )

    top_emotion = sorted_result[0]

    emotion = top_emotion["label"]

    sentiment = sentiment_map.get(
        emotion,
        "neutral"
    )

    return {

        "text": text,

        "emotion": emotion,

        "emotion_score": round(
            top_emotion["score"],
            4
        ),

        "sentiment": sentiment,

        "all_emotions": sorted_result
    }

@app.post("/analyze-youtube")
def analyze_youtube(data: YouTubeInput):

    try:

        comments = get_youtube_comments(
            data.url,
            max_comments=data.max_comments
        )


        if not comments:
            raise HTTPException(
                status_code=404,
                detail="This video has no public comments available."
            )   

        cleaned_comments = [
            preprocess_text(comment)
            for comment in comments
        ]

        results = classifier(cleaned_comments)

        analyzed_comments = []

        emotion_counts = {}

        sentiment_counts = {
            "positive": 0,
            "negative": 0,
            "neutral": 0
        }

        positive_comments = []
        negative_comments = []

        for comment, prediction in zip(comments, results):

            sorted_result = sorted(
                prediction,
                key=lambda x: x["score"],
                reverse=True
            )

            top_emotion = sorted_result[0]

            emotion = top_emotion["label"]

            sentiment = sentiment_map.get(
                emotion,
                "neutral"
            )

            if sentiment == "positive":

                positive_comments.append({
                    "comment": comment,
                    "confidence": top_emotion["score"]
                })
            elif sentiment == "negative":

                negative_comments.append({
                    "comment": comment,
                    "confidence": top_emotion["score"]
                })

            emotion_counts[emotion] = (
                emotion_counts.get(emotion, 0) + 1
            )

            sentiment_counts[sentiment] += 1

            analyzed_comments.append({
                "comment": comment,
                "emotion": emotion,
                "sentiment": sentiment,
                "confidence": round(
                    top_emotion["score"],
                    4
                )
            })
        top_positive_comment = None
        top_negative_comment = None  

        if positive_comments:
            top_positive_comment = max(
                positive_comments,
                key=lambda x: x["confidence"]
            )["comment"]

        if negative_comments:
            top_negative_comment = max(
                negative_comments,
                key=lambda x: x["confidence"]
            )["comment"]
        
        emotion_percentages = {}

        for emotion, count in emotion_counts.items():

            emotion_percentages[emotion] = {
            "count": count,
            "percentage": round(
                (count / len(comments)) * 100,2)
        }
            
        summary = generate_summary(comments)

        return {
            "total_comments": len(comments),
            "emotion_distribution": emotion_counts,
            "emotion_percentages": emotion_percentages,
            "sentiment_distribution": sentiment_counts,
            "top_positive_comment": top_positive_comment,
            "top_negative_comment": top_negative_comment,
            "ai_summary": summary,
            "comments": analyzed_comments
        }

    except ValueError:

        raise HTTPException(
            status_code=400,
            detail="Invalid YouTube URL"
        ) 
    
    except HTTPException as e:

        raise e

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Server Error: {str(e)}"
        )
