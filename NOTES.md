# Notes

## Roadmap

* Method to get the number of expected calculations
* Distances
* Phonetics
* Similarity Clusterer abstract
* MVP Tree
* Higher order VP Tree
* SNM Clusterer
* Canopy clustering
* Suffix Tree clustering
* NN-Descent
* Jaccard Sketch clustering
* Bitap
* Inverted Index (Complex & Simple) / Array to store doc id + weight + number of positions + positions for memory efficiency (Integer Array)
* Write about the rationale behind the naive clustering composition methods

## Clustering

* Make some tests regarding the three methods.
* Normalize options across similarity clusterers (similarity, distance/radius combo).
* Move some clusterers to `clustering/similarity`.
* Rework `SNM` to apply several comparisons blocks.
* Abstract a class for similarity clusterers to enable asynchronous work, possibility to abort computation etc.
* It should be possible to make some optimization to the naive clusterer (whose worst case would perform the same amount of computation) by comparing new elements to only one item of an already existing cluster.
* Method 3 should be possible to do without computing a graph but by holding a hashmap of items.
* Method to return the similarity graph and to get a cluster index rather. (canopy then blocking for instance).
* Clusterer should hold the number of comparisons made
* Clusterer should have chunk, async & emit progress events
* SNM clustering is quite efficient when using ngram fingerprinting & a really small window.
* The similarity graph must be undirected if you want the clusters to have a full diameter instead of radius somehow.
* Possible to create modes for the naive clusterer `normal`, `minLengthFirst`, `maxLengthFirst`, or even `full`?
