A simple twitter app to get tweets from a certain user and pass them to Watson Personality Insights. The result is then written to a file as comma-separated values. The tweets analysed are also written to a file.

```
# Install dependencies
npm install

# Update input-data/twitter-handle.csv with the twitter handle, a descriptions and name of the user whose tweets you are interested in.

# Create .env file with the path to the input data and the following credentials from Watson Personality Insights service and twitter:
PERSONALITY_URL=https://gateway.watsonplatform.net/personality-insights/api/v3/profile
PERSONALITY_USERNAME=
PERSONALITY_PASSWORD=
PERSONALITY_VERSION=

consumer_key=
consumer_secret=
access_token_key=
access_token_secret=

PLAYERS_ALL="input-data/twitter-handle.csv"

# Run
node main.js
```
