
  $(document).ready(function () {
    // Grab the current date
    var currentDate = new Date();
    var eventStart = new Date("Nov 30, 2015");

    // Calculate the difference in seconds between the future and current date
    var diff = eventStart.getTime() / 1000 - currentDate.getTime() / 1000;

    // Instantiate a coutdown FlipClock
    clock = $('.clock').FlipClock(diff, {
      clockFace: 'MonthlyCounter',
      // clockFace: 'WeeklyCounter',
      countdown: true,
    });
  });


  // Log any kind of Web Intent event to Google Analytics
  // Category: "twitter_web_intents"
  // Action: Intent Event Type
  // Label: Identifier for action taken: tweet_id, screen_name/user_id, click region

  // Define our custom event handlers
  function clickEventToAnalytics (intentEvent) {
    if (!intentEvent) return;
    var label = intentEvent.region;
    pageTracker._trackEvent('twitter_web_intents', intentEvent.type, label);
  }

  function tweetIntentToAnalytics (intentEvent) {
    if (!intentEvent) return;
    var label = "tweet";
    pageTracker._trackEvent(
      'twitter_web_intents',
      intentEvent.type,
      label
    );
  }

  // Wait for the asynchronous resources to load
  twttr.ready(function (twttr) {
    // Now bind our custom intent events
    twttr.events.bind('click', clickEventToAnalytics);
    twttr.events.bind('tweet', tweetIntentToAnalytics);

    var timer = clock.getTime();
    var countdown = timer.getHours(true) + 'h ' + timer.getMinutes(true) + 'm ' + timer.getSeconds(true) + 's';

    twttr.widgets.createShareButton(
      'https://techieshark.github.io/countdown-to-paris/',
      document.getElementById('tweet-container'),
      {
        text: 'Only ' + clock.getTime().getDays() + ' days, ' + countdown + ' until the #COP21 Paris #climate talks. The time for action: now.',
        hashtags: 'cntdwn2paris',
        size: 'large',
        counturl: 'http://www.theguardian.com/world/2015/jun/14/paris-climate-meeting-vital'
      }
    );
  });