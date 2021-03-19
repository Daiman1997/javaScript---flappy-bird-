
// Создаем сам канвас и делаем его 2Д
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");
// Создаем все объекты 
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();
// Загружаем эти объекты 
bird.src = "img/flappy_bird_bird.png";
bg.src = "img/flappy_bird_bg.png";
fg.src = "img/flappy_bird_fg.png";
pipeUp.src = "img/flappy_bird_pipeUp.png";
pipeBottom.src = "img/flappy_bird_pipeBottom.png";
// Добавляем Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();
// Загружаем Звуковые файлы
fly.src = "audio/fly.mp3"
score_audio.src = "audio/score.mp3"
// Растояние между нижним и верхним Pipe
var gap = 90;
// Кординаты для Расположения Птички
var xPos = 10;
var yPos = 150;
// Скорость падения птички по Y
var grav = 1.5;
// Счетчик Счета
var score = 0;
// С помощью функции обозначаем расположение элементов на Экране
function draw() {
	// Расположение верхнего фона
	ctx.drawImage(bg, 0, 0);
	// Расположение верхнего и нижнего Pipe
	// Создаем цыкл для отрисовки блоков Pipe
	for (var i = 0; i < pipe.length; i++) {
		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
		// Приводим в движение блоки
		pipe[i].x--;
		// Делаем постоянное создание новых блоков
		if (pipe[i].x == 125) {
			pipe.push({
				x : cvs.width,
				y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
			})
		}
		// При столкновении с блоком конец игры!
		if (xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width
			&& (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= 
			pipe[i].y + pipeUp.height + gap) || yPos + bird.height >=
			cvs.height - fg.height) {
				location.reload(); // Перезапуск игры!!!
		}
		// Изменение счета очков
		if (pipe[i].x == 5) {
			score++;
			score_audio.play();
		}
	}
	// Расположение нижнего фона
	ctx.drawImage(fg, 0, cvs.height - fg.height);
	// Расположение птички
	ctx.drawImage(bird, xPos, yPos);
	// При изменение переменной Graw будет менятся положение птички по Y
	yPos += grav
	//Создаем цвет, шрифт и текст где описывается Счет
	ctx.fillStyle = "#000";
	ctx.font = "24px Verdana";
	ctx.fillText("Счет: " + score, 10, cvs.height - 20)
	// Делаем Анимацию из grav
	// Так как grav добавляет +1px к положению по Y
	// мы зацикливаем его что бы он добавлял по +1px без остановки бесконечно
	// за счет этого птичка падает в низ
	requestAnimationFrame(draw);
}

// Делаем запуск функции только после загрузки нижнего Pipe
pipeBottom.onload = draw;

// Добавляем кнопку при нажатии которой птичка полетит
document.addEventListener("keydown", moveUp);
// Функция для кнопки определяет на сколько подлетит птичка и издает звук
function moveUp() {
	yPos -= 25;
	fly.play();
}

// Создаем появление блоков препятствий
var pipe = [];
pipe[0] = {
	x : cvs.width,
	y : 0
}