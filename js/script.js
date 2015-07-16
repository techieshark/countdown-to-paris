var window, twttr;

(function () {

  var clock;

  $(document).ready(function () {
    // Grab the current date
    var eventStart = new Date("30 Nov 2015 09:00:00 +0100");
    // var eventStart = new Date("30 Nov 2015 20:30:00 +1200");
    // var eventStart = new Date("15 Aug 2015 20:30:00 +1200");
    // var eventStart = new Date("14 Aug 2015 20:30:00 +1200");
    // var eventStart = new Date("13 Aug 2015 20:30:00 +1200");
    // var eventStart = new Date("12 Aug 2015 20:30:00 +1200");
    // var eventStart = new Date("11 Aug 2015 20:30:00 +1200");
    // var eventStart = new Date("04 Aug 2015 20:30:00 +1200");
    // var eventStart = new Date("28 July 2015 20:30:00 +1200");
    // var eventStart = new Date("21 July 2015 20:30:00 +1200");
    // var eventStart = new Date("15 July 2015 20:30:00 +1200");
    // var eventStart = new Date("14 July 2015 20:30:00 +1200");


    // Calculate the difference in seconds between the future and current date
    // var diff = eventStart.getTime() / 1000 - currentDate.getTime() / 1000;

    // Instantiate a coutdown FlipClock
    // clock = $('.clock').FlipClock(diff, {
    clock = $('.clock').FlipClock(eventStart, {
      clockFace: 'MonthlyCounter',
      countdown: true,
    });

    window.setInterval(function () {
      var timer = clock.getTime();
      $("#text-clock .months .number").text(timer.getMonths());
      $("#text-clock .days .number").text(timer.getDays());
      $("#text-clock .hours .number").text(timer.getHours(true));
      $("#text-clock .minutes .number").text(timer.getMinutes(true));
      $("#text-clock .seconds .number").text(timer.getSeconds(true));

      $("#text-clock2 .months .number").text(timer.getMonths());
      $("#text-clock2 .days .number").text(timer.getDays());
      $("#text-clock2 .hours .number").text(timer.getHours(true));
      $("#text-clock2 .minutes .number").text(timer.getMinutes(true));
      $("#text-clock2 .seconds .number").text(timer.getSeconds(true));

    }, 1000);
  });


  var pluralizeTime = function (word, number) {
    return word + (number !== 1 ? 's' : '');
  };

  var timerComponents = function (timer) {
    var m = timer.getMonths();
    var d = timer.getDays();
    var h = timer.getHours(true);
    var min = timer.getMinutes(true);
    var s = timer.getSeconds(true);
    return {
      month: { value: m, label: pluralizeTime('month', m) },
      day: { value: d, label: pluralizeTime('day', d) },
      hour: { value: h, label: pluralizeTime('day', h) },
      minute: { value: min, label: pluralizeTime('day', min) },
      second: { value: s, label: pluralizeTime('day', s) }
    };
  }


  // Log any kind of Web Intent event to Google Analytics
  // Category: "twitter_web_intents"
  // Action: Intent Event Type
  // Label: Identifier for action taken: tweet_id, screen_name/user_id, click region

  // Define our custom event handlers
  function clickEventToAnalytics(intentEvent) {
    if (!intentEvent) {
      return;
    }
    var label = intentEvent.region;
    pageTracker._trackEvent('twitter_web_intents', intentEvent.type, label);
  }

  function tweetIntentToAnalytics(intentEvent) {
    if (!intentEvent) {
      return;
    }
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
    var components = timerComponents(timer);
    var countdown = components.hour.value + 'h ' + components.minute.value + 'm ' + components.second.value + 's';

    twttr.widgets.createShareButton(
      'https://techieshark.github.io/countdown-to-paris/',
      document.getElementById('tweet-container'),
      {
        text: 'Only ' + components.month.value + ' ' + components.month.label + ', ' + components.day.value + ' ' + components.day.label + ', ' + countdown + ' until the #COP21 Paris #climate talks. The time for action: NOW.',
        hashtags: 'cntdwn2paris',
        size: 'large',
        counturl: 'http://www.theguardian.com/world/2015/jun/14/paris-climate-meeting-vital'
      }
    );
  });

}());
