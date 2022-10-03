$(document).ready(function () {
  const btnGameStart = $('.start');
  const btnGamePause = $('.check');
  const btnNewRGame = $('.new');
  const displayMinutes = $('.display__minutes');
  const displaySeconds = $('.display__seconds');

  // Listeners



	btnGameStart.on('click', () => {
		intervalCountDown = setInterval(startTimer, 1000);
	});

	let secondCountDown = 60,
		intervalCountDown;

	function startTimer() {
			$('.display__minutes').text('00');

			secondCountDown--;

			if (secondCountDown < 10) {
				displaySeconds.text('0' + secondCountDown);
			}
			if (secondCountDown > 9) {
				displaySeconds.text(secondCountDown);
			}

		if (secondCountDown == 0) {
			clearInterval(intervalCountDown);
		}
  }


	$('.puzzle-item-box').sortable({
		connectWith: '.puzzle-item-star, .puzzle-item-end',
	});
	$('.puzzle-item-box').sortable({
		connectWith: '.puzzle-item-end, .puzzle-item-star',
	});

	$('.check').on('click', () => {
		let modalDiv = $('.modal');

		$('.modal-container').css({
			backgroundColor: '#000000c7',
			zIndex: 3,
		});

		modalDiv.css('top', 100);
		modalDiv.css('left', (window.innerWidth - modalDiv.width()) / 2);
		modalDiv.css('display', 'flex');

		modalDiv.fadeIn();
	});


  $('.close').on('click', () => {
    $('.modal').fadeOut(function () {
      $('.modal-container').css({
        backgroundColor: '#fff',
        zIndex: -1,
      });
    });
  });

  const checkNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  let check = true;

  $('.result').on('click', () => {
    clearInterval(intervalCountDown);

    $('.modal').fadeOut();

    for (let i = 0; i < $('[data-id]').length; i++) {
      if ($(`[data-id]`).eq(i).data().id !== checkNum[i]) {
        check = false;
        break;
      }
    }

    if (check) {
      let modalDiv = $('.modal-win');

      $('.modal-container').css({
        backgroundColor: '#000000c7',
        zIndex: 3,
      });

      modalDiv.css('top', 100);
      modalDiv.css('left', (window.innerWidth - modalDiv.width()) / 2);
      modalDiv.css('display', 'flex');

      modalDiv.fadeIn();
    } else {
      let modalDiv = $('.modal-lose');

      $('.modal-container').css({
        backgroundColor: '#000000c7',
        zIndex: 3,
      });

      modalDiv.css('top', 100);
      modalDiv.css('left', (window.innerWidth - modalDiv.width()) / 2);
      modalDiv.css('display', 'flex');

      modalDiv.fadeIn();
    }

    check = true;
  });

  $('.close-win').on('click', () => {
    $('.modal-win').fadeOut(function () {
      $('.modal-container').css({
        backgroundColor: '#fff',
        zIndex: -1,
      });
    });
    $('.modal-lose').fadeOut();
  });

	btnNewRGame.on('click', () => {
		clearInterval(intervalCountDown);
		displayMinutes.text = '01';
		displaySeconds.text = '00';

		location.reload();
	});


	btnNewRGame.on('mousedown', () => {

		let parent = $('#puzzle-start');
		let children = parent.children();

		while (children.length) {
			parent.append(
				children.splice(Math.floor(Math.random() * children.length), 1)[0]
			);
		}
	});

})
