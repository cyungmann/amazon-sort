(function (_window, document) {
  const numRatingsEl = document.querySelector('#acrCustomerReviewText') as HTMLDivElement;
  if (numRatingsEl == null) {
    return null;
  }

  const ratingMatches = numRatingsEl
    .innerText
    .match(/^([\d,]+) ratings$/);

  if (ratingMatches == null || ratingMatches.length < 2) {
    return null;
  }

  return parseInt(ratingMatches[1].replace(/,/g, ''));
})(window, window.document);