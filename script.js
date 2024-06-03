var StartScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function StartScene() {
    Phaser.Scene.call(this, { key: "startScene" });
  },

  preload: function () {
    this.load.image(
      "character1",
      "https://play.rosebud.ai/assets/_7bc98245-4e82-4a48-8852-c231784ea735.jpg?ptZn"
    );
    this.load.audio(
      "backgroundMusic",
      "https://play.rosebud.ai/assets/things-gonna-change-vernon-maytone-brotheration-reggae-2020-141310-[AudioTrimmer.com].mp3?JW2N"
    );
  },

  create: function () {
    // Add characters to the scene
    this.add.image(400, 400, "character1").setScale(1);

    // Add a title with a white border
    var title = this.add.text(200, 300, "", {
      color: "black",
      fontFamily: "Arial",
      fontSize: "60px",
      padding: 0,
    });
    title.setStroke("#FFFFFF", 9);

    var startButton = this.add
      .text(300, 400, "Start", {
        color: "white",
        fontFamily: "Arial",
        fontSize: "40px",
        backgroundColor: "rgba(255,204,1,0.8744747899159664)",
        padding: { left: 50, right: 50, top: 10, bottom: 10 },
      })
      .setInteractive();

    startButton.on("pointerdown", () => {
      this.scene.start("MainScene");
    });

    startButton.on("pointerover", () => {
      startButton.setBackgroundColor("rgba(255,204,1,0.8744747899159664)");
    });
    startButton.on("pointerout", () => {
      startButton.setBackgroundColor("rgba(0,0,0,0.6)");
    });

    // Play the background music
    this.music = this.sound.add("backgroundMusic");
    this.music.play({ loop: true });
  },
});

class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    this.volumeSlider = null; // Initialize volumeSlider to null
  }

  preload() {
    this.load.image(
      "bobMarleyRoom",
      "https://play.rosebud.ai/assets/bob marley room.png?Vckh"
    );
    this.load.image(
      "cardboardBox",
      "https://play.rosebud.ai/assets/cardboard box.png?lQ0D"
    );
    this.load.image(
      "cardboardBox2",
      "https://play.rosebud.ai/assets/cartoon box with lid open and vinyl records coming out of the box.png?dyt7"
    );
    this.load.image(
      "musicButton",
      "https://play.rosebud.ai/assets/button-304216_1280.png?0V77"
    );
    this.load.image(
      "nextButton",
      "https://play.rosebud.ai/assets/Custom-Icon-Design-Flat-Cute-Arrows-Button-Arrow-Right-1.512.png?i992"
    );
    this.load.image(
      "previousButton",
      "https://play.rosebud.ai/assets/Custom-Icon-Design-Flat-Cute-Arrows-Button-Arrow-Left-1.512.png?v4es"
    );
  }

  create() {
    // Add the background image
    this.add.image(400, 300, "bobMarleyRoom");

    // Add the first cardboard box at the bottom of the scene with a padding of 100px
    let boxImage1 = this.add.image(380, 800, "cardboardBox"); // Initially position it at the bottom of the screen

    // Resize the first box to 20% of its original size
    boxImage1.setScale(0.2);

    let boxHeight1 = boxImage1.displayHeight; // Get the height of the first image
    boxImage1.setY(630 - boxHeight1 / 2 - 20); // Set the y position of the first image considering the height of the image and the padding

    // Add the second cardboard box next to the first one
    let boxImage2 = this.add.image(
      boxImage1.x + boxImage1.displayWidth + 10,
      800,
      "cardboardBox2"
    ); // Initially position it next to the first box

    // Resize the second box to 20% of its original size
    boxImage2.setScale(0.2);

    let boxHeight2 = boxImage2.displayHeight; // Get the height of the second image
    boxImage2.setY(620 - boxHeight2 / 2 - 20); // Set the y position of the second image considering the height of the image and the padding

    // Add music button and scale it to 60px
    let musicButton = this.add.image(750, 550, "musicButton").setInteractive();
    let buttonScale = 60 / musicButton.width;
    musicButton.setScale(buttonScale);

    // Add volume slider
    this.createVolumeSlider();

    // Interactive music button
    musicButton.on("pointerdown", () => {
      if (this.scene.manager.scenes[0].music.isPlaying) {
        this.scene.manager.scenes[0].music.pause();
      } else {
        this.scene.manager.scenes[0].music.resume();
      }
    });

    // Volume control
    this.volumeSlider.oninput = function () {
      this.scene.manager.scenes[0].music.volume = this.volumeSlider.value;
    }.bind(this);

    // Add next scene button
    let nextButton = this.add.image(0, 0, "nextButton").setInteractive();
    nextButton.setOrigin(0, 0); // Change the origin to the top-left corner
    nextButton.setScale(0.1); // Resize the button to 20% of its original size
    nextButton.on("pointerdown", () => {
      this.scene.start("NextScene");
    });
  }

  createVolumeSlider() {
    if (!this.volumeSlider) {
      this.volumeSlider = document.createElement("input");
      this.volumeSlider.id = "volumeSlider";
      this.volumeSlider.type = "range";
      this.volumeSlider.min = 0;
      this.volumeSlider.max = 1;
      this.volumeSlider.step = 0.01;
      this.volumeSlider.value = this.scene.manager.scenes[0].music.volume; // Get the volume from the StartScene
      document.getElementById("renderDiv").appendChild(this.volumeSlider);
    }
  }
}

class NextScene extends Phaser.Scene {
  constructor() {
    super("NextScene");
  }

  preload() {
    this.load.image(
      "bobMarley2",
      "https://play.rosebud.ai/assets/bob marley2.png?ILZi"
    );
    this.load.image(
      "openBoxWithRecords",
      "https://play.rosebud.ai/assets/cartoon box with lid open and vinyl records coming out of the box.png?kR7W"
    );
    this.load.image(
      "nextButton",
      "https://play.rosebud.ai/assets/Custom-Icon-Design-Flat-Cute-Arrows-Button-Arrow-Right-1.512.png?i992"
    );
    this.load.image(
      "previousButton",
      "https://play.rosebud.ai/assets/Custom-Icon-Design-Flat-Cute-Arrows-Button-Arrow-Left-1.512.png?v4es"
    );
  }

  create() {
    this.add.image(400, 300, "bobMarley2");
    let openBoxWithRecords = this.add.image(100, 400, "openBoxWithRecords");
    openBoxWithRecords.setOrigin(0, 0); // Position the image in the left corner of the page

    let desiredWidth = 250;
    let scale = desiredWidth / openBoxWithRecords.width;
    openBoxWithRecords.setScale(scale); // Resize the open box with records to be 250px wide

    // Add music button and scale it to 60px
    let musicButton = this.add.image(750, 550, "musicButton").setInteractive();
    let buttonScale = 60 / musicButton.width;
    musicButton.setScale(buttonScale);

    // Interactive music button
    musicButton.on("pointerdown", () => {
      if (this.scene.manager.scenes[0].music.isPlaying) {
        this.scene.manager.scenes[0].music.pause();
      } else {
        this.scene.manager.scenes[0].music.resume();
      }
    });

    // Add back button on the same line as next button, but on the opposite side
    let backButton = this.add.image(800, 0, "previousButton").setInteractive();
    backButton.setOrigin(1, 0); // Change the origin to the top-right corner
    backButton.setScale(0.1); // Resize the button to 30% of its original size
    backButton.on("pointerdown", () => {
      this.scene.start("MainScene");
    });

    // Add next scene button on the left side
    let nextSceneButton = this.add.image(0, 0, "nextButton").setInteractive();
    nextSceneButton.setOrigin(0, 0); // Change the origin to the top-left corner
    nextSceneButton.setScale(0.1); // Resize the button to 20% of its original size
    nextSceneButton.on("pointerdown", () => {
      this.scene.start("ThirdScene");
    });
  }
}

class ThirdScene extends Phaser.Scene {
  constructor() {
    super("ThirdScene");
  }

  preload() {
    this.load.image(
      "bobMarleyRoom3",
      "https://play.rosebud.ai/assets/bob marley room3.png?8Hm5"
    );
    this.load.image(
      "nextButton",
      "https://play.rosebud.ai/assets/Custom-Icon-Design-Flat-Cute-Arrows-Button-Arrow-Right-1.512.png?i992"
    );
    this.load.image(
      "previousButton",
      "https://play.rosebud.ai/assets/Custom-Icon-Design-Flat-Cute-Arrows-Button-Arrow-Left-1.512.png?v4es"
    );
  }

  create() {
    // Add the background image
    this.add.image(400, 300, "bobMarleyRoom3");

    // Add music button and scale it to 60px
    let musicButton = this.add.image(750, 550, "musicButton").setInteractive();
    let buttonScale = 60 / musicButton.width;
    musicButton.setScale(buttonScale);

    // Interactive music button
    musicButton.on("pointerdown", () => {
      if (this.scene.manager.scenes[0].music.isPlaying) {
        this.scene.manager.scenes[0].music.pause();
      } else {
        this.scene.manager.scenes[0].music.resume();
      }
    });

    // Add next scene button on the left side
    let nextSceneButton = this.add.image(0, 0, "nextButton").setInteractive();
    nextSceneButton.setOrigin(0, 0); // Change the origin to the top-left corner
    nextSceneButton.setScale(0.1); // Resize the button to 20% of its original size
    nextSceneButton.on("pointerdown", () => {
      this.scene.start("FourthScene");
    });

    // Add previous scene button on the opposite side
    let previousSceneButton = this.add
      .image(800, 0, "previousButton")
      .setInteractive();
    previousSceneButton.setOrigin(1, 0); // Change the origin to the top-right corner
    previousSceneButton.setScale(0.1); // Resize the button to 30% of its original size
    previousSceneButton.on("pointerdown", () => {
      this.scene.start("NextScene");
    });
  }
}

class FourthScene extends Phaser.Scene {
  constructor() {
    super("FourthScene");
  }

  preload() {
    this.load.image(
      "fourthSceneBackground",
      "https://play.rosebud.ai/assets/_7efc9423-7495-416f-9ac0-08b6ca739f71.jpg?gt9c"
    );
    this.load.image(
      "nextButton",
      "https://play.rosebud.ai/assets/Custom-Icon-Design-Flat-Cute-Arrows-Button-Arrow-Right-1.512.png?i992"
    );
    this.load.image(
      "previousButton",
      "https://play.rosebud.ai/assets/Custom-Icon-Design-Flat-Cute-Arrows-Button-Arrow-Left-1.512.png?v4es"
    );
  }

  create() {
    // Add the background image
    this.add.image(400, 300, "fourthSceneBackground");

    // Add music button and scale it to 60px
    let musicButton = this.add.image(750, 550, "musicButton").setInteractive();
    let buttonScale = 60 / musicButton.width;
    musicButton.setScale(buttonScale);

    // Interactive music button
    musicButton.on("pointerdown", () => {
      if (this.scene.manager.scenes[0].music.isPlaying) {
        this.scene.manager.scenes[0].music.pause();
      } else {
        this.scene.manager.scenes[0].music.resume();
      }
    });

    // Add previous scene button on the opposite side
    let previousSceneButton = this.add
      .image(800, 0, "previousButton")
      .setInteractive();
    previousSceneButton.setOrigin(1, 0); // Change the origin to the top-right corner
    previousSceneButton.setScale(0.1); // Resize the button to 30% of its original size
    previousSceneButton.on("pointerdown", () => {
      this.scene.start("ThirdScene");
    });

    // Add next scene button on the left side
    let nextSceneButton = this.add.image(0, 0, "nextButton").setInteractive();
    nextSceneButton.setOrigin(0, 0); // Change the origin to the top-left corner
    nextSceneButton.setScale(0.1); // Resize the button to 20% of its original size
    nextSceneButton.on("pointerdown", () => {
      this.scene.start("FifthScene");
    });
  }
}

class FifthScene extends Phaser.Scene {
  constructor() {
    super("FifthScene");
  }

  preload() {
    this.load.image(
      "fifthSceneBackground",
      "https://play.rosebud.ai/assets/_98bc516d-453a-45d7-b0ef-67c009917976-Photoroom.jpg?4pNE"
    );
    this.load.image(
      "nextButton",
      "https://play.rosebud.ai/assets/Custom-Icon-Design-Flat-Cute-Arrows-Button-Arrow-Right-1.512.png?i992"
    );
    this.load.image(
      "previousButton",
      "https://play.rosebud.ai/assets/Custom-Icon-Design-Flat-Cute-Arrows-Button-Arrow-Left-1.512.png?v4es"
    );
    this.load.image(
      "websiteButton",
      "https://play.rosebud.ai/assets/button-304216_1280.png?0V77"
    );
  }

  create() {
    // Add the background image
    this.add.image(300, 500, "fifthSceneBackground");

    // Add music button and scale it to 60px
    let musicButton = this.add.image(750, 550, "musicButton").setInteractive();
    let buttonScale = 60 / musicButton.width;
    musicButton.setScale(buttonScale);

    // Interactive music button
    musicButton.on("pointerdown", () => {
      if (this.scene.manager.scenes[0].music.isPlaying) {
        this.scene.manager.scenes[0].music.pause();
      } else {
        this.scene.manager.scenes[0].music.resume();
      }
    });

    // Add previous scene button on the opposite side
    let previousSceneButton = this.add
      .image(800, 0, "previousButton")
      .setInteractive();
    previousSceneButton.setOrigin(1, 0); // Change the origin to the top-right corner
    previousSceneButton.setScale(0.1); // Resize the button to the same scale as the next button
    previousSceneButton.on("pointerdown", () => {
      this.scene.start("FourthScene");
    });

    // Add the website button
    let websiteButton = this.add
      .text(400, 580, "Visit arts4refugees.substack.com to discover more!", {
        color: "#83f28f", // Light blue color,
        fontFamily: "Arial",
        fontSize: "20px",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        padding: { left: 20, right: 20, top: 10, bottom: 10 },
      })
      .setOrigin(0.5, 1)
      .setInteractive();

    websiteButton.on("pointerdown", () => {
      window.open("https://arts4refugees.substack.com/", "_blank");
    });
  }
}

var config = {
  type: Phaser.AUTO,
  parent: "renderDiv",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: [
    StartScene,
    MainScene,
    NextScene,
    ThirdScene,
    FourthScene,
    FifthScene,
  ],
};

var game = new Phaser.Game(config);
