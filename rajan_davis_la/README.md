# Extracting meaningful differences between r/SequelMemes and r/PrequelMemes subreddits through Natural Language Processing of post titles

<p align="center"><img src="https://i.redd.it/icysmnx0lpsy.jpg" alt="This is where the fun begins..."></p>

## Abstract
[Memes](https://en.wikipedia.org/wiki/Meme) are one of the *de facto* forms of expression on the internet. Image macros containing text are shared across various venues of the internet and can express a multitude of emotional states.

[Star Wars](https://en.wikipedia.org/wiki/Star_Wars) is an epic, multi-saga science fiction opera. It's influence on popular culture is [fairly vast](https://en.wikipedia.org/wiki/Cultural_impact_of_Star_Wars) and, through the [r/SequelMemes](https://www.reddit.com/r/SequelMemes) and [r/PrequelMemes](https://www.reddit.com/r/PrequelMemes) subreddits, has become transmuted into the comedic currency of an [obscure internet subculture](https://www.reddit.com/r/SequelMemes/comments/9fjcxj/light_darkness_a_balance/).

The image macros from these subreddits reflect an interesting juxtaposition of utilizing similar themes but are represented by references from their respective trilogy films that are often interweaved with other image macro themes or pop cultural references:
<br><br>
<p align="center"><img src="https://i.redd.it/xicqafc33zk11.jpg" alt="A meme from r/SequelMemes"></p>
<p align="center"><em><a href="https://www.reddit.com/r/SequelMemes/comments/9e2q22/swole_patrol/">A meme from r/SequelMemes</a> making a reference to <a href="https://en.wikipedia.org/wiki/I_Love_It_(Kanye_West_and_Lil_Pump_song)">Kanye West's "I Love It" music video</a> and a distorted image of a <a href="https://en.wikipedia.org/wiki/Kylo_Ren">shirtless Kylo Ren</a>, a character in the Star Wars sequel trilogies.</em></p>
<br><br>

<p align="center"><img src="https://i.redd.it/sez2t29y7mm11.jpg" alt="A meme from r/PrequelMemes"></p>
<p align="center"><em><a href="https://www.reddit.com/r/PrequelMemes/comments/9gb6o9/bad_oc/">A meme from r/PrequelMemes</a> referencing <a href="https://en.wikipedia.org/wiki/J._Jonah_Jameson#Spider-Man">J. Jonah Jameson </a>, a character from the <a href="https://en.wikipedia.org/wiki/Spider-Man">Spider-Man comicbook series</a> alongside a scene containing <a href="https://en.wikipedia.org/wiki/Obi-Wan_Kenobi#/media/File:Obiwan1.jpg">Obiwan Kenobi</a> from <a href="https://en.wikipedia.org/wiki/Star_Wars:_Episode_III_%E2%80%93_Revenge_of_the_Sith">Revenge of the Sith</a></em></p>
<br>

Given that both of these subreddits contain an irreverent sense of humor tied to Star Wars through the use of image macros, I wanted to explore if the language used in the titles of the posts gave any signal as to make a given post identifiable to it's respective subreddit.
<br><br>

## Executive Summary

### Problem Statement
What I wanted to explore by collecting r/SequelMemes and r/PrequelMemes JSON data was to see if it were possible to identify the subreddit a meme is posted on by the language of it's post title. My hypothesis is that the image macros alone do not solely provide signal for this classification but rather that the language used within a post's title can provide this context.

### Description of Data
In order to perform this analysis, I wrote a [script in Node that fetched JSON data from the Pushshift.io API](./data_fetching/pushshift.js). This data was written to two folders ([now three folders](./data_fetching/json2/)) and contains paginated JSON files.

To combine the files, I wrote a [script in Node combined the JSON files into long lists of titles](./data_fetching/merge.js). This was so that I can load 2 separate lists directly into a pandas dataframe without too much need for manipulation.

In total there were **13250** titles for **r/PrequelMemes** and *14600* titles for *r/SequelMemes* collected for this analysis. 

The only additional features were a creation date from the JSON data (the *created_utc* property) that I used to look at the timespan of the collected posts of both subreddits. I also encoded a feature to determine whether or not a given meme came from the r/SequelMemes subreddit so that I could I have a basis for classification (the *is_sequel_meme* feature). 

Here are the top 5 terms for each subreddit:

<img src="./presentation/images/Frequency%20count%20of%20top%205%20words%20(with%20stop%20words;%20words%20are%20stemmed)%20-%20PrequelMemes.png" alt="r/PrequelMemes top 5 words">

<img src="./presentation/images/Frequency%20count%20of%20top%205%20words%20(with%20stop%20words;%20words%20are%20stemmed)%20-%20SequelMemes.png" alt="r/SequelMemes top 5 words">

### Model Selection

I tested several models and decided that a Multinomial Naive Bayes Classifier might be the most appropriate choice. This is because it offered great performance and I believe that if the goal was to classify more posts, it would scale significantly better than the best performing score which was a highly tuned Logistic Regression model.


    - Did you fit many models? Feel free to summarize some of your scores here.
    - Consider useing a markdown table to make results easy to review.
    - It should be clear which model you chose for production and why.

<img src="./presentation/images/Frequency%20count%20of%20top%205%20words%20(with%20stop%20words;%20words%20are%20stemmed)%20-%20SequelMemes.png" alt="r/SequelMemes top 5 words">


4. Primary findings/conclusions/recommendations
    - These should follow from your project
    - You should provide an answer to your problem statement
5. Next steps
    - **Always** focus on the positive (it's not what you did wrong, it's what you look forward to improving).
    - Is your model ready for production? Probably not, but you can comment on how it might get there.
    - Does this project demonstrate skills that you think could be applied to similar problems?

## Notebooks
[Notebooks are located here.](./notebooks/)

## Presentation
[PDF of presentation is here.](./presentation/Star%20Wars%20Classification.pdf)

