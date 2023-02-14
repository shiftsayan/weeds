function clickOnElement(element) {
  var bounding_box = element.getBoundingClientRect();
  var x = (bounding_box.left + bounding_box.right) / 2;
  var y = (bounding_box.top + bounding_box.bottom) / 2;
  document.elementFromPoint(x, y).click();
}

document.body.addEventListener("input", function (event) {
  typed_string = event.target.value;
  if (typed_string.includes("#")) {
    // Get indices of (first) tag
    index_start = typed_string.lastIndexOf("#");
    index_end = typed_string.indexOf(" ", index_start);
    if (index_end == -1) index_end = typed_string.length;

    // Map tag to calendar
    tag = typed_string.substring(index_start + 1, index_end);
    calendar_id = map_tag_to_calendar_id[tag];

    // Select calendar using simulated clicks
    if (calendar_id !== undefined) {
      // Click on the calendar group (only inline)
      elements = document.getElementsByClassName("Lvl1Vd");
      if (elements.length > 0) {
        clickOnElement(elements.item(elements.length - 1));
      }

      // Click on the calendar dropdown
      setTimeout(() => {
        element = document.getElementById("xCalSel");
        clickOnElement(element);
      }, 10);

      // Click on the calendar
      setTimeout(() => {
        elements = document.querySelectorAll(
          '[data-value="' + calendar_id + '"]'
        );
        clickOnElement(elements.item(elements.length - 1));
      }, 300);

      // Remove tag from event title
      var re = new RegExp(" ?#" + tag);
      event.target.value = typed_string.replace(re, "");

      // Focus on event title
      setTimeout(() => {
        event.target.focus();
      }, 600);
    }
  }
});
