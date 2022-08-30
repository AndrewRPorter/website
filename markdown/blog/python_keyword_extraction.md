---
title: Basic Keyword Extraction in Python
path: python_keyword_extraction
seoTitle: Basic Keyword Extraction in Python - Andrew R. Porter
description: Keyword extraction in Python via RAKE (Rapid Automatic Keyword Extraction).
datePublished: !!str 2022-08-30
---

# Basic Keyword Extraction in Python

[Keyword extraction](https://en.wikipedia.org/wiki/Keyword_extraction?oldformat=true) is a process by which important terms are identified that best represent the material in a document. Keyword extraction is a subset of NLP (natural language processing) and information retrieval systems.

Despite these scary words, keyword extraction is fairly simple to perform in Python thanks to the beauty of open-source software.

## Background

There are several different libraries/methods that can perform keyword extraction in Python. In this post, we will mainly focus on RAKE (Rapid Automatic Keyword Extraction).

RAKE is a novel method of automatically extracting keywords from documents created by researchers **much** smarter than me. Check out their paper [here](https://www.researchgate.net/publication/227988510_Automatic_Keyword_Extraction_from_Individual_Documents).

Thankfully, the open-source community has taken the approach described in this paper and created a wrapper extract keywords. We will be using the [rake-nltk](https://github.com/csurfer/rake-nltk) package to perform (note there are other python RAKE implementations but this one is PIP installable which I like).

_Checkout [this](https://www.analyticsvidhya.com/blog/2022/01/four-of-the-easiest-and-most-effective-methods-of-keyword-extraction-from-a-single-text-using-python/) awesome blog post by [Ali Mansour](https://www.analyticsvidhya.com/blog/author/ali8445u/) if you want to see a comparison of other Python keyword extraction libraries._

## Setup

Start by installing the package

```
pip install rake-nltk
```

### Debugging

If you see an error regarding missing nltk resources (stopwords or punkt), you may need to download them from nltk via the following commands:

```
python3 -c "import nltk; nltk.download('stopwords')"
python3 -c "import nltk; nltk.download('punkt')"
```

## Usage

```python
from rake_nltk import Rake

# text snippet from: https://en.wikipedia.org/wiki/COVID-19
text = """
Coronavirus disease 2019 (COVID-19) is a contagious disease caused by a virus,
the severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2).
The first known case was identified in Wuhan, China, in December 2019.
The disease quickly spread worldwide, resulting in the COVID-19 pandemic.
"""

rake = Rake()
rake.extract_keywords_from_text(text.strip())
keywords_with_scores = rake.get_ranked_phrases_with_scores()

for score, keyword in keywords_with_scores:
    print(keyword, score)
```

This will output the following keywords and their associated scores:

```shell
severe acute respiratory syndrome coronavirus 2 32.5
disease quickly spread worldwide 15.333333333333334
coronavirus disease 2019 10.333333333333334
contagious disease caused 9.333333333333334
first known case 9.0
2 ). 6.0
december 2019 4.5
19 pandemic 3.5
19 1.5
wuhan 1.0
virus 1.0
sars 1.0
resulting 1.0
identified 1.0
covid 1.0
covid 1.0
cov 1.0
china 1.0
```

_Note that you can use `get_ranked_phrases` instead to get just the keywords in ranked order without the associated score_

## Conclusion

Clearly the above output is not perfect but all in all the out of the box performance on a fairly small document is pretty impressive. Some text cleaning and output pruning can be performed to further reduce junk keywords such as `2 ).` and `19`.
