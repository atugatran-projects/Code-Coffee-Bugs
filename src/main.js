import kaboom from "kaboom";
import {Controls} from "./allFunc";

// Setting a title for the page
document.title = "Coder, Coffee and Bugs";

// Initialize context
kaboom({
	font: "sink",
	background: [210, 210, 155],
	scale: 0.8,
});

// Lets load the Sprites
loadSprite("bug", "sprites/bug.png");
loadSprite("programmer", "sprites/programmer.png");
loadSprite("coffee", "sprites/coffee.png");

// Lets load the Music
loadSound("background", "sounds/background.mp3");
loadSound("game over", "sounds/game over.mp3");
loadSound("harry harry", "sounds/harry harry.mp3");
loadSound("sip", "sounds/sip.mp3");

scene("game", () => {
	// Lets define some game variables
	let SPEED = 1000;
	let BSPEED = 2;
	let SCORE = 0;
	let scoreText;
	let bg = false;
	let backgroundMusic;
	let isbugs = false;

	// Lets define a function to display our score
	const displayScore = () => {
		destroy(scoreText);
		// a simple score counter
		scoreText = add([
			text("Score: " + SCORE),
			scale(3),
			pos(width() - 181, 21),
			color(10, 10, 255),
		]);
	};

	// Lets define a function to play background music
	const playBg = () => {
		if (!bg) {
			backgroundMusic = play("background", { volume: 0.5, loop: true });
			volume(1)
			bg = true;
			bugs();
			// btna()
		}
	};

	// Lets add the player
	const player = add([
		sprite("programmer"), // renders as a sprite
		pos(120, 80), // position in world
		area(), // has a collider
		scale(0.13),
	]);

	// Lets add events to our player
	const left = () => {
		playBg();
		player.move(-SPEED, 0);
		if (player.pos.x < 0) {
			player.pos.x = width()
		}
	};

	const right = () => {
		playBg();
		player.move(SPEED, 0);
		if (player.pos.x > width()) {
			player.pos.x = 0
		}
	};

	const up = () => {
		playBg();
		player.move(0, -SPEED);
		if (player.pos.y < 0) {
			player.pos.y = height()
		}
	};

	const down = () => {
		playBg();
		player.move(0, SPEED);
		if (player.pos.y > height()) {
			player.pos.y = 0
		}
	};

	onKeyDown("left", left);

	onKeyDown("right", right);

	onKeyDown("up", up);

	onKeyDown("down", down);

	onKeyPress("f", () => {
		fullscreen(!fullscreen())
	})

	// Lets add 4 bugs and a coffee on loop
	const bugs = () => {
		if (!isbugs) {
			loop(4, () => {
				for (let i = 0; i < 4; i++) {
					let x = rand(0, (width()));
					let y = height();

					let c = add([sprite("bug"), pos(x, y), area(), scale(0.13), "bug"]);
					c.onUpdate(() => {
						c.moveTo(c.pos.x, c.pos.y - BSPEED);
					});
				}

				let x = rand(0, width());
				let y = height();

				// Lets introduce a coffee for our programmer to drink
				let c = add([
					sprite("coffee"),
					pos(x, y),
					area(),
					scale(0.13),
					"coffee",
				]);
				c.onUpdate(() => {
					c.moveTo(c.pos.x, c.pos.y - BSPEED);
				});
				if (BSPEED < 13) {
					BSPEED += 1;
				}
			});
		}
	};

	player.onCollide("bug", () => {
		backgroundMusic.volume(0.0);
		// displayScore();
		go("lose", SCORE);
		isbugs = true;
		playBg();
		play("game over");
		destroy(player);
		addKaboom(player.pos);
		scoreText = add([
			text("Game Over"),
			scale(3),
			pos(10, 21),
			color(10, 10, 255),
		]);
	});

	player.onCollide("coffee", (coffee) => {
		backgroundMusic.volume(0.2);
		play("sip", {
			volume: 2,
		});
		destroy(coffee);
		SCORE += 1;
		displayScore();
		Controls()
		// 2 seconds until the volume is back
		wait(2, () => {
			backgroundMusic.volume(0.5);
		});
	});

	onKeyPress("a", () => {
		volume(0)
		go("game")
	})
	// Display the score
	displayScore();
	Controls()
});

// After GameOver
scene("lose", (SCORE) => {
	add([
		sprite("programmer"),
		pos(width() / 2, height() / 2.5),
		scale(0.4),
		origin("center"),
	]);

	// display score
	add([
		text("Score: " + SCORE),
		pos(width() / 2, height() / 2 + 150),
		scale(3.5),
		origin("center"),
	]);

	Controls()

	// go back to game with space is pressed
	onKeyPress("a", () => go("game"))
	onClick(() => go("game"))
});

go("game")

