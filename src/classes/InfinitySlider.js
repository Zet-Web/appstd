export default class InfinitySlider {
  constructor() {}

  init() {
    let value = 0,
      length = $(".JSsliderItems").length,
      count = 1;

    $(`.JSsliderItems`).eq(0).clone(true).appendTo(".JSslider");
    $(".JSsliderItems").each(function () {
      $(this).attr("data-id", count);
      count++;
    });
    count = 1;
    setInterval(() => {
      $(".JSslider").css({
        transform: `translate3d(${-value / fontHtml}rem,0,0)`,
      });
      value += 0.35;
      if (
        $(".JSsliderItems:last").offset().left +
          $(".JSsliderItems:last").outerWidth() <=
        $(window).width()
      ) {
        console.log(count);
        let items = $(`.JSsliderItems[data-id="${count}"]`).clone(true);
        $(`.JSsliderItems[data-id="${count}"]`).remove();
        // console.log(($('.JSslider').outerWidth() / length) / fontHtml)
        value -= $(".JSslider").outerWidth() / length;
        $(".JSslider").css({
          transform: `translate3d(${-value / fontHtml}rem,0,0)`,
        });
        items.appendTo(".JSslider");
        if (count == length) {
          count = 0;
        }
        count++;
      }
    }, 2);
  }
}
