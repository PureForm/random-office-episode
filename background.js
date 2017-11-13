var tabId = null;

function getRandomEpisode() {
  var episode = episodes[Math.floor(Math.random() * episodes.length)];
  var url = "https://www.netflix.com/watch/" + episode.id;

  return url;
}

function newTab() {
  console.debug('Opening new tab');
  chrome.tabs.create({"url": url}, function(tab) {
    tabId = tab.id;
    console.debug('Setting tabId: ' + tabId);
  });
}

function updateTab() {
  console.debug('Updating tabId: ' + tabId);
  chrome.tabs.update(tabId,{"url": url})
}

chrome.browserAction.onClicked.addListener(function(tab) {
  url = getRandomEpisode();

  if (tabId == null) {
    newTab(url);
  } else {
    updateTab(url);
  }
});

chrome.tabs.onRemoved.addListener(function(tabId_closed) {
  if (tabId_closed === tabId) {
    console.debug('Clearing old tabId: ' + tabId);
    tabId = null;
  }
});
