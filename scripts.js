let xs = 480;
let sm = 768;
let md = 992;
let lg = 1200;

$( document ).ready(function() {

  let bxsliderElems = $('.elements');
  let listBox = $('.bxslider');
  let bxsliderElemsLength = bxsliderElems.length;

  //MOBILE
  if (window.innerWidth <= xs) {

    bxsliderElems.css('width', 28.5 + '%');
    listBox.css('width', (28.5*bxsliderElemsLength) + '%');

  }

  //TABLET
  if ((window.innerWidth > xs && window.innerWidth < md) && bxsliderElemsLength > 8) {

    bxsliderElems.css('width', 28.5 + '%');
    listBox.css('width', (28.5*bxsliderElemsLength) + '%');
    listBox.css('flex-wrap', 'nowrap');

  }

  //DESKTOP

  let elemsPerSlide = 7;

  $( "#num-slides" ).change(function(){
    elemsPerSlide = $( "#num-slides" ).val();
    blueSlider();
  });

  if (bxsliderElemsLength > elemsPerSlide && window.innerWidth >= md) {

    $('.slider-controls').css('display', 'flex');

    let prevArrow = $('.slider-controls .slide-prev');
    let nextArrow = $('.slider-controls .slide-next');

    let elemWidth;
    let maxMargin;
    let firstSeven;
    let lastSeven;
    let marginLeft;
    let count;
    let numSlides;

    blueSlider();

    function blueSlider() {

      $( 'li.elements' ).remove('.cloneBefore').removeClass('cloneBefore');
      $( 'li.elements' ).remove('.cloneAfter').removeClass('cloneAfter');
      
      elemWidth = 100 / elemsPerSlide;
      maxMargin = 100;
      marginLeft = -maxMargin;

      bxsliderElems = $('.elements');
      bxsliderElemsLength = bxsliderElems.length;

      cloneBefore = bxsliderElems.slice(bxsliderElemsLength - elemsPerSlide,bxsliderElemsLength);
      cloneAfter = bxsliderElems.slice(0,elemsPerSlide);
      cloneBefore.clone().addClass('cloneBefore').prependTo(listBox);
      cloneAfter.clone().addClass('cloneAfter').appendTo(listBox);

      bxsliderElems = $('.elements');
      bxsliderElemsLength = bxsliderElems.length;
      bxsliderElems.css('width', elemWidth + '%');
      listBox.css('width', (elemWidth*bxsliderElemsLength) + '%');
      listBox.css('marginLeft', -maxMargin + '%');

      count = 1;
      numSlides = Math.floor( (bxsliderElemsLength - elemsPerSlide*2) / elemsPerSlide );

    }

    nextArrow.click(function(){

      if (bxsliderElemsLength % elemsPerSlide != 0) {

        if ( marginLeft <= 0 && marginLeft > -(elemWidth * (bxsliderElemsLength - elemsPerSlide*2)) ) {
          marginLeft = marginLeft - maxMargin;

          console.log('1');
        }

        if ( marginLeft == -(elemWidth * (bxsliderElemsLength - elemsPerSlide*2)) ) {
          listBox.css('marginLeft', 0 + '%' );
          marginLeft = -maxMargin;

          console.log('2');
        }

        if (marginLeft < -(elemWidth * (bxsliderElemsLength - elemsPerSlide*2)) ) {
          marginLeft = -(elemWidth * (bxsliderElemsLength - elemsPerSlide*2));

          console.log('3');
        }

      } else {

        if ( marginLeft == -maxMargin*numSlides && count == numSlides ) {

          listBox.css('marginLeft', 0 + '%' );
          marginLeft = -maxMargin;
          count = 1;

          console.log('4');

        } else {

          marginLeft = marginLeft -maxMargin;
          count++;

          console.log('5');

        }

      }

      listBox.animate({
        marginLeft: marginLeft + '%'
      }, 1000);

    });

    prevArrow.click(function(){

      if (bxsliderElemsLength % elemsPerSlide != 0) {

        if (marginLeft < 0 && marginLeft != -maxMargin) {
          marginLeft = marginLeft + maxMargin;
        }

        if (marginLeft == -maxMargin) {
          listBox.css('marginLeft', -(elemWidth* (bxsliderElemsLength - elemsPerSlide)) + '%' );
          marginLeft = -(elemWidth * (bxsliderElemsLength - elemsPerSlide*2));
        }

        if (marginLeft >= -maxMargin) {
          marginLeft = -maxMargin;
        }

      } else {

        if ( marginLeft == -maxMargin && count == 1 ) {

          listBox.css('marginLeft', -(elemWidth* (bxsliderElemsLength - elemsPerSlide)) + '%' );
          marginLeft = -(elemWidth * (bxsliderElemsLength - elemsPerSlide*2));

          count = count*numSlides;

        } else {

          marginLeft = marginLeft + maxMargin;
          count--;

        }

      }

      listBox.animate({
        marginLeft: marginLeft + '%'
      }, 1000);

    });

  }

});