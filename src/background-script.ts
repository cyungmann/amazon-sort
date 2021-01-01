browser.contextMenus.create({
  id: "sort-amazon-tabs",
  title: "Sort Amazon Tabs by Number of Reviews",
  contexts: ["tab"]
});

browser.contextMenus.onClicked.addListener((info, _tab) => {
  switch (info.menuItemId) {
    case "sort-amazon-tabs":
      browser.tabs.query({ highlighted: true }).then(tabs => {
        tabs = tabs.filter(tab => tab.url != null && tab.url.includes('amazon.com') && tab.id != null);
        Promise.all(tabs.map(tab => browser.tabs.executeScript(tab.id!, {
          file: '/page-script.js'
        }))).then(results => {
          const tabsWithNumRatings = tabs.map((tab, i) => ({tab: tab, numRatings: results[i][0]}))
            .filter(x => x.numRatings != null && x.numRatings > 0)
            .sort((lhs, rhs) => rhs.numRatings - lhs.numRatings);

          const tabIndices = tabsWithNumRatings.map(x => x.tab.index).sort((lhs, rhs) => rhs - lhs);

          for (let i = tabsWithNumRatings.length - 1; i > -1; --i) {
            browser.tabs.move(tabsWithNumRatings[i].tab.id!, { index: tabIndices[tabIndices.length - i - 1] });
          }
        });
      });
      break;
  }
});
