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
    this.vinylRecord = null;
    this.openBox = null;
    this.middleBox = null;
    this.bottomBox = null;
    this.vinylRecordImage = null;
    this.vinylRecordImageVisible = false;
    this.newImage = null;
    this.newImageVisible = false;
    this.newImage2 = null;
    this.newImage2Visible = false;
    this.newImage3 = null;
    this.newImage3Visible = false;
    this.factButton = null;
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
    this.load.image(
      "vinylRecord",
      "https://play.rosebud.ai/assets/_2e5bff8d-76af-48f3-b505-0558cabb7264-removebg-preview.png?C7GH"
    );
    this.load.image(
      "openBox",
      "https://play.rosebud.ai/assets/cardboard box.png?lQ0D"
    );
    this.load.image(
      "vinylRecordImage",
      "https://play.rosebud.ai/assets/_5a21d28d-4eb5-41f0-bb2d-f24ddfa0a0f8-removebg-preview.png?0n9J"
    );
    this.load.image(
      "newImage",
      "https://play.rosebud.ai/assets/_4e0d1f70-82cf-45fd-a526-9ed827b16827-removebg-preview.png?ouJa"
    );
    this.load.image(
      "newImage2",
      "https://play.rosebud.ai/assets/_48e3534f-1c4c-41a5-9dab-6a65dda86323-removebg-preview (2).png?opob"
    );
    this.load.image(
      "newImage3",
      "https://play.rosebud.ai/assets/_db08530a-3ee6-4990-b93f-91836588707e-removebg-preview.png?3bkk"
    );
  }

  create() {
    this.add.image(400, 300, "bobMarleyRoom");
    let boxImage1 = this.add
      .image(380, 550, "cardboardBox")
      .setScale(0.2)
      .setInteractive();
    let boxImage2 = this.add
      .image(boxImage1.x + boxImage1.displayWidth + 10, 520, "cardboardBox2")
      .setScale(0.2)
      .setInteractive();
    this.openBox = this.add
      .image(250, 550, "openBox")
      .setScale(0.2)
      .setInteractive();
    this.middleBox = this.add
      .image(260, 600, "cardboardBox4")
      .setScale(0.2)
      .setInteractive();
    this.bottomBox = this.add
      .image(130, 600, "cardboardBox3")
      .setScale(0.2)
      .setInteractive();

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
    nextButton.on("pointerdown", () => this.scene.start("ChatScene"));

    boxImage1.on("pointerdown", () => {
      if (this.vinylRecord) {
        this.vinylRecord.destroy();
        this.vinylRecord = null;

        if (this.factButton1) {
          this.factButton1.destroy();
          this.factButton1 = null;
        }
      } else {
        this.vinylRecord = this.add
          .image(400, 300, "vinylRecord")
          .setScale(0.8)
          .setInteractive();
        this.input.setDraggable(this.vinylRecord);

        if (!this.factButton1) {
          this.factButton1 = this.add
            .text(400, 480, "See Facts!", {
              color: "#84eab3",
              fontFamily: "Arial",
              fontSize: "20px",
              backgroundColor: "rgba(0,0,0,0.6)",
              padding: { left: 20, right: 20, top: 10, bottom: 10 },
            })
            .setInteractive()
            .setOrigin(0.5, 0);

          this.factButton1.on("pointerdown", () => {
            this.scene.start("FactScene", {
              imageUrl:
                "https://play.rosebud.ai/assets/_2e5bff8d-76af-48f3-b505-0558cabb7264-removebg-preview.png?C7GH",
              backSceneKey: "MainScene",
            });
          });
        }
      }
    });

    boxImage2.on("pointerdown", () => {
      if (this.vinylRecord) {
        this.vinylRecord.destroy();
        this.vinylRecord = null;

        if (this.factButton2) {
          this.factButton2.destroy();
          this.factButton2 = null;
        }
      } else {
        this.vinylRecord = this.add
          .image(400, 300, "vinylRecordImage")
          .setScale(0.8)
          .setInteractive();
        this.input.setDraggable(this.vinylRecord);

        if (!this.factButton2) {
          this.factButton2 = this.add
            .text(400, 480, "See Facts!", {
              color: "#84eab3",
              fontFamily: "Arial",
              fontSize: "20px",
              backgroundColor: "rgba(0,0,0,0.6)",
              padding: { left: 20, right: 20, top: 10, bottom: 10 },
            })
            .setInteractive()
            .setOrigin(0.5, 0);

          this.factButton2.on("pointerdown", () => {
            this.scene.start("FactScene", {
              imageUrl: "https://play.rosebud.ai/assets/Jamming.png?xXY0",
              backSceneKey: "MainScene",
            });
          });
        }
      }
    });

    this.openBox.on("pointerdown", () => {
      if (!this.newImageVisible) {
        this.newImage = this.add
          .image(400, 300, "newImage")
          .setScale(0.8)
          .setInteractive();
        this.input.setDraggable(this.newImage);

        if (!this.factButton3) {
          this.factButton3 = this.add
            .text(400, 480, "See Facts!", {
              color: "#84eab3",
              fontFamily: "Arial",
              fontSize: "20px",
              backgroundColor: "rgba(0,0,0,0.6)",
              padding: { left: 20, right: 20, top: 10, bottom: 10 },
            })
            .setInteractive()
            .setOrigin(0.5, 0);

          this.factButton3.on("pointerdown", () => {
            this.scene.start("FactScene", {
              imageUrl: "https://play.rosebud.ai/assets/One love.png?998z",
              backSceneKey: "MainScene",
            });
          });
        }

        this.newImageVisible = true;
      } else {
        this.newImage.destroy();
        this.newImageVisible = false;

        if (this.factButton3) {
          this.factButton3.destroy();
          this.factButton3 = null;
        }
      }
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
      this.volumeSlider.value = this.scene.manager.scenes[0].music.volume;
      document.getElementById("renderDiv").appendChild(this.volumeSlider);
    }
  }
}

class FactScene extends Phaser.Scene {
  constructor() {
    super("FactScene");
  }

  preload() {
    this.load.image(
      "redemptionSong",
      "https://play.rosebud.ai/assets/Redemption song.png?cuLp"
    );
  }

  create() {
    this.add.image(400, 300, "redemptionSong").setOrigin(0.5);

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
    this.load.image(
      "nextButton",
      "https://play.rosebud.ai/assets/Custom-Icon-Design-Flat-Cute-Arrows-Button-Arrow-Right-1.512.png?i992"
    );
  }

  create() {
    this.add.image(380, 400, "bobMarley2");

    let websiteButton = this.add
      .text(400, 580, "Visit arts4refugees.substack.com to discover more!", {
        color: "#83f28f",
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

    let nextSceneButton = this.add
      .image(0, 0, "nextButton")
      .setInteractive()
      .setOrigin(0, 0)
      .setScale(0.1);
    nextSceneButton.on("pointerdown", () => this.scene.start("FinalScene"));
  }
}

class FinalScene extends Phaser.Scene {
  constructor() {
    super("FinalScene");
  }

  preload() {
    // Load any assets needed for this scene
  }

  create() {
    // Add any content or functionality for the final scene
    this.add
      .text(400, 300, "This is the final scene!", {
        fontSize: "32px",
        color: "#ffffff",
      })
      .setOrigin(0.5);
  }
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
const CHARACTER_NAME = "Bob Marley";

// Describe your chatbot here. This defines exactly how it will behave.
const CHARACTER_DESCRIPTION = `
You are Bob Marley, a legendary musician who rose from being a refugee to a global icon of reggae music and peace advocacy.

Information about you:

Bob Marley faced many struggles as a refugee but turned his hardships into powerful music that inspires millions. He is approachable and loves sharing stories about his journey, from his early struggles to his rise as a legend.


First Message of Roleplay:

"Welcome. Would you like to hear about my life as a refugee and how I became a legend? Feel free to ask me anything."!!!


NOTE: 
(Ensure your responses are short  only one sentece long !!!.)
`;

// This is the URL of the image for your chatbot'S background image.
const BACKGROUND_IMAGE_URL = `https://play.rosebud.ai/assets/grunge-background-green-orange_1048-194.jpg?glXl`;

// This is the URL of the image for your chatbot.
const CHARACTER_IMAGE_URL = `https://play.rosebud.ai/assets/profile-pic (1).png?7KEs`;

// Put URLs of all songs you want to be shuffled in this games's playlist.
const SONG_PLAYLIST_URLS = [
  `https://play.rosebud.ai/assets/things-gonna-change-vernon-maytone-brotheration-reggae-2020-141310-[AudioTrimmer.com].mp3?JW2N`,
  `https://play.rosebud.ai/assets/things-gonna-change-vernon-maytone-brotheration-reggae-2020-141310-[AudioTrimmer.com].mp3?JW2N`,
  `https://play.rosebud.ai/assets/things-gonna-change-vernon-maytone-brotheration-reggae-2020-141310-[AudioTrimmer.com].mp3?JW2N`,
];

class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  preload() {
    // Preload audio files
    SONG_PLAYLIST_URLS.forEach((url, index) => {
      this.load.audio(`track_${index}`, url);
    });

    // Preload character image
    this.load.image("characterImage", CHARACTER_IMAGE_URL);

    // Preload background image
    this.load.image("backgroundImage", BACKGROUND_IMAGE_URL);
  }

  create() {
    // Check for existing save and initialize the game state
    this.checkForExistingSave();

    // Add the background image
    const background = this.add.image(
      this.scale.width / 2,
      this.scale.height / 2,
      "backgroundImage"
    );
    background.setScale(0.5); // Adjust the scale as needed

    // Create the character image sprite and decrease its size by 20%
    const characterSprite = this.add.sprite(0, 0, "characterImage");
    characterSprite.setScale(0.8); // Decrease the sprite size by 20%
    characterSprite.setPosition(this.scale.width / 2, this.scale.height / 2);

    // Add the text to the top of the screen
    this.add
      .text(400, 50, "Welcome to Bob Marley - From Refugee to Legend", {
        fontSize: "26px",
        color: "#84eab3",
        fontFamily: "Arial",
        backgroundColor: "rgba(0,0,0,0.6)",
      })
      .setOrigin(0.5);

    // Transition to another scene
    this.game.sceneTransitionManager.transitionTo("ChatScene");
  }

  checkForExistingSave() {
    const saveData = localStorage.getItem(PROJECT_NAME);
    if (saveData) {
      console.info("Save detected.");
      this.game.saveData = JSON.parse(saveData);
    } else {
      console.info("No save detected. Initializing new game state.");
      // If no save exists, initialize a new save with default values
      this.game.saveData = {
        chatLog: "",
        characterChatManagerState: null, // Assuming a default empty state is suitable
      };

      // Save the initial state to localStorage
      localStorage.setItem(PROJECT_NAME, JSON.stringify(this.game.saveData));
    }
  }
}

function loadScript(url) {
  return new Promise((resolve, reject) => {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;

    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Script loading failed for " + url));

    document.head.appendChild(script);
  });
}

const VERSION_NUMBER = "v1"; // Set the version number here.
const PROJECT_NAME = `${CHARACTER_NAME} AI Character ${VERSION_NUMBER}`;
async function initializeGame() {
  try {
    // Load the external script before initializing the Phaser game
    await loadScript(`https://play.rosebud.ai/assets/BobMarley.js?PwIm`);
    console.log("Script loaded successfully");

    const config = {
      type: Phaser.AUTO,
      parent: "renderDiv",
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      width: 800,
      height: 600,
      scene: [
        StartScene,
        InstructionScene,
        MainScene,
        FactScene,
        NextScene,
        FinalScene,
        BootScene,
        ChatScene,
      ], // Assuming ChatScene also might depend on the loaded script
      dom: {
        createContainer: true,
      },
    };

    // Assuming 'game' is declared in a broader scope if you need to reference it elsewhere
    window.game = new Phaser.Game(config);
    window.game.sceneTransitionManager = new SceneTransitionManager(game);
  } catch (error) {
    console.error(
      "Failed to load external script or initialize the Phaser game:",
      error
    );
  }
}

initializeGame();
