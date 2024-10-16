$('.sendcomment').click(function(){
    let name = $('#textboxname');
    let message = $('#textboxtext');
    let error = $('.comment-error');
    if (name.val() != '' && message.val() != '') {
        let comments = $('.comments__kma');
                var today=new Date();
                var dd=today.getDate();
                var mm=today.getMonth()+1;
                var yyyy=today.getFullYear();
                if(dd<10){dd='0'+dd}if(mm<10){mm='0'+mm}today=dd+'.'+mm+'.'+yyyy;


        let item = $(`
              <div class="mycomment">
                            <img class="mycomment-img" src="img/a0.jpg" alt="" />
                            <div class="mycomment-info">
                              <div class="mycomment-info__inner">
                                <p class="mycomment-name">${name.val()}</p>
                                <p class="mycomment-text">${message.val()}</p>
                                <div class="like-count" onclick="scrollForm()">
                                  <img class="icon__small" src="img/i-heart.webp" />
                                </div>
                              </div>
                              <p class="mycomment-bottom">
                                <span style="cursor: pointer;color: #1b74e4;" onclick="scrollForm()">Me gusta</span>
                                <span style="cursor: pointer;color: #1b74e4;" onclick="scrollForm()">Respuesta</span>
                                <span>${today}</span>
                              </p>
                            </div>
                          </div>
        `)

        comments.append(item);
        $('.comment-form').hide(500);
    }
    else {
        error.show();
        setTimeout(function() { 
            error.hide();
        }, 1000);
        return
    }
    name.val('');
    message.val('');
})
function scrollForm() {
    if ($('.quiz_form ').is(':visible')) $("html,body").animate({scrollTop:$("#order_form").offset().top - ($(window).height() - $("#order_form").outerHeight(true))},100)
    else $("html,body").animate({scrollTop:$(".quiz_wrap").offset().top - 10},100)
}