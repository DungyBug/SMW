let ObjectsArray = [];
let isWater = false;
const Words = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '.', ',', '(', ')', '#', '"', '\''];

function GetNum(Word) {
    for(let i = 0; i < 59; i++) {
        if(Words[i] === Word) {
            return i;
        }
    }

    return -1;
}

function DrawText(x, y, text) {
    let yy = y;
    let xx = x;
    for(let j = 0; j < text.length; j++) {
        let num = GetNum(text[j]);
        if(num > -1) {
            let Word = new Image();
            Word.src = "/Font/Font" + num.toString() + ".png";
            ctx.drawImage(Word, xx + j * 8, yy);
        } else if(text[j] === '\n') {
            yy += 9;
            xx -= j * 8 + 8;
        }
    }
}

function GameOver() {
    if(Mario.hp === 0) {
        //alert("Game Over");
        Overworld.pause();
    }
};

class SMario extends GObject {
    constructor(x = 0, y = 0) {
        super();
        this.width = 12;
        this.height = 16;
        this.pow = 0;
        this.speed = 1;
        this.hp = 1;
        this.move = 0;
        this.turn = 0;
        this.sy = 0;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.botlvl = 0;
        this.jumpsound = Jump;
        this.friend = true;
        this.turnhp = true;
        this.frame = 5;
        this.frames = 0;
        this.images = [Mario0, Mario1];
    }

    GetDamage() {
        if(this.turnhp && this.hp > 1) {
            this.hp = 1;
            this.images = [Mario0, Mario1];
            this.frame = 5;
            this.frames = 0;
            this.turnhp = false;
            this.y += 7;
            this.height = 16;
            new Audio(ToLow.src).play();
            setTimeout(() => {
                this.GetMushroom();
                this.hp = 1;
                setTimeout(() => {
                    this.images = [Mario0, Mario1];
                    this.frame = 1;
                    this.frames = 0;
                    this.y += 7;
                    this.height = 16;
                    setTimeout(() => {
                        this.GetMushroom();
                        this.hp = 1;
                        setTimeout(() => {
                            this.images = [Mario0, Mario1];
                            this.frame = 1;
                            this.frames = 0;
                            this.y += 7;
                            this.height = 16;
                            setTimeout(() => {
                                this.frame = 5;
                                this.turnhp = true;
                            }, 2600);
                        }, 100);
                    }, 100);
                }, 100);
            }, 100);
        } else if(this.turnhp && this.hp === 1) {
            this.hp--;
            GameOver();
        }
    }

    GetMushroom() {
        this.hp = 2;
        this.frame = 5;
        this.frames = 0;
        this.images = [BigMario0, BigMario1, BigMario2];
        this.y -= 10;
        this.height = 26;
    }

    Draw() {
        switch(this.move) {
            case 0: {
                if(this.turn === 0) {
                    DrawFlipped(this.images[0], Math.floor(this.x + 1), Math.floor(this.y - 1));
                } else {
                    ctx.drawImage(this.images[0], Math.floor(this.x + 1), Math.floor(this.y - 1));
                }
                break;
            };

            case 1: {
                let j = (this.frames - this.frames % this.frame) / this.frame;
                this.frames++;
                DrawFlipped(this.images[j], Math.floor(this.x + 1), Math.floor(this.y - 1));
                if(this.frames / this.frame === this.images.length) {
                    this.frames = 0;
                };
                break;
            };

            case 2: {
                let j = (this.frames - this.frames % this.frame) / this.frame;
                this.frames++;
                ctx.drawImage(this.images[j], this.x + 1, this.y - 1);
                if(this.frames / this.frame === this.images.length) {
                    this.frames = 0;
                };
                break;
            };
        }
    }
};

class BlueCoopa extends GObject {
    constructor(x = 0, y = 0) {
        super();
        this.width = 16;
        this.height = 27;
        this.pow = 1;
        this.speed = 0.5;
        this.hp = 1;
        this.move = 1;
        this.turn = 0;
        this.sy = 0;
        this.x = x;
        this.y = y;
        this.frame = 10;
        this.frames = 0;
        ObjectsArray[ObjectsArray.length] = this;
        this.turnhp = true;
        this.turndmg = true;
        this.images = [blue_coopa0, blue_coopa1];
        this.Damage = function(str, type) {
            if(str !== "Up" && this.turndmg) {
                Mario.GetDamage();
            } else if(this.turnhp && Mario.Jumped) {
                Mario.Jumped = false;
                Mario.Jump(1.5, false);
                this.GetDamage();
            } else if(!this.turndmg) {
                this.GetDamage(type);
            }
        };
    }

    GetDamage(type = "Left") {
        if(this.hp === 1) {
            this.hp--;
            new Audio(PowFirst.src).play();
            this.turndmg = false;
            this.move = 0;
            this.speed = 3;
            this.frame = 3;
            this.height = 16;
            this.y += 9;
            this.images = [BlueShell0, BlueShell1, BlueShell2, BlueShell3];
        } else {
            this.hp--;
            new Audio(PowSecond.src).play();
            if(this.hp / 2 === Math.floor(this.hp / 2)) {
                this.move = 0;
                this.turndmg = false;
            } else {
                if(type === "Left") {
                    this.move = 2;
                } else {
                    this.move = 1;
                }
                this.turndmg = true;
            }
        }
    }

    Draw() {
        switch(this.move) {
            case 0: {
                if(this.turn === 0) {
                    DrawFlipped(this.images[0], this.x, this.y);
                } else {
                    ctx.drawImage(this.images[0], this.x, this.y);
                }
                break;
            };

            case 1: {
                let j = (this.frames - this.frames % this.frame) / this.frame;
                this.frames++;
                try {
                    ctx.drawImage(this.images[j], this.x, this.y);
                } catch(e) {
                    ctx.fillStyle = "#ff00ff";
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                }
                if(this.frames / this.frame === this.images.length) {
                    this.frames = 0;
                }
                break;
            };

            case 2: {
                let j = (this.frames - this.frames % this.frame) / this.frame;
                this.frames++;
                try {
                    DrawFlipped(this.images[j], this.x, this.y);
                } catch(e) {
                    ctx.fillStyle = "#ff00ff";
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                }
                if(this.frames / this.frame === this.images.length) {
                    this.frames = 0;
                }
                break;
            };
        }
    }
};

class BulletBill extends GObject {
    constructor(x, y, side = true) {
        super();
        this.width = 16;
        this.height = 14;
        this.hp = 1;
        this.move = side;
        this.turn = side;
        this.x = x;
        this.y = y;
        ObjectsArray[ObjectsArray.length] = this;
        this.Damage = function(str) {
            if(str === "Up") {
                this.hp--;
                this.speed = 0;
                this.width = this.height = 0;
                Mario.sy = 2;
            } else {
                Mario.GetDamage();
            }
        }
    }

    Draw() {
        if(this.hp > 0) {
            if(this.turn) {
                ctx.drawImage(Bullet, this.x, this.y - 1);
            } else {
                DrawFlipped(Bullet, this.x, this.y - 1);
            }
        }
    }

    CalcPhysics() {
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
        if(this.turn) {
            this.x -= 2;
        } else {
            this.x += 2;
        }
    }
};

class Pickable {
    constructor(width = 16, height = 16, x = 0, y = 0, image = new Image(), moving = 0) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.sy = 0;
        this.image = image;
        this.moving = moving;
        this.Get = function() {
            this.image = null;
            this.moving = 0;
        };

        this.call = function() {
            return true;
        };
    }

    Draw() {
        if(this.image !== null) {
            ctx.drawImage(this.image, this.x, this.y);
        }
    }

    CalcPhysics() {
        if(this.call() === true) {
            if(this.moving !== 0) {
                let sufy = Blocks.length;
                for(let i = 0; i < Blocks.length; i++) {
                    if(Blocks[i] !== null) {
                        if((this.y + this.height - this.sy > Blocks[i].y && this.y + this.height - this.sy < Blocks[i].y + Blocks[i].height) || (this.y - this.sy < Blocks[i].y + Blocks[i].height && this.y - this.sy > Blocks[i].y)) {
                            if((this.x <= Blocks[i].x + Blocks[i].width && this.x > Blocks[i].x) || (this.x + this.width >= Blocks[i].x && this.x + this.width < Blocks[i].x + Blocks[i].width)) {
                                sufy = i;
                                break;
                            }
                        }
                    }
                }

                if(sufy === Blocks.length) {
                    this.y -= this.sy;
                    this.sy -= Water ? 0.02 : 0.07;
                } else {
                    if(this.sy !== 0) {
                        this.sy = 0;
                    }
                    if(this.Moving === 1) {
                        this.x -= 1;
                        for(let i = 0; i < Blocks.length; i++) {
                            if(this.x <= Blocks[i].x + Blocks[i].width && this.x >= Blocks[i].x) {
                                if(this.y + this.height > Blocks[i].y && this.y < Blocks[i].y + Blocks[i].height) {
                                    this.Moving = 2;
                                }
                            }
                        }
                    } else {
                        this.x += 1;
                        for(let i = 0; i < Blocks.length; i++) {
                            if(Blocks[i] !== null) {
                                if(this.x + this.width >= Blocks[i].x && this.x + this.width < Blocks[i].x + Blocks[i].width) {
                                    if(this.y + this.height > Blocks[i].y && this.y < Blocks[i].y + Blocks[i].height) {
                                        this.Moving = 1;
                                    }
                                }
                            }
                        }
                    }
                    if(this.x + this.width >= Mario.x && this.x + this.width < Mario.x + Mario.width) {
                        if(this.y + this.height > Mario.y && this.y < Mario.y + Mario.height) {
                            this.Get();
                        }
                    }
                    if(this.x <= Mario.x + Mario.width && this.x >= Mario.x) {
                        if(this.y + this.height > Mario.y && this.y < Mario.y + Mario.height) {
                            this.Get();
                        }
                    }
                }
            }
        }
    }
};

class Coin extends Pickable {
    constructor(x = 0, y = 0, type = 0) {
        super();
        this.width = 12;
        this.height = 16;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.sy = 0;
        if(type) {
            this.images = [rcoin0, rcoin1, rcoin2, rcoin3, rcoin4, rcoin5, rcoin6, rcoin7];
            this.frames = 4;
        } else {
            this.images = [ncoin0, ncoin1, ncoin2, ncoin3];
            this.frames = 8;
        }
        this.moving = 0;
        this.Get = function() {
            this.images = null;
            new Audio(CoinSound.src).play();
        };
        ObjectsArray[ObjectsArray.length] = this;
    }

    Draw() {
        if(this.images !== null) {
            let j = (this.frame - this.frame % this.frames) / this.frames;
            this.frame++;
            ctx.drawImage(this.images[j], this.x, this.y);

            if(this.frame / this.frames === this.images.length) {
                this.frame = 0;
            }
        }
    }

    CalcPhysics() {
        if(this.images !== null) {
            if(this.x <= Mario.x + Mario.width && this.x >= Mario.x) {
                if(this.y + 16 > Mario.y && this.y < Mario.y + Mario.height) {
                    this.Get();
                }
            }
            if(this.x + 12 >= Mario.x && this.x + 12 < Mario.x + Mario.width) {
                if(this.y + 16 > Mario.y && this.y < Mario.y + Mario.height) {
                    this.Get();
                }
            }
        }
    }
};

class Mushroom extends Pickable {
    constructor(x = 0, y = 0, type = 0, moving = 0) {
        super();
        this.width = 14;
        this.height = 14;
        this.x = x;
        this.y = y;
        this.sy = 0;
        this.jy = 64;
        this.image = mushroom;
        this.moving = moving;
        this.Get = function() {
            if(this.image !== null) {
                this.image = null;
                this.moving = 0;
                Mario.GetMushroom();
                new Audio(MushroomSound.src).play();
            }
        };
        if(type === 1) {
            this.call = function() {
                if(this.jy > 0) {
                    this.jy--;
                    this.y -= 0.25;
                    if(this.jy === 1) {
                        this.sy = 0;
                    }
                    return false;
                } else {
                    return true;
                }
            }
        }
        ObjectsArray[ObjectsArray.length] = this;
    }
};

function CreatePSwitch(x = 0, y = 0, time = 12, Callback = function() {}) {
    Blocks[Blocks.length] = {
        width: 16,
        height: 16,
        x: x,
        y: y,
        frames: 0,
        frame: 1,
        images: [PSwitch0],
        CallAction: function(block, n, str) {
            if(str === "Up" && this.images[0] !== PSwitch1) {
                this.images = [PSwitch1];
                Overworld.pause();
                Overworld.currentTime = 0;
                PSwitch.play();
                PSwitch.loop = false;
                PSwitchTheme.play();
                requestAnimationFrame(() => Callback(true));
                setTimeout(() => {
                    TimeEnd.play();
                    setTimeout(() => {
                        PSwitchTheme.pause();
                        PSwitchTheme.currentTime = 0;
                        Overworld.play();
                        requestAnimationFrame(() => Callback(false));
                    }, 1000);
                }, time * 1000);
                Blocks[block].width = Blocks[block].height = 0;
                setTimeout(() => {
                    this.images = null;
                    Blocks[block] = null;
                }, 2000);
            }
        }
    };
}

class LiquidWater {
    constructor(x, y, width, height, type = 0) {
        this.x = x;
        this.y = y;
        this.width = width * 16;
        this.height = height * 16;
        this.type = type;
        this.frames = 0;
        this.images = [LiquidLava0, LiquidLava1, LiquidLava2, LiquidLava3, LiquidLava4, LiquidLava5, LiquidLava6, LiquidLava7, LiquidLava8, LiquidLava9];
        ObjectsArray[ObjectsArray.length] = this;
    }

    Draw() {
        for(let x = 0; x < this.width; x += 16) {
            if(this.type === 0) {
                ctx.drawImage(LWater, this.x + x, this.y);
            } else {
                let j = (this.frames - this.frames % 5) / 5;
                ctx.drawImage(this.images[j], this.x + x, this.y);
                this.frames++;
                if(j === 9) {
                    this.frames = 0;
                }
            }
        }

        if(this.height > 0) {
            if(this.type === 0) { 
                ctx.fillStyle = "#4070b0";
            } else {
                ctx.fillStyle = "#d80000"
            }

            ctx.fillRect(this.x, this.y + 16, this.width, this.height - 16);
        }
    }

    CalcPhysics() {
        if(Mario.x + Mario.width >= this.x && Mario.x <= this.x + this.width) {
            if(Mario.y + Mario.height > this.y && Mario.y + Mario.height < this.y + this.height && Mario.y < this.y + this.height) {
                isWater = true;
            }
        }
    }
};

class LiquidLava extends LiquidWater {
    CalcPhysics() {
        if(Mario.x + Mario.width >= this.x && Mario.x <= this.x + this.width) {
            if(Mario.y + Mario.height > this.y && Mario.y + Mario.height < this.y + this.height && Mario.y < this.y + this.height) {
                isWater = true;
                Mario.GetDamage();
            }
        }
    }
};

function CreateLava(x = 0, y = 0) {
    Blocks[Blocks.length] = {
        width: 16,
        height: 16,
        x: x,
        y: y,
        frames: 0,
        frame: 5,
        images: [LiquidLava0, LiquidLava1, LiquidLava2, LiquidLava3, LiquidLava4, LiquidLava5, LiquidLava6, LiquidLava7, LiquidLava8, LiquidLava9],
        physics: physics,
        CallAction: Callback
    };
}

function Fire(x, y, interval) {
    new Audio(Explode.src).play();
    let side = true;

    if(Mario.x > x) {
        side = false;
    }
    new BulletBill(x, y, side);
    setTimeout(() => Fire(x, y, interval), interval * 1000 + Math.floor(Math.random() * (interval * 250) - (interval * 100)));
}

function CreateGun(x = 0, y = 0, interval = 4) {
    Blocks[Blocks.length] = {
        width: 16,
        height: 16,
        x: x,
        y: y,
        frames: 0,
        frame: 1,
        images: [Gun0],
        CallAction: function() {}
    };
    Fire(x, y, interval);
}

document.onkeydown = e => {
    switch(e.keyCode) {
        case 65: {
            Mario.TurnLeft();
            break;
        };
        case 68: {
            Mario.TurnRight();
            break;
        };

        case 32: {
            Mario.Jump(Water ? 1 : 2.7);
            break;
        };

        case 37: {
            if(!started) {
                Mario.x -= 16;
            }
            break;
        };

        case 38: {
            if(!started) {
                Mario.y -= 16;
            }
            break;
        };

        case 39: {
            if(!started) {
                Mario.x += 16;
            }
            break;
        };

        case 40: {
            if(!started) {
                Mario.y += 16;
            }
            break;
        };
    }
}

document.onkeyup = e => {
    if(e.keyCode !== 32) {
        Mario.Stop();
    }
};