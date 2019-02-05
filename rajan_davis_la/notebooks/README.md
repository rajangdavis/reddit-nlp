# Notebooks

Analysis was performed in the following order:

1. [Model Analysis](./Model%20Analysis.ipynb)
	- I started with model analysis in order to get a baseline for the metrics
	- I had a suspicion that not stemming/lemmatizing titles might help with accuracy
	- Was able to get 78% accuracy score using Logistic Regression and CountVectorizer with n_grams of 1 to 3 words and max document frequency of 25%
2. [EDA and NLP](./EDA%20and%20NLP.ipynb)
	- I explored the data to determine most commons words
	- Reviewed with and without stemming and lemmatization
	- Reviewed individual subreddits
3. [Further Analysis](./Further%20Analysis.ipynb)
	- Intepretted my model