# Notes

## Roadmap

* Method to get the number of expected calculations
* Distances
* Phonetics
* MVP Tree
* Higher order VP Tree
* Suffix Tree clustering
* NN-Descent
* Jaccard Sketch clustering
* Bitap
* KNN clustering
* Inverted Index (Complex & Simple) / Array to store doc id + weight + number of positions + positions for memory efficiency (Integer Array)
* Write about the rationale behind the naive clustering composition methods

## Clustering

* Abstract a class for similarity clusterers to enable asynchronous work, possibility to abort computation etc.
* It should be possible to make some optimization to the naive clusterer (whose worst case would perform the same amount of computation) by comparing new elements to only one item of an already existing cluster.
* Method 3 should be possible to do without computing a graph but by holding a hashmap of items.
* Method to return the similarity graph and to get a cluster index rather. (canopy then blocking for instance).
* Clusterer should hold the number of comparisons made
* Clusterer should have chunk, async & emit progress events
* SNM clustering is quite efficient when using ngram fingerprinting & a really small window.
* The similarity graph must be undirected if you want the clusters to have a full diameter instead of radius somehow.
* Possible to create modes for the naive clusterer `normal`, `minLengthFirst`, `maxLengthFirst`, or even `full`?

## UI

* Pre-processing.
* Inverted-Index of unique values to cut computations.
* Should shuffle the values before applying clustering.
* Difference between merge & harmonize.
* Cluster expansion through inverted index sorted by occurrences.
* Suggest methods based on size of the dataset.

## Recipes

* Ngram blocking or SNM.
* Double Metaphone key collision.
* Overlap coefficient on names.
