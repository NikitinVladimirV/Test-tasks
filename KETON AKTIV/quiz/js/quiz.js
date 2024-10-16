"use strict";

window.addEventListener('DOMContentLoaded', () => {
    let count = 0;
    let time = 600,
        intr;

    function start_timer() {
        intr = setInterval(tick, 1000);
    }

    function tick() {
        time = time - 1;
        let mins = Math.floor(time / 60);
        let secs = time - mins * 60;
        if (mins == 0 && secs == 0) {
            clearInterval(intr);
        }
        secs = secs >= 10 ? secs : "0" + secs;
        mins = mins >= 10 ? mins : "0" + mins;

        document.querySelector('#mins').innerHTML = mins;
        document.querySelector('#secs').innerHTML = secs;
    }
    const options = document.querySelectorAll('.quiz_option'),
        steps = document.querySelectorAll('.quiz_step'),
        nums = document.querySelectorAll('.quiz_num'),
        inputs = document.querySelectorAll('.quiz_form form input');
    let isClicked = false;

    options.forEach((option) => {
        option.addEventListener('click', () => {
            if (!isClicked) {
                isClicked = true;
                count++;
                option.classList.add('active');
                setTimeout(() => {
                    steps.forEach((step, _index) => {
                        if (_index == count) {
                            step.style.display = 'block';
                            setTimeout(() => {
                                step.classList.add('active');
                            }, 400)
                            if (count == 3) {
                                document.querySelector('.quiz_nums').style.display = 'none';
                                document.querySelector('.quiz_title').style.display = 'none';
                                document.querySelector('.order_title').style.display = 'block';
                                start_timer();
                                document.querySelector('#prod_img').style.display = 'block';
                                setTimeout(() => {
                                    document.querySelector('#prod_img').classList.add('active');
                                    setTimeout(() => {
                                        document.querySelector('#order_form').scrollIntoView({
                                            block: "end",
                                            ibehavior: "smooth"
                                        })
                                    }, 200)
                                }, 400)

                            } else {
                                nums[count].classList.add('active');
                            }
                        } else {
                            step.classList.remove('active');
                            setTimeout(() => {
                                step.style.display = 'none';
                            }, 400)

                        }
                    });
                    isClicked = false;
                }, 400)
            }
        })
    });

    inputs.forEach((input) => {
        input.addEventListener('focus', () => {
            input.classList.add('active');
        })
    })
});
