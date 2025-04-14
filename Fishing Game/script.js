//variables//
const choice1 = document.querySelector("#choice1");
const choice2 = document.querySelector("#choice2");
const inventoryIcon = document.querySelector("#inventoryIcon");
const inventoryWindow = document.querySelector("#inventoryWindow");
const inventoryClose = document.querySelector("#inventoryClose");
const entireWindow = document.querySelector("#entireWindow");
const fishermanIdle = document.querySelector("#fishermanIdle");
const fishermanFishing = document.querySelector("#fishermanFishing");
const fishermanHook = document.querySelector("#fishermanHook");
const messages = document.querySelector("#messages");
const messageBox = document.querySelector("#message-box");
const fishName = document.querySelector("#fishName");
const fishesInventory = document.querySelector("#fishesInventory");
const fishes = document.querySelector(".fishes");
const fishDisplay = document.querySelector("#fishDisplay");
const startWindow = document.querySelector("#playWindow");
const startGame = document.querySelector("#playWindow button");
const oceanBG = document.querySelector("#bg");
const hut = document.querySelector("#hut");
const allButtons = document.querySelectorAll(".allButtons");
const storeIcon = document.querySelector("#storeIcon");
const homeIcon = document.querySelector("#homeIcon");
const settingsIcon = document.querySelector("#settingsIcon");
const musicToggle = document.querySelector("#musicToggle");
const soundToggle = document.querySelector("#soundToggle");
const moneyIcon = document.querySelector("#money");
const moneyAmount = document.querySelector("#moneyAmount");
let playerMoney;
const baitIcon = document.querySelector("#bait");
const baitAmount = document.querySelector("#baitAmount");
const trophy1 = document.querySelector("#trophy1");
const trophy2 = document.querySelector("#trophy2");
const trophy3 = document.querySelector("#trophy3");
const trophyMessage = document.querySelector("#trophyMessage");
const noMoreBait = document.querySelector("#noMoreBait");
const plus1 = document.querySelector("#plus1");
const plusMoney = document.querySelector("#plusMoney");

//sound variables//
let bg1 = new Audio("sounds/bg music/bg-fishing-1.mp3");
let bg2 = new Audio("sounds/bg music/bg-fishing-2.mp3");
let bg3 = new Audio("sounds/bg music/bg-fishing-3.mp3");
const beachPlaylist = [bg1, bg2, bg3];
let birdsWaves = new Audio("sounds/bg music/birds & waves.mp3");
let bgStore = new Audio("sounds/bg music/bg-store.mp3");
let castSound = new Audio("sounds/sound fx/cast.mp3");
let hookSound = new Audio("sounds/sound fx/hook.mp3");
let hoverSound = new Audio("sounds/sound fx/hover.wav");
let clickSound = new Audio("sounds/sound fx/click.mp3");
let invCloseSound = new Audio("sounds/sound fx/inventory-close.mp3");
let invOpenSound = new Audio("sounds/sound fx/inventory-open.mp3");
let trophySound = new Audio("sounds/sound fx/new-fish-sound.wav");
let purchaseSound = new Audio("sounds/sound fx/purchase.mp3");

//fish variables//
const fishImages = [
  {
    image: "images/fish/anchovy.png",
    id: "anchovy",
    name: "ANCHOVY",
    chance: 0.08,
    count: 0,
    worth: 4,
  },
  {
    image: "images/fish/angelfish.png",
    id: "angelfish",
    name: "ANGELFISH",
    chance: 0.04,
    count: 0,
    worth: 10,
  },
  {
    image: "images/fish/bass.png",
    id: "bass",
    name: "BASS",
    chance: 0.16,
    count: 0,
    worth: 2,
  },
  {
    image: "images/fish/catfish.png",
    id: "catfish",
    name: "CATFISH",
    chance: 0.16,
    count: 0,
    worth: 2,
  },
  {
    image: "images/fish/clownfish.png",
    id: "clownfish",
    name: "CLOWNFISH",
    chance: 0.02,
    count: 0,
    worth: 20,
  },
  {
    image: "images/fish/crab.png",
    id: "crab",
    name: "CRAB",
    chance: 0.06,
    count: 0,
    worth: 4,
  },
  {
    image: "images/fish/goldfish.png",
    id: "goldfish",
    name: "GOLDFISH",
    chance: 0.05,
    count: 0,
    worth: 18,
  },
  {
    image: "images/fish/pufferfish.png",
    id: "pufferfish",
    name: "PUFFERFISH",
    chance: 0.06,
    count: 0,
    worth: 10,
  },
  {
    image: "images/fish/rusty_can.png",
    id: "rustyCan",
    name: "RUSTY CAN",
    chance: 0.14,
    count: 0,
    worth: 1,
  },
  {
    image: "images/fish/surgeonfish.png",
    id: "surgeonfish",
    name: "SURGEONFISH",
    chance: 0.02,
    count: 0,
    worth: 20,
  },
  {
    image: "images/fish/trout.png",
    id: "trout",
    name: "TROUT",
    chance: 0.16,
    count: 0,
    worth: 2,
  },
  {
    image: "images/fish/worm.png",
    id: "worm",
    name: "WORM",
    chance: 0.045,
    count: 0,
    worth: 6,
  },
  {
    image: "images/fish/secret-fish.gif",
    id: "secretFish",
    name: "BLUE WHALE",
    chance: 0.005,
    count: 0,
    worth: 0,
    isSecret: true,
  },
];

const fishCountDisplay = document.querySelector("#fishCounts");
const fishCountElements = document.querySelectorAll("#fishCounts p");
const secretFishElement = document.querySelector("#secretFish");
const secretCaught = localStorage.getItem("secretFishCaught") === "true";

//beginning of game//
document.addEventListener("DOMContentLoaded", () => {
  //purchases//
  let storePurchases = JSON.parse(localStorage.getItem("storePurchases")) || {
    bench: false,
    bonsai: false,
    cat: false,
    sakuraTree: false,
    houseLight: false,
  };

  //trophy checker//
  let trophy1Awarded = false;
  let trophy2Awarded = false;
  let trophy3Awarded = false;

  let benchDisplayTRUE = false;
  let bonsaiDisplayTRUE = false;
  let catDisplayTRUE = false;
  let sakuraTreeDisplayTRUE = false;
  let hlDisplayTRUE = false;

  function checkTrophy1Unlock() {
    const allCaught = Object.values(fishImages).every(
      (fish) => fish.count >= 1
    );

    if (allCaught) {
      trophy1.style.visibility = "visible";
      trophy1Awarded = true;
      return trophy1Awarded;
    } else {
      trophy1.style.visibility = "hidden";
    }
  }

  function checkTrophy2Unlock() {
    if (
      benchDisplayTRUE === true &&
      bonsaiDisplayTRUE === true &&
      catDisplayTRUE === true &&
      sakuraTreeDisplayTRUE === true &&
      hlDisplayTRUE === true
    ) {
      trophy2.style.visibility = "visible";
      trophy2Awarded = true;
      return trophy2Awarded;
    } else {
      trophy2.style.visibility = "hidden";
    }
  }

  function checkTrophy3Unlock() {
    if (secretFish.count === 1) {
      trophy3.style.visibility = "visible";
      secretFishIcon.style.visibility = "visible";
      secretCaught = true;
      trophy3Awarded = true;
      return trophy3Awarded;
    } else {
      trophy3.style.visibility = "hidden";
      secretFishIcon.style.visibility = "hidden";
    }
  }

  //starting window//
  startGame.addEventListener("click", () => {
    clickSound.play();
    startWindow.style.visibility = "hidden";
    oceanBG.style.filter = "none";
    hut.style.visibility = "visible";
    fishermanIdle.style.visibility = "visible";
    messageBox.style.visibility = "visible";
    inventoryIcon.style.visibility = "visible";
    storeIcon.style.visibility = "visible";
    settingsIcon.style.visibility = "visible";
    moneyIcon.style.visibility = "visible";
    baitIcon.style.visibility = "visible";
    bg1.play();
    birdsWaves.play();
    birdsWaves.loop = true;
    checkTrophy1Unlock(trophy1);
    checkTrophy2Unlock(trophy2);
    checkTrophy3Unlock(trophy3, secretFishIcon);

    //loading purchased items//
    if (storePurchases.bench) {
      benchStoreItem.style.display = "none";
      benchDisplayTRUE = true;
    }
    if (storePurchases.bonsai) {
      bonsaiStoreItem.style.display = "none";
      bonsaiDisplayTRUE = true;
    }
    if (storePurchases.cat) {
      catStoreItem.style.display = "none";
      catDisplayTRUE = true;
    }
    if (storePurchases.sakuraTree) {
      sakuraTreeStoreItem.style.display = "none";
      sakuraTreeDisplayTRUE = true;
    }
    if (storePurchases.houseLight) {
      houseLightStoreItem.style.display = "none";
      hlDisplayTRUE = true;
    }

    if (trophy1Awarded === true) {
      trophy1.style.visibility = "visible";
    }
    if (trophy2Awarded === true) {
      trophy2.style.visibility = "visible";
    }
    if (trophy3Awarded === true) {
      trophy3.style.visibility = "visible";
      secretFishIcon.style.visibility = "visible";
    }
    if (storePurchases.bench) {
      benchStoreItem.style.display = "none";
      benchDisplayTRUE = true;
    }
    if (storePurchases.bonsai) {
      bonsaiStoreItem.style.display = "none";
      bonsaiDisplayTRUE = true;
    }
    if (storePurchases.cat) {
      catStoreItem.style.display = "none";
      catDisplayTRUE = true;
    }
    if (storePurchases.sakuraTree) {
      sakuraTreeStoreItem.style.display = "none";
      sakuraTreeDisplayTRUE = true;
    }
    if (storePurchases.houseLight) {
      houseLightStoreItem.style.display = "none";
      houseLightDisplayTRUE = true;
    }

    if (benchDisplayTRUE) benchDisplay.style.visibility = "visible";
    if (bonsaiDisplayTRUE) bonsaiDisplay.style.visibility = "visible";
    if (catDisplayTRUE) catDisplay.style.visibility = "visible";
    if (sakuraTreeDisplayTRUE) sakuraTreeDisplay.style.visibility = "visible";
    if (hlDisplayTRUE) {
      houseLight1Display.style.visibility = "visible";
      houseLight2Display.style.visibility = "visible";
    }

    bg1.addEventListener("ended", function () {
      bg2.play();
    });

    bg2.addEventListener("ended", function () {
      bg3.play();
    });

    bg3.addEventListener("ended", function () {
      bg1.play();
    });
  });

  //bait//
  if (localStorage.getItem("playerBait") === null) {
    localStorage.setItem("playerBait", 10);
  }
  let playerBait = parseInt(localStorage.getItem("playerBait"));
  baitAmount.innerText = playerBait;

  function updateBait(amount) {
    playerBait += amount;
    if (playerBait < 0) playerBait = 0;

    baitAmount.innerText = playerBait;
    localStorage.setItem("playerBait", playerBait);
  }

  //money//
  if (localStorage.getItem("playerMoney") === null) {
    localStorage.setItem("playerMoney", 0);
  }
  playerMoney = parseInt(localStorage.getItem("playerMoney"));
  moneyAmount.innerText = playerMoney;

  function updateMoney(amount) {
    playerMoney += amount;
    if (playerMoney < 0) playerMoney = 0;

    moneyAmount.innerText = playerMoney;
    localStorage.setItem("playerMoney", playerMoney);
  }

  //save game data//
  function saveGame() {
    const saveData = fishImages.map((fish) => ({
      id: fish.id,
      count: fish.count,
    }));

    localStorage.setItem("fishGameSave", JSON.stringify(saveData));
    localStorage.setItem("playerBait", playerBait);
    localStorage.setItem("playerMoney", playerMoney);
    localStorage.setItem("trophy1Awarded", trophy1Awarded);
    localStorage.setItem("trophy2Awarded", trophy2Awarded);
    localStorage.setItem("trophy3Awarded", trophy3Awarded);
    localStorage.setItem(
      "secretFishCaught",
      fishImages.find((f) => f.id === "secretFish").count > 0
    );
  }
  setInterval(saveGame, 5000);

  function loadGame() {
    const savedData = localStorage.getItem("fishGameSave");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      parsed.forEach((savedFish) => {
        const fish = fishImages.find((f) => f.id === savedFish.id);
        if (fish) fish.count = savedFish.count;
      });
      updateInventory();
    }

    if (secretCaught) {
      const secretFish = fishImages.find((f) => f.id === "secretFish");
      if (secretFish) {
        secretFish.count = 1;
        secretFish.chance = 0;
      }
    }
    if (localStorage.getItem("trophy1Awarded") === "true") {
      trophy1Awarded = true;
    }
    if (localStorage.getItem("trophy2Awarded") === "true") {
      trophy2Awarded = true;
    }
    if (localStorage.getItem("trophy3Awarded") === "true") {
      trophy3Awarded = true;
    }
  }
  loadGame();

  //sound & music functionalities//
  allButtons.forEach((allButtons) => {
    allButtons.addEventListener("mouseover", () => {
      hoverSound.play();
    });
  });

  //update inventory//
  function updateInventory() {
    fishImages.forEach((fish) => {
      fishImages.forEach((fish) => {
        const elementID = `#${fish.id}Count`;
        const countElement = document.querySelector(elementID);
        if (countElement) {
          countElement.textContent = fish.count;
        }
      });
      const inventoryFish = document.querySelector(`#${fish.id}-I`);
      if (inventoryFish) {
        inventoryFish.style.filter =
          fish.count > 0 ? "brightness(100%)" : "brightness(0%)";
      }
    });
  }

  //catch fish functionalities//
  function hideAllFish() {
    const fishElements = document.querySelectorAll(".fishes img");
    fishElements.forEach((img) => {
      img.style.visibility = "hidden";
    });
  }

  //test trophies//
  // fishImages.forEach((fish) => {
  //   if (fish.id === "secretFish") {
  //     fish.chance = 1;
  //   } else {
  //     fish.chance = 0;
  //   }
  // });

  // updateMoney(+10000);

  function catchFish() {
    hideAllFish();
    const totalChance = fishImages.reduce((acc, fish) => acc + fish.chance, 0);
    const randomNumber = Math.random();
    let accumulatedChance = 0;

    for (let fish of fishImages) {
      accumulatedChance += fish.chance;
      if (randomNumber <= accumulatedChance) {
        const caughtFishElement = document.getElementById(fish.id);

        if (fish.id === "secretFish") {
          if (fish.count > 0) {
            return catchFish();
          }

          fish.count = 1;
          fish.chance = 0;
          caughtFishElement.style.visibility = "visible";
          caughtFishElement.classList.add("secret-glow");

          localStorage.setItem("secretFishCaught", true);
          trophySound.play();
          trophy3.style.visibility = "visible";
          secretFishIcon.style.visibility = "visible";
          trophy3Awarded = true;
          secretFishElement.style.zIndex = "1000";

          messages.innerHTML = `YOU CAUGHT THE <span style="color: gold;">SECRET FISH</span>! THE GIANT OF THE OCEAN!`;

          updateInventory();
          saveGame();
          return fish.image;
        }

        fish.count += 1;
        caughtFishElement.style.visibility = "visible";

        const fishName = caughtFishElement.getAttribute("name");
        messages.innerHTML = `YOU CAUGHT "<span style="color: #f3bf67;">${fishName}</span>"! NICE CATCH!`;

        updateInventory();
        saveGame();
        return fish.image;
      }
    }
  }

  //functionality of fisherman//
  choice1.addEventListener("click", () => {
    if (playerBait <= 0) {
      playerBait === 0;
      noMoreBait.style.visibility = "visible";
      choice1.style.color = "#cc0000";
      choice1.innerText = "NEED MORE BAIT!";

      setTimeout(() => {
        noMoreBait.style.visibility = "hidden";
        choice1.style.color = "whitesmoke";
        choice1.innerText = "CAST FISHING ROD";

        setTimeout(() => {
          if (playerMoney <= 0) {
            updateBait(+1);
          }
        }, 5000);
      }, 1500);
    } else {
      castSound.play();
      updateBait(-1);
      updateMoney(+1);
      choice1.style.display = "none";
      choice2.style.display = "none";
      messages.innerText = "PATIENCE IS KEY...";
      messages.style.visibility = "visible";
      inventoryIcon.style.visibility = "hidden";
      storeIcon.style.visibility = "hidden";
      settingsIcon.style.visibility = "hidden";
      musicToggle.style.visibility = "hidden";
      soundToggle.style.visibility = "hidden";
      musicToggle.style.transition = "0s";
      soundToggle.style.transition = "0s";

      fishermanIdle.style.visibility = "hidden";
      fishermanFishing.style.visibility = "visible";

      setTimeout(() => {
        fishermanHook.src = "";
        fishermanHook.src = "images/fisherman/hook.gif";

        hookSound.play();
        catchFish();
        fishermanFishing.style.visibility = "hidden";
        fishermanHook.style.visibility = "visible";
        fishDisplay.style.visibility = "visible";
        fishes.style.visibility = "visible";

        setTimeout(() => {
          fishermanHook.style.visibility = "hidden";
          fishermanIdle.style.visibility = "visible";

          choice1.style.display = "inline-block";
          choice2.style.display = "inline-block";
          messages.style.visibility = "hidden";
          fishDisplay.style.visibility = "hidden";
          fishes.style.visibility = "hidden";
          inventoryIcon.style.visibility = "visible";
          storeIcon.style.visibility = "visible";
          settingsIcon.style.visibility = "visible";
          musicToggle.style.visibility = "visible";
          soundToggle.style.visibility = "visible";
          musicToggle.style.transition = "0.3s";
          soundToggle.style.transition = "0.3s";
          if (trophy3Awarded === true) {
            secretFishElement.style.visibility = "hidden";
          }

          hideAllFish();
        }, 3000);
      }, 5000);
    }
  });

  //opening inventory//
  choice2.addEventListener("click", () => {
    invOpenSound.play();
    entireWindow.style.visibility = "visible";
    fishName.style.visibility = "visible";
    fishesInventory.style.visibility = "visible";
    inventoryIcon.style.visibility = "hidden";
    storeIcon.style.visibility = "hidden";
    settingsIcon.style.visibility = "hidden";
    fishCountDisplay.style.visibility = "visible";
    musicToggle.style.visibility = "hidden";
    soundToggle.style.visibility = "hidden";
    musicToggle.style.transition = "0s";
    soundToggle.style.transition = "0s";

    choice1.style.display = "none";
    choice2.style.display = "none";
  });

  inventoryClose.addEventListener("click", () => {
    invCloseSound.play();
    entireWindow.style.visibility = "hidden";
    fishName.style.visibility = "hidden";
    fishesInventory.style.visibility = "hidden";
    inventoryIcon.style.visibility = "visible";
    storeIcon.style.visibility = "visible";
    settingsIcon.style.visibility = "visible";
    fishCountDisplay.style.visibility = "hidden";
    musicToggle.style.visibility = "visible";
    soundToggle.style.visibility = "visible";
    musicToggle.style.transition = "0.3s";
    soundToggle.style.transition = "0.3s";

    choice1.style.display = "inline-block";
    choice2.style.display = "inline-block";
  });

  inventoryIcon.addEventListener("click", () => {
    invOpenSound.play();
    entireWindow.style.visibility = "visible";
    fishName.style.visibility = "visible";
    fishesInventory.style.visibility = "visible";
    inventoryIcon.style.visibility = "hidden";
    storeIcon.style.visibility = "hidden";
    settingsIcon.style.visibility = "hidden";
    fishCountDisplay.style.visibility = "visible";
    musicToggle.style.visibility = "hidden";
    soundToggle.style.visibility = "hidden";
    musicToggle.style.transition = "0s";
    soundToggle.style.transition = "0s";

    choice1.style.display = "none";
    choice2.style.display = "none";
  });

  //store functionalities//
  const catStoreItem = document.querySelector("#catStoreItem");
  const catStoreItemText = document.querySelector("#catStoreItem p");
  const bonsaiStoreItem = document.querySelector("#bonsaiStoreItem");
  const bonsaiStoreItemText = document.querySelector("#bonsaiStoreItem p");
  const baitStoreItem = document.querySelector("#baitStoreItem");
  const baitStoreItemText = document.querySelector("#baitStoreItem p");
  const houseLightStoreItem = document.querySelector("#houseLightStoreItem");
  const houseLightStoreItemText = document.querySelector(
    "#houseLightStoreItem p"
  );
  const benchStoreItem = document.querySelector("#benchStoreItem");
  const benchStoreItemText = document.querySelector("#benchStoreItem p");
  const sakuraTreeStoreItem = document.querySelector("#sakuraTreeStoreItem");
  const sakuraTreeStoreItemText = document.querySelector(
    "#sakuraTreeStoreItem p"
  );

  const benchDisplay = document.querySelector("#benchDisplay");
  const bonsaiDisplay = document.querySelector("#bonsaiDisplay");
  const catDisplay = document.querySelector("#catDisplay");
  const sakuraTreeDisplay = document.querySelector("#sakuraTreeDisplay");
  const houseLight1Display = document.querySelector("#houseLight1Display");
  const houseLight2Display = document.querySelector("#houseLight2Display");

  const openStoreWindow = document.querySelector("#openStoreWindow");
  const openStoreWindowText = document.querySelector("#openStoreWindow p");
  const closeStoreWindow = document.querySelector("#closeStoreWindow");
  const storeWindow = document.querySelector("#storeWindow");
  const sellAllFish = document.querySelector("#sellAllFish");

  storeIcon.addEventListener("click", () => {
    benchDisplay.style.visibility = "hidden";
    bonsaiDisplay.style.visibility = "hidden";
    catDisplay.style.visibility = "hidden";
    sakuraTreeDisplay.style.visibility = "hidden";
    houseLight1Display.style.visibility = "hidden";
    houseLight2Display.style.visibility = "hidden";

    clickSound.play();
    hut.style.visibility = "hidden";
    fishermanIdle.style.visibility = "hidden";
    inventoryIcon.style.visibility = "hidden";
    storeIcon.style.visibility = "hidden";
    messageBox.style.visibility = "hidden";
    homeIcon.style.visibility = "visible";
    settingsIcon.style.visibility = "hidden";
    trophy1.style.visibility = "hidden";
    trophy2.style.visibility = "hidden";
    trophy3.style.visibility = "hidden";
    secretFishIcon.style.visibility = "hidden";
    openStoreWindow.style.visibility = "visible";
    musicToggle.style.visibility = "hidden";
    soundToggle.style.visibility = "hidden";
    musicToggle.style.transition = "0s";
    soundToggle.style.transition = "0s";
    oceanBG.src = "images/misc/store-bg.jpeg";
    benchDisplay.style.visibility = "hidden";
    bonsaiDisplay.style.visibility = "hidden";
    catDisplay.style.visibility = "hidden";
    sakuraTreeDisplay.style.visibility = "hidden";
    houseLight1Display.style.visibility = "hidden";
    houseLight2Display.style.visibility = "hidden";

    bg1.pause();
    bg2.pause();
    bg3.pause();
    birdsWaves.pause();
    bgStore.play();
  });

  bgStore.addEventListener("ended", function () {
    bgStore.play();
  });

  homeIcon.addEventListener("click", () => {
    if (benchDisplayTRUE) benchDisplay.style.visibility = "visible";
    if (bonsaiDisplayTRUE) bonsaiDisplay.style.visibility = "visible";
    if (catDisplayTRUE) catDisplay.style.visibility = "visible";
    if (sakuraTreeDisplayTRUE) sakuraTreeDisplay.style.visibility = "visible";
    if (hlDisplayTRUE) {
      houseLight1Display.style.visibility = "visible";
      houseLight2Display.style.visibility = "visible";
    }
    if (trophy3Awarded === true) {
      trophy3.style.visibility = "visible";
      secretFishIcon.style.visibility = "visible";
    }
    console.log("HOME clicked — trophy3Awarded is", trophy3Awarded);

    clickSound.play();
    hut.style.visibility = "visible";
    fishermanIdle.style.visibility = "visible";
    inventoryIcon.style.visibility = "visible";
    storeIcon.style.visibility = "visible";
    messageBox.style.visibility = "visible";
    homeIcon.style.visibility = "hidden";
    settingsIcon.style.visibility = "visible";
    openStoreWindow.style.visibility = "hidden";
    musicToggle.style.visibility = "visible";
    soundToggle.style.visibility = "visible";
    musicToggle.style.transition = "0.3s";
    soundToggle.style.transition = "0.3s";
    oceanBG.src = "images/misc/bg.gif";

    bgStore.pause();
    bg1.play();
    birdsWaves.play();

    checkTrophy1Unlock();
    checkTrophy2Unlock();
  });

  function showItemDetails(item, text) {
    item.addEventListener("mouseover", () => {
      text.style.visibility = "visible";
    });
    item.addEventListener("mouseout", () => {
      text.style.visibility = "hidden";
    });
  }

  showItemDetails(catStoreItem, catStoreItemText);
  showItemDetails(bonsaiStoreItem, bonsaiStoreItemText);
  showItemDetails(baitStoreItem, baitStoreItemText);
  showItemDetails(houseLightStoreItem, houseLightStoreItemText);
  showItemDetails(benchStoreItem, benchStoreItemText);
  showItemDetails(sakuraTreeStoreItem, sakuraTreeStoreItemText);
  showItemDetails(openStoreWindow, openStoreWindowText);

  openStoreWindow.addEventListener("click", () => {
    storeWindow.style.visibility = "visible";
    homeIcon.style.visibility = "hidden";
    oceanBG.style.filter = "brightness(30%)";
  });

  closeStoreWindow.addEventListener("click", () => {
    storeWindow.style.visibility = "hidden";
    homeIcon.style.visibility = "visible";
    oceanBG.style.filter = "brightness(100%)";
  });

  baitStoreItem.addEventListener("click", () => {
    if (playerMoney >= 1) {
      updateBait(+1);
      updateMoney(-1);
      plus1.style.display = "block";
      plus1.innerText = "+1";
      purchaseSound.play();

      setTimeout(() => {
        plus1.style.display = "none";
        plus1.innerText = " ";
      }, 2400);
    }
  });

  sellAllFish.addEventListener("click", () => {
    let total = 0;

    for (let fish of fishImages) {
      total += fish.count * fish.worth;
      fish.count = 0;
      updateInventory();
    }
    purchaseSound.play();
    updateMoney(total);

    plusMoney.style.display = "block";
    plusMoney.innerText = `+${total}`;

    setTimeout(() => {
      plusMoney.style.display = "none";
      plusMoney.innerText = " ";
    }, 2400);
  });

  benchStoreItem.addEventListener("click", () => {
    if (playerMoney >= 200) {
      updateMoney(-200);
      benchStoreItem.style.display = "none";
      benchDisplayTRUE = true;
      storePurchases.bench = true;
      localStorage.setItem("storePurchases", JSON.stringify(storePurchases));
      purchaseSound.play();
    }
  });

  bonsaiStoreItem.addEventListener("click", () => {
    if (playerMoney >= 800) {
      updateMoney(-800);
      bonsaiStoreItem.style.display = "none";
      bonsaiDisplayTRUE = true;
      storePurchases.bonsai = true;
      localStorage.setItem("storePurchases", JSON.stringify(storePurchases));
      purchaseSound.play();
    }
  });

  catStoreItem.addEventListener("click", () => {
    if (playerMoney >= 1000) {
      updateMoney(-1000);
      catStoreItem.style.display = "none";
      catDisplayTRUE = true;
      storePurchases.cat = true;
      localStorage.setItem("storePurchases", JSON.stringify(storePurchases));
      purchaseSound.play();
    }
  });

  sakuraTreeStoreItem.addEventListener("click", () => {
    if (playerMoney >= 1500) {
      updateMoney(-1500);
      sakuraTreeStoreItem.style.display = "none";
      sakuraTreeDisplayTRUE = true;
      storePurchases.sakuraTree = true;
      localStorage.setItem("storePurchases", JSON.stringify(storePurchases));
      purchaseSound.play();
    }
  });

  houseLightStoreItem.addEventListener("click", () => {
    if (playerMoney >= 400) {
      updateMoney(-400);
      houseLightStoreItem.style.display = "none";
      hlDisplayTRUE = true;
      storePurchases.houseLight = true;
      localStorage.setItem("storePurchases", JSON.stringify(storePurchases));
      purchaseSound.play();
    }
  });

  //settings//
  settingsIcon.addEventListener("click", () => {
    clickSound.play();
    settingsOpenClose();
  });

  musicToggle.addEventListener("click", () => {
    clickSound.play();
    musicOnOff();
  });

  soundToggle.addEventListener("click", () => {
    clickSound.play();
    soundOnOff();
  });

  function settingsOpenClose() {
    if (
      musicToggle.style.visibility === "hidden" &&
      soundToggle.style.visibility === "hidden"
    ) {
      musicToggle.style.visibility = "visible";
      soundToggle.style.visibility = "visible";
      musicToggle.style.top = "0px";
      soundToggle.style.top = "0px";
      settingsIcon.style.filter = "brightness(50%)";
    } else {
      musicToggle.style.visibility = "hidden";
      soundToggle.style.visibility = "hidden";
      musicToggle.style.top = "-45px";
      soundToggle.style.top = "-83px";
      settingsIcon.style.filter = "brightness(100%)";
    }
  }

  function musicOnOff() {
    if (musicToggle.style.filter != "grayscale(100%)") {
      bg1.volume = 0;
      bg2.volume = 0;
      bg3.volume = 0;
      bgStore.volume = 0;
      musicToggle.style.filter = "grayscale(100%)";
    } else if ((musicToggle.style.filter = "grayscale(100%)")) {
      bg1.volume = 1;
      bg2.volume = 1;
      bg3.volume = 1;
      bgStore.volume = 1;
      musicToggle.style.filter = "grayscale(0%)";
    }
  }

  function soundOnOff() {
    if (soundToggle.style.filter != "grayscale(100%)") {
      birdsWaves.volume = 0;
      castSound.volume = 0;
      hookSound.volume = 0;
      hoverSound.volume = 0;
      clickSound.volume = 0;
      invCloseSound.volume = 0;
      invOpenSound.volume = 0;
      trophySound.volume = 0;
      soundToggle.style.filter = "grayscale(100%)";
    } else if ((soundToggle.style.filter = "grayscale(100%)")) {
      birdsWaves.volume = 1;
      castSound.volume = 1;
      hookSound.volume = 1;
      hoverSound.volume = 1;
      clickSound.volume = 1;
      invCloseSound.volume = 1;
      invOpenSound.volume = 1;
      trophySound.volume = 1;
      soundToggle.style.filter = "grayscale(0%)";
    }
  }

  //trophies interaction//
  trophy1.addEventListener("mouseover", () => {
    trophyMessage.style.visibility = "visible";
    trophyMessage.innerHTML =
      "AWARDED FOR: <br><strong>HAVING EVERY FISH IN YOUR INVENTORY</strong>";
  });

  trophy2.addEventListener("mouseover", () => {
    trophyMessage.style.visibility = "visible";
    trophyMessage.innerHTML =
      "AWARDED FOR: <br><strong>BUYING ALL DECORATIONS FROM THE STORE</strong>";
  });

  trophy3.addEventListener("mouseover", () => {
    trophyMessage.style.visibility = "visible";
    trophyMessage.innerHTML =
      "AWARDED FOR: <br><strong>CATCHING SECRET FISH</strong>";
  });

  trophy1.addEventListener("mouseout", () => {
    trophyMessage.style.visibility = "hidden";
  });

  trophy2.addEventListener("mouseout", () => {
    trophyMessage.style.visibility = "hidden";
  });

  trophy3.addEventListener("mouseout", () => {
    trophyMessage.style.visibility = "hidden";
  });
});
