let ctx = document.getElementById("ctx").getContext("2d");
ctx.imageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.oImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
let canvas = document.getElementById("ctx");
let Blocks = [];
const Mario0 = document.getElementById("Mario0");
const Mario1 = document.getElementById("Mario1");
const blue_coopa0 = document.getElementById("blue_coopa0");
const blue_coopa1 = document.getElementById("blue_coopa1");
const sleep_fish0 = document.getElementById("sleep_fish0");
const sleep_fish1 = document.getElementById("sleep_fish1");
const sleep_fish2 = document.getElementById("sleep_fish2");
const sleep_fish3 = document.getElementById("sleep_fish3");
const block_n4 = document.getElementById("block_n4");
const block_n0 = document.getElementById("block_n0");
const block_n1 = document.getElementById("block_n1");
const block_n2 = document.getElementById("block_n2");
const block_n3 = document.getElementById("block_n3");
const block_n5 = document.getElementById("block_n5");
const lootblock0 = document.getElementById("lootblock0");
const lootblock1 = document.getElementById("lootblock1");
const lootblock2 = document.getElementById("lootblock2");
const lootblock3 = document.getElementById("lootblock3");
const lootblock4 = document.getElementById("lootblock4");
const lootblock5 = document.getElementById("lootblock5");
const lootblock6 = document.getElementById("lootblock6");
const lootblock7 = document.getElementById("lootblock7");
const ncoin0 = document.getElementById("ncoin0");
const ncoin1 = document.getElementById("ncoin1");
const ncoin2 = document.getElementById("ncoin2");
const ncoin3 = document.getElementById("ncoin3");
const rcoin0 = document.getElementById("rcoin0");
const rcoin1 = document.getElementById("rcoin1");
const rcoin2 = document.getElementById("rcoin2");
const rcoin3 = document.getElementById("rcoin3");
const rcoin4 = document.getElementById("rcoin4");
const rcoin5 = document.getElementById("rcoin5");
const rcoin6 = document.getElementById("rcoin6");
const rcoin7 = document.getElementById("rcoin7");
const BigMario0 = document.getElementById("BigMario0");
const BigMario1 = document.getElementById("BigMario1");
const BigMario2 = document.getElementById("BigMario2");
const PSwitch0 = document.getElementById("PSwitch0");
const PSwitch1 = document.getElementById("PSwitch1");
const Bullet = document.getElementById("Bullet");
const blockw00 = document.getElementById("blockw00");
const blockw01 = document.getElementById("blockw01");
const blockw02 = document.getElementById("blockw02");
const blockw03 = document.getElementById("blockw03");
const blockw04 = document.getElementById("blockw04");
const blockw05 = document.getElementById("blockw05");
const blockw06 = document.getElementById("blockw06");
const blockw07 = document.getElementById("blockw07");
const blockw08 = document.getElementById("blockw08");
const blockw09 = document.getElementById("blockw09");
const blockw10 = document.getElementById("blockw10");
const blockw11 = document.getElementById("blockw11");
const BlueShell0 = document.getElementById("BlueShell0");
const BlueShell1 = document.getElementById("BlueShell1");
const BlueShell2 = document.getElementById("BlueShell2");
const BlueShell3 = document.getElementById("BlueShell3");
const Gun0 = document.getElementById("Gun0");
const Gun1 = document.getElementById("Gun1");
const Gun2 = document.getElementById("Gun2");
const noimage = document.getElementById("noimage");
const blockw12 = document.getElementById("blockw12");
const mushroom = document.getElementById("mushroom");
const ToLow = document.getElementById("ToLow");
const PSwitch = document.getElementById("PSwitch");
const LiquidLava0 = document.getElementById("LiquidLava0");
const LWater = document.getElementById("LiquidWater");
const JumpWater = document.getElementById("JumpWater");
const LiquidLava1 = document.getElementById("LiquidLava1");
const LiquidLava2 = document.getElementById("LiquidLava2");
const LiquidLava3 = document.getElementById("LiquidLava3");
const LiquidLava4 = document.getElementById("LiquidLava4");
const LiquidLava5 = document.getElementById("LiquidLava5");
const LiquidLava6 = document.getElementById("LiquidLava6");
const LiquidLava7 = document.getElementById("LiquidLava7");
const LiquidLava8 = document.getElementById("LiquidLava8");
const LiquidLava9 = document.getElementById("LiquidLava9");
const PSwitchTheme = document.getElementById("PSwitchTheme");
const TimeEnd = document.getElementById("TimeEnd");
const PowFirst = document.getElementById("PowFirst");
const PowSecond = document.getElementById("PowSecond");
const Jump = document.getElementById("Jump");
const CoinSound = document.getElementById("Coin");
const Explode = document.getElementById("Explode");
const Underwater = document.getElementById("Underwater");
const Overworld = document.getElementById("Overworld");
const MushroomSound = document.getElementById("Mushroom");
const Pickup = document.getElementById("Pickup");
let Fortress = new Image();
Fortress.src = "http://localhost/Images/Fortress.png";
let Air = new Image();
Air.src = "http://localhost/Images/Air.png";
let Mario;
let Water = false;
Overworld.loop = true;
//Overworld.play();

function DrawFlipped(image, x = 0, y = 0) {
    let canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    let c = canvas.getContext("2d");
    c.drawImage(image, 0, 0);

    let pixels = c.getImageData(0, 0, image.width, image.height).data;


    for(let i = 0; i < pixels.length; i += 4) {
        let x_flipped = image.width - (i / 4) % image.width;
        let y_flipped = ((i / 4) - (i / 4) % image.width) / image.width;

        ctx.fillStyle = `rgb(${pixels[i]}, ${pixels[i + 1]}, ${pixels[i + 2]}, ${pixels[i + 3]})`;
        ctx.fillRect(x_flipped + x, y_flipped + y, 1, 1);
    }
}

function CreateBlock(width = 0, height = 0, x = 0, y = 0, image = [new Image()], frame = 1, physics = true, Callback = function() {}) {
    Blocks[Blocks.length] = {
        width: width,
        height: height,
        x: x,
        y: y,
        frames: 0,
        frame: frame,
        images: image,
        physics: physics,
        CallAction: Callback
    };
}

CreateBlock(16, 16, 0, 192, [blockw12]);
CreateBlock(16, 16, 0, 176, [blockw12]);
CreateBlock(16, 16, 0, 160, [blockw12]);
CreateBlock(16, 16, 0, 144, [blockw12]);
CreateBlock(16, 16, 16, 192, [blockw12]);
CreateBlock(16, 16, 32, 192, [blockw12]);
CreateBlock(16, 16, 160, 176, [blockw12]);
CreateBlock(16, 16, 160, 160, [blockw12]);
CreateBlock(16, 16, 48, 192, [blockw12]);
CreateBlock(16, 16, 64, 192, [blockw12]);
CreateBlock(16, 16, 80, 192, [blockw12]);
CreateBlock(16, 16, 80, 144, [lootblock0, lootblock1, lootblock2, lootblock3, lootblock4, lootblock5, lootblock6, lootblock7], 4, true, function(block, n, str) {
    if(str === "Down") {
        if(Blocks[block].frames !== 0) {
            new Mushroom(Blocks[block].x, Blocks[block].y, 1, 1);
            new Audio(Pickup.src).play();
            Blocks[block].images = [block_n4];
            Blocks[block].frame = 1;
            Blocks[block].frames = 0;
        }
    }
});
CreateBlock(16, 16, 96, 192, [blockw12]);
CreateBlock(16, 16, 112, 192, [blockw12]);
CreateBlock(16, 16, 128, 192, [blockw12]);
CreateBlock(16, 16, 144, 192, [blockw12]);

class GObject {
    constructor(width = 0, height = 0, x = 0, y = 0, pow = 1, speed = 1, hp = 1) {
        this.width = width + 1;
        this.height = height + 1;
        this.pow = pow;
        this.speed = speed;
        this.speedup = 1;
        this.hp = hp;
        this.move = 0;
        this.turn = 0;
        this.sy = 0;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.Jumped = false;
        this.botlvl = 1;
        this.jumpsound = null;
        this.friend = false;
        this.turndmg = true;
        this.Damage = function() {};
    }

    Pow() {
        return this.pow;
    }

    TurnLeft() {
        this.move = 1;
        this.turn = 0;
    }

    TurnRight() {
        this.move = 2;
        this.turn = 1;
    }

    Stop() {
        this.move = 0;
    }

    Jump(speed, play = true) {
        if(!this.Jumped || Water) {
            this.sy = speed;
            this.y--;
            this.Jumped = true;
            if(play) {
                this.jumpsound.play();
            }
        }
    }

    CalcPhysics() {
        if(this.friend === false) {
            if(this.x + this.width >= Mario.x && this.x + this.width < Mario.x + Mario.width) {
                if(this.y + this.height > Mario.y && this.y < Mario.y + Mario.height) {
                    if(Math.floor(Mario.y + Mario.height - (this.y + this.height)) < 2 && Math.floor(Mario.y + Mario.height - (this.y + this.height)) > -2 && this.turndmg) {
                        this.Damage("", "Right");
                    } else {
                        if(Mario.y < this.y + this.height && Mario.y > this.y) {
                            this.Damage("Down", "Right");
                        }
                        if(Mario.y + Mario.height > this.y && Mario.y + Mario.height < this.y + this.height) {
                            this.Damage("Up", "Right");
                        }
                    }
                }
            }
            if(this.x <= Mario.x + Mario.width && this.x >= Mario.x) {
                if(this.y + this.height > Mario.y && this.y < Mario.y + Mario.height) {
                    if(Math.floor(Mario.y + Mario.height - (this.y + this.height)) < 2 && Math.floor(Mario.y + Mario.height - (this.y + this.height)) > -2 && this.turndmg) {
                        this.Damage("", "Right");
                    } else {
                        if(Mario.y < this.y + this.height && Mario.y > this.y) {
                            this.Damage("Down", "Left");
                        }
                        if(Mario.y + Mario.height > this.y && Mario.y + Mario.height < this.y + this.height) {
                            this.Damage("Up", "Left");
                        }
                    }
                }
            }
        }
        switch(this.move) {
            case 1: {
                let sufx = false;
                for(let i = 0; i < Blocks.length; i++) {
                    if(Blocks[i] !== null && Blocks[i].physics) {
                        if(this.x - this.speed * this.speedup <= Blocks[i].x + Blocks[i].width && this.x >= Blocks[i].x) {
                            if(this.y + this.height > Blocks[i].y && this.y < Blocks[i].y + Blocks[i].height) {
                                sufx = true;
                            }
                        }
                    }
                }

                let d = 1;

                if(Water) {
                    d = 2;
                }

                if(!sufx & this.botlvl !== 2) {
                    this.x -= this.speed * this.speedup / d;
                } else if(this.botlvl === 1) {
                    this.TurnRight();
                } else if(!sufx & this.botlvl === 2) {
                    if(this.x < Mario.x) {
                        this.x += this.speed * this.speedup / d;
                    } else {
                        this.x -= this.speed * this.speedup / d;
                    }
                } else if(sufx) {
                    this.x += this.speed * this.speedup / d;
                }
                break;
            };

            case 2: {
                let sufx = false;
                for(let i = 0; i < Blocks.length; i++) {
                    if(Blocks[i] !== null && Blocks[i].physics) {
                        if(this.x + this.width + this.speed * this.speedup >= Blocks[i].x && this.x + this.width + this.speed * this.speedup < Blocks[i].x + Blocks[i].width) {
                            if(this.y + this.height > Blocks[i].y && this.y < Blocks[i].y + Blocks[i].height) {
                                sufx = true;
                            }
                        }
                    }
                }

                let d = 1;

                if(Water) {
                    d = 2;
                }

                if(!sufx & this.botlvl !== 2) {
                    this.x += this.speed * this.speedup / d;
                } else if(this.botlvl === 1) {
                    this.TurnLeft();
                } else if(!sufx & this.botlvl === 2) {
                    if(this.x < Mario.x) {
                        this.x += this.speed * this.speedup / d;
                    } else {
                        this.x -= this.speed * this.speedup / d;
                    }
                } else if(sufx) {
                    this.x -= this.speed * this.speedup / d;
                }
                break;
            };
        };
        let sufy = Blocks.length;
        for(let i = 0; i < Blocks.length; i++) {
            if(Blocks[i] !== null && Blocks[i].physics) {
                if((this.y + this.height - this.sy > Blocks[i].y && this.y + this.height - this.sy < Blocks[i].y + Blocks[i].height) || (this.y - this.sy < Blocks[i].y + Blocks[i].height && this.y - this.sy > Blocks[i].y)) {
                    if((this.x <= Blocks[i].x + Blocks[i].width && this.x > Blocks[i].x) || (this.x + this.width >= Blocks[i].x && this.x + this.width < Blocks[i].x + Blocks[i].width)) {
                        if(this.y - this.sy < Blocks[i].y + Blocks[i].height && this.y - this.sy > Blocks[i].y) {
                            Blocks[i].CallAction(i, 0, "Down");
                        }
                        if(this.y + this.height - this.sy > Blocks[i].y && this.y + this.height - this.sy < Blocks[i].y + Blocks[i].height) {
                            Blocks[i].CallAction(i, 1, "Up");
                            this.Jumped = false;
                        }
                        sufy = i;
                        break;
                    }
                }
            }
        }

        if(sufy === Blocks.length) {
            this.y -= this.sy;
            this.sy -= Water ? 0.02 : 0.07;
            if(Water && (this.sy > 0.5 || this.sy < -0.5)) {
                this.speedup = this.sy * 3 + 1;
                if(this.speedup < 0) {
                    this.speedup = -this.speedup + 2;
                }

                if(this.speedup > 3) {
                    this.speedup = 3;
                }
            } else {
                this.speedup = 1;
            }
            if(this.sy < -0.35) {
                this.Jumped = true;
            }
        } else {
            if(this.sy !== 0) {
                this.sy = 0;
            }
        }
    }
};