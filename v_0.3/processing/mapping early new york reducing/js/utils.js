function simple_tooltip(target_items, name) {
    $(target_items).each(function (i) {
      $("body").append(
        "<div class='" +
          name +
          "' id='" +
          name +
          i +
          "'><p>" +
          $(this).attr("title") +
          "</p></div>"
      );
      var my_tooltip = $("#" + name + i);
  
      $(this)
        .removeAttr("title")
        .mouseover(function () {
          my_tooltip.css({ opacity: 1.0, display: "none" }).fadeIn(200);
        })
        .mousemove(function (kmouse) {
          my_tooltip.css({
            left: kmouse.pageX + 15,
            top: kmouse.pageY + 15,
          });
        })
        .mouseout(function () {
          my_tooltip.fadeOut(200);
        });
    });
  }


// Function to calculate the
// length of an array
function sizeOfArray(array) {
    // A variable to store
    // the size of arrays
    let size = 0;
  
    // Traversing the array
    for (let key in array) {
      // Checking if key is present
      // in arrays or not
      if (array.hasOwnProperty(key)) {
        size++;
      }
    }
  
    // Return the size
    return size;
  };
  
  function itemsCompressExpand(items_class, caret_id) {
    if ($(caret_id).hasClass("fa-minus-square")) {
      $(caret_id).removeClass("fa-minus-square").addClass("fa-plus-square");
      $(items_class).hide();
    } else if ($(caret_id).hasClass("fa-plus-square")) {
      $(caret_id).removeClass("fa-plus-square").addClass("fa-minus-square");
      $(items_class).show();
    }
  }
  
  function sectionCompressExpand(section_id, caret_id) {
    if ($(caret_id).hasClass("fa-minus-square")) {
      $(caret_id).removeClass("fa-minus-square").addClass("fa-plus-square");
      $(section_id).slideUp();
    } else if ($(caret_id).hasClass("fa-plus-square")) {
      $(caret_id).removeClass("fa-plus-square").addClass("fa-minus-square");
      $(section_id).slideDown();
    }
  }
  