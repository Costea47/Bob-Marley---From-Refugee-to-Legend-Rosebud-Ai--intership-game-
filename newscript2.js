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
    this.add.image(400, 400, "character1").setScale(1);
    var title = this.add
      .text(200, 300, "", {
        color: "black",
        fontFamily: "Arial",
        fontSize: "60px",
        padding: 0,
      })
      .setStroke("#FFFFFF", 9);

    var startButton = this.add
      .text(300, 400, "Start", {
        color: "white",
        fontFamily: "Arial",
        fontSize: "40px",
        backgroundColor: "rgba(255,204,1,0.874)",
        padding: { left: 50, right: 50, top: 10, bottom: 10 },
      })
      .setInteractive();

    startButton.on("pointerdown", () => this.scene.start("InstructionScene"));
    startButton.on("pointerover", () =>
      startButton.setBackgroundColor("rgba(255,204,1,0.874)")
    );
    startButton.on("pointerout", () =>
      startButton.setBackgroundColor("rgba(0,0,0,0.6)")
    );

    this.music = this.sound.add("backgroundMusic");
    this.music.play({ loop: true });
  },
});

class InstructionScene extends Phaser.Scene {
  constructor() {
    super("InstructionScene");
  }

  preload() {
    this.load.image(
      "instructionBackground",
      "https://play.rosebud.ai/assets/Designer.png?x6xw"
    );
  }

  create() {
    this.add.image(400, 300, "instructionBackground").setScale(0.5);

    this.add
      .text(400, 410, "Welcome to Bob Marley - From Refugee to Legend", {
        fontSize: "26px",
        color: "#84eab3",
        fontFamily: "Arial",
        backgroundColor: "rgba(0,0,0,0.6)",
      })
      .setOrigin(0.5);
    this.add
      .text(
        400,
        440,
        "🖱️Explore each scene by clicking on the boxes you find.",
        {
          fontSize: "18px",
          color: "#84eab3",
          fontFamily: "Arial",
          backgroundColor: "rgba(0,0,0,0.6)",
        }
      )
      .setOrigin(0.5);

    const proceedButton = this.add
      .text(400, 500, "Proceed", {
        fontSize: "24px",
        backgroundColor: "rgba(46,244,137,255)",
        padding: { x: 10, y: 5 },
        color: "#000000",
      })
      .setInteractive()
      .setOrigin(0.5);

    proceedButton.on("pointerdown", () => {
      this.scene.start("MainScene");
    });
  }
}
class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
    this.volumeSlider = null;
    this.boxes = [];
    this.factButtons = {};
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
      "https://play.rosebud.ai/assets/cardboard box.png?lQ0D"
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
    this.load.image(
      "vinylRecord",
      "https://play.rosebud.ai/assets/_5a21d28d-4eb5-41f0-bb2d-f24ddfa0a0f8-removebg-preview.png?0n9J"
    );
    this.load.image(
      "openBox",
      "https://play.rosebud.ai/assets/cardboard box.png?lQ0D"
    );
    this.load.image(
      "vinylRecordImage",
      "https://play.rosebud.ai/assets/_48e3534f-1c4c-41a5-9dab-6a65dda86323-removebg-preview (2).png?opob"
    );
    this.load.image(
      "newImage",
      "https://play.rosebud.ai/assets/_4e0d1f70-82cf-45fd-a526-9ed827b16827-removebg-preview.png?ouJa"
    );
  }

  create() {
    this.add.image(400, 300, "bobMarleyRoom");

    // Create boxes with their respective fact scene keys
    this.createBox(380, 550, "cardboardBox", "vinylRecord", "factScene1");
    this.createBox(460, 520, "cardboardBox2", "vinylRecordImage", "factScene2");
    this.createBox(250, 550, "openBox", "newImage", "factScene3");

    let musicButton = this.add
      .image(750, 550, "musicButton")
      .setInteractive()
      .setScale(0.05);
    this.createVolumeSlider();

    musicButton.on("pointerdown", () => {
      let music = this.scene.manager.scenes[0].music;
      music.isPlaying ? music.pause() : music.resume();
    });

    this.volumeSlider.oninput = function () {
      this.scene.manager.scenes[0].music.volume = this.volumeSlider.value;
    }.bind(this);

    let nextButton = this.add
      .image(0, 0, "nextButton")
      .setInteractive()
      .setOrigin(0, 0)
      .setScale(0.1);
    nextButton.on("pointerdown", () => this.scene.start("NextScene"));
  }

  createBox(x, y, boxImageKey, displayImageKey, factSceneKey) {
    let box = this.add.image(x, y, boxImageKey).setScale(0.2).setInteractive();
    box.on("pointerdown", () => {
      if (this[displayImageKey]) {
        this[displayImageKey].destroy();
        this[displayImageKey] = null;

        if (this.factButtons[displayImageKey]) {
          this.factButtons[displayImageKey].destroy();
          this.factButtons[displayImageKey] = null;
        }
      } else {
        this[displayImageKey] = this.add
          .image(400, 300, displayImageKey)
          .setScale(0.8)
          .setInteractive();
        this.input.setDraggable(this[displayImageKey]);

        if (!this.factButtons[displayImageKey]) {
          this.factButtons[displayImageKey] = this.add
            .text(400, 480, "See Facts!", {
              color: "#84eab3",
              fontFamily: "Arial",
              fontSize: "20px",
              backgroundColor: "rgba(0,0,0,0.6)",
              padding: { left: 20, right: 20, top: 10, bottom: 10 },
            })
            .setInteractive()
            .setOrigin(0.5, 0);

          this.factButtons[displayImageKey].on("pointerdown", () => {
            this.scene.start(factSceneKey);
          });
        }
      }
    });
    this.boxes.push(box);
  }

  createVolumeSlider() {
    if (!this.volumeSlider) {
      this.volumeSlider = document.createElement("input");
      this.volumeSlider.id = "volumeSlider";
      this.volumeSlider.type = "range";
      this.volumeSlider.min = 0;
      this.volumeSlider.max = 1;
      this.volumeSlider.step = 0.01;
      this.volumeSlider.value = this.scene.manager.scenes[0].music.volume;
      document.getElementById("renderDiv").appendChild(this.volumeSlider);
    }
  }
}

class ChatScene extends Phaser.Scene {
  constructor() {
    super("ChatScene");
  }

  preload() {
    this.load.image(
      "nextButton",
      "https://play.rosebud.ai/assets/Custom-Icon-Design-Flat-Cute-Arrows-Button-Arrow-Right-1.512.png?i992"
    );
  }

  create() {
    this.add
      .text(400, 100, "Chat with Bob Marley about his Refugee Journey", {
        fontSize: "32px",
        color: "#ffffff",
        fontFamily: "Arial",
        backgroundColor: "rgba(0,0,0,0.6)",
        padding: { x: 20, y: 10 },
      })
      .setOrigin(0.5, 0);

    this.add
      .text(400, 300, "This is the Chat Scene", {
        fontSize: "32px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    const nextSceneButton = this.add
      .text(400, 500, "Next Scene", {
        fontSize: "24px",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        padding: { x: 10, y: 5 },
        color: "#ffffff",
      })
      .setInteractive()
      .setOrigin(0.5);

    nextSceneButton.on("pointerdown", () => {
      this.scene.start("NextScene");
    });

    let nextButton = this.add
      .image(0, 0, "nextButton")
      .setInteractive()
      .setOrigin(0, 0)
      .setScale(0.1);
    nextButton.on("pointerdown", () => this.scene.start("NextScene"));
  }
}
// FactScene class
class FactScene extends Phaser.Scene {
  constructor(key, imageUrl, seeButton) {
    super(key);
    this.imageUrl = imageUrl;
    this.seeButton = seeButton;
  }

  preload() {
    this.load.image("factImage", this.imageUrl);
  }

  create() {
    this.add.image(400, 300, "factImage").setOrigin(0.5);

    const backButton = this.add
      .text(20, 20, "Back", {
        fontSize: "24px",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        padding: { x: 10, y: 5 },
        color: "#ffffff",
      })
      .setInteractive();

    backButton.on("pointerdown", () => {
      this.scene.start("MainScene");
    });

    // Assign "See Facts" button functionality
    this.seeButton.on("pointerdown", () => {
      this.scene.start(this.scene.key);
    });
  }
}

// MainScene class
class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  create() {
    // Create buttons for each fact scene
    const factScenes = [
      new FactScene(
        "factScene1",
        "https://play.rosebud.ai/assets/Redemption song.png?cuLp"
      ),
      new FactScene(
        "factScene2",
        "https://play.rosebud.ai/assets/Buffalo Soldiers.png?RwgV"
      ),
      new FactScene(
        "factScene3",
        "https://play.rosebud.ai/assets/Jamming.png?xXY0"
      ),
      new FactScene(
        "factScene4",
        "https://play.rosebud.ai/assets/No women No cry.png?JNfy"
      ),
      new FactScene(
        "factScene5",
        "https://play.rosebud.ai/assets/One love.png?998z"
      ),
    ];

    let y = 100;

    factScenes.forEach((factScene) => {
      // Create a "See Facts" button for each fact scene
      const seeButton = this.add
        .text(400, y, "See Facts", {
          fontSize: "24px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: { x: 10, y: 5 },
          color: "#ffffff",
        })
        .setOrigin(0.5)
        .setInteractive();

      // Assign the fact scene to the see button
      seeButton.factScene = factScene;

      // When the "See Facts" button is clicked, switch to the associated fact scene
      seeButton.on("pointerdown", () => {
        this.scene.start(factScene.key);
      });

      y += 100;
    });
  }
}

class NextScene extends Phaser.Scene {
  constructor() {
    super("NextScene");
  }

  preload() {
    this.load.image(
      "bobMarley2",
      "https://play.rosebud.ai/assets/_98bc516d-453a-45d7-b0ef-67c009917976-Photoroom.jpg?4pNE"
    );
    this.load.image(
      "websiteButton",
      "https://play.rosebud.ai/assets/button-304216_1280.png?0V77"
    );
  }

  create() {
    // Add the background image
    this.add.image(380, 400, "bobMarley2");

    // Add the website button
    let websiteButton = this.add
      .text(400, 580, "Visit arts4refugees.substack.com to discover more!", {
        color: "#83f28f", // Light blue color,
        fontFamily: "Arial",
        fontSize: "30px",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        padding: { left: 20, right: 20, top: 10, bottom: 10 },
      })
      .setOrigin(0.5, 1)
      .setInteractive();

    websiteButton.on("pointerdown", () => {
      window.open("https://arts4refugees.substack.com/", "_blank");
    });

    // Add the "Thank you for playing!" button
    let thankYouButton = this.add
      .text(400, 530, "Thank you for playing!", {
        color: "#ffffff",
        fontFamily: "Arial",
        fontSize: "24px",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5, 1)
      .setInteractive();

    thankYouButton.on("pointerdown", () => {
      // Handle the event when the "Thank you for playing!" button is clicked
    });
  }
}

// var config = {
//   type: Phaser.AUTO,
//   parent: "renderDiv",
//   scale: {
//     mode: Phaser.Scale.FIT,
//     autoCenter: Phaser.Scale.CENTER_BOTH,
//     width: 800,
//     height: 600,
//   },
//   physics: {
//     default: "arcade",
//     arcade: {
//       gravity: { y: 200 },
//     },
//   },
//   scene: [StartScene, MainScene, FactScene, NextScene],
// };

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
    InstructionScene,
    MainScene,
    ...factScenes,
    ChatScene,
    NextScene,
  ],
};

var game = new Phaser.Game(config);
