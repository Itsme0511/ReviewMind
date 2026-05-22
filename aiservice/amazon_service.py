import os

from dotenv import load_dotenv

from apify_client import ApifyClient

load_dotenv()

APIFY_API_TOKEN = os.getenv(
    "APIFY_API_TOKEN"
)

client = ApifyClient(
    APIFY_API_TOKEN
)


def get_amazon_reviews(product_url):

    run_input = {

        "productUrls": [

            {
                "url": product_url
            }

        ],

        "maxReviews": 50
    }

    run = client.actor(

        "junglee/amazon-reviews-scraper"

    ).call(

        run_input=run_input
    )

    reviews = []

    for item in client.dataset(

        run["defaultDatasetId"]

    ).iterate_items():
        review_text = item.get(
            "reviewDescription"
        )

        if review_text:

            reviews.append(review_text)

    return reviews