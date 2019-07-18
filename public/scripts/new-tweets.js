const errorMessage = function($errorMsg, message) {
  $errorMsg.children("h4").html(message);
  $errorMsg.slideDown(300);
}

// Post new tweet function
const $form = $('#newTweetCreate');
$form.on('submit', function() {
  event.preventDefault();
  const $input = $(this).find("input[type=text], textarea");
  const $errorMsg = $("#newTweetError");

  // Remove error message from view
  $errorMsg.slideUp(300);
  
  // If tweet textarea has been filled
  if (!$input.val()) {
    // Error message if empty form filled
    errorMessage($errorMsg, `Make sure to add some text to your Tweet and try again.`);
  } else if ($input.val().length > 140) {
    errorMessage($errorMsg, `Oops! Tweets can only be 140 characters are left. Shorten your tweet and try again.`);
  } else {
    // AJAX Post Request
    const serializedInput = $(this).serialize();
    const postURL = $(this).attr("action"); //get form action url
    const requestMethod = $(this).attr("method"); //get form GET/POST method

    $.ajax({
      url : postURL,
      type: requestMethod,
      data : serializedInput
      ,
    })
    .done(function() {
      // If successful, reset value of form, reset character counter, and update tweets elements
      $input.val("");
      $form.find(".counter").html("140");
      loadTweets();
    })
    .fail(function(jqXHR, error) {
      errorMessage($errorMsg, "Tweet was not posted, looks like there was a server issue: " + error);
    });
  }
});

