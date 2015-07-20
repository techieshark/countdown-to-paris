var window, twttr, ga;

(function () {

  var clock;


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
  };

  var getTwitterClockText = function () {
    var timer = clock.getTime();
    var components = timerComponents(timer);
    var countdown = components.hour.value + 'h ' + components.minute.value + 'm ' + components.second.value + 's';
    return components.month.value + ' ' + components.month.label + ', ' + components.day.value + ' ' + components.day.label + ', ' + countdown;
  };

  var tweet = function (phrase, url, hashtags) {
    var tweetUrl = 'https://twitter.com/intent/tweet?text=' +
      encodeURIComponent(phrase) +
      '&url=' + encodeURI(url) +
      '&hashtags=' + hashtags;

    var width = 550, height = 300;
    var left = (window.screen.width - width) / 2;
    var top = (window.screen.height - height) / 2;
    var params = 'width=' + width + ', height=' + height + ', top=' + top + ', left=' + left + ', resizable=1';
    window.open(tweetUrl, '', params);
  };

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

    $('.tweet-button').click(function () {
      // launch new window with tweet content
      tweet('Only ' + getTwitterClockText() + ' until the Paris Climate talks',
        'http://climate-countdown.com',
        'COP21,cntdwn2paris');
      ga('send', 'event', 'twitter_web_intents', 'click', 'label', 'type');

    });

  });


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
    // pageTracker._trackEvent('twitter_web_intents', intentEvent.type, label);
    ga('send', 'event', 'twitter_web_intents', 'click', intentEvent.type, label);
  }

  function tweetIntentToAnalytics(intentEvent) {
    if (!intentEvent) {
      return;
    }
    var label = "tweet";
    // pageTracker._trackEvent(
    //   'twitter_web_intents',
    //   intentEvent.type,
    //   label
    // );
    ga('send', 'event', 'twitter_web_intents', 'click', intentEvent.type, label);

  }

  // Wait for the asynchronous resources to load
  twttr.ready(function (twttr) {
    // Now bind our custom intent events
    twttr.events.bind('click', clickEventToAnalytics);
    twttr.events.bind('tweet', tweetIntentToAnalytics);
  });

}());
