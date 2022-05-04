export function filterArticleIdsFromMwRet(
    processedResponse: QueryMwRet,
    articleIdRegexFilter?: RegExp
  ): QueryMwRet {
    const filteredResponse: QueryMwRet = {};
    for (const [articleId, articleDetail] of Object.entries(processedResponse)) {
      if (articleIdRegexFilter) {
        if (articleIdRegexFilter.test(articleId)) {
          filteredResponse[articleId] = articleDetail;
        } else {
          console.log("filtering out: " + articleId)
        }
      }
      // console.log(articleId);
    }
    return filteredResponse;
  }
  
  export function filterArticleIdsFromList(
    articleIds: string[],
    articleIdRegexFilter?: RegExp
  ): string[] {
    if (articleIdRegexFilter) {
      return articleIds.filter((articleId) => {
        if(articleIdRegexFilter.test(articleId)){
          return true
        } else {
          console.log('filtering out: ' + articleId)
          return false
        }
      });
    } else {
      // console.log(articleIds);
    }
  }
  