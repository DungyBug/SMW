let Run = document.getElementById("Run");
let Stop = document.getElementById("Stop");
const tx = window.screen.width / 640;
const ty = window.screen.height / 360;
let Current_Block = [blockw12];
let Current_CallAction = function() {};
let Current_Frame = 1;
let Current_Physics = true;
let Current_Type = 0;
let mx = 0, my = 0;
Mario = new SMario(62, 100);
let CameraX = Mario.x;
let CameraY = Mario.y;
let started = false;
let ticked = false;
let BGX = 0;
let BGY = 0;
let kmx = 0, kmy = 0;

function DrawBackground(background, xb, yb = 0, scale = 1) {
    for(let x = -640; x < 640 + xb / scale; x += background.width) {
        for(let y = -360; y < 360 + yb / scale; y += background.height) {
            ctx.drawImage(background, Math.floor(x + xb), Math.floor(y + yb), background.width, background.height);
        }
    }
}

let Vertex = {
    Backgrounds: [],
    CreateBackground: function(Background, ZCoor, xb = 0, yb = 0, sx = 0, sy = 0) {
        this.Backgrounds[this.Backgrounds.length] = Background;
        this.Backgrounds[this.Backgrounds.length] = ZCoor;
        this.Backgrounds[this.Backgrounds.length] = xb;
        this.Backgrounds[this.Backgrounds.length] = yb;
        this.Backgrounds[this.Backgrounds.length] = sx;
        this.Backgrounds[this.Backgrounds.length] = sy;
        this.Backgrounds[this.Backgrounds.length] = 0;
        this.Backgrounds[this.Backgrounds.length] = 0;
    },
    DrawRearBackgrounds: function() {
        for(let i = 0; i < this.Backgrounds.length; i += 8) {
            if(this.Backgrounds[i + 1] >= 0) {
                DrawBackground(this.Backgrounds[i], this.Backgrounds[i + 2], this.Backgrounds[i + 3], 1 / (this.Backgrounds[i + 1] + 1));
            }
        }
    },
    DrawFrontBackgrounds: function() {
        for(let i = 0; i < this.Backgrounds.length; i += 8) {
            if(this.Backgrounds[i + 1] < 0) {
                DrawBackground(this.Backgrounds[i], this.Backgrounds[i + 2], this.Backgrounds[i + 3], -this.Backgrounds[i + 1]);
            }
        }
    },
    CalcCoors: function() {
        for(let i = 0; i < this.Backgrounds.length; i += 8) {  
            this.Backgrounds[i + 6] += this.Backgrounds[i + 4];
            this.Backgrounds[i + 7] += this.Backgrounds[i + 5];
            if(this.Backgrounds[i + 1] > 0) {
                this.Backgrounds[i + 2] = CameraX * (1 / (this.Backgrounds[i + 1] + 1));
                this.Backgrounds[i + 3] = CameraY * (1 / (this.Backgrounds[i + 1] + 1));
            } else {
                this.Backgrounds[i + 2] = CameraX * -this.Backgrounds[i + 1];
                this.Backgrounds[i + 3] = CameraY * -this.Backgrounds[i + 1];
            }
            this.Backgrounds[i + 2] += this.Backgrounds[i + 6];
            this.Backgrounds[i + 3] += this.Backgrounds[i + 7];
        }
    }
};

Vertex.CreateBackground(Fortress, 5);
Vertex.CreateBackground(Air, 3, 0, 100, 0.1);

function SetBlock(str) {
    Current_Type = 0;
    switch(str) {
        case "blockw12": {
            Current_Block = [blockw12];
            Current_CallAction = function() {};
            Current_Frame = 1;
            Current_Physics = true;
            break;
        };
        case "blockw00": {
            Current_Block = [blockw00];
            Current_CallAction = function() {};
            Current_Frame = 1;
            Current_Physics = true;
            break;
        };
        case "blockw01": {
            Current_Block = [blockw01];
            Current_CallAction = function() {};
            Current_Frame = 1;
            Current_Physics = true;
            break;
        };
        case "blockw02": {
            Current_Block = [blockw02];
            Current_CallAction = function() {};
            Current_Frame = 1;
            Current_Physics = false;
            break;
        };
        case "blockw03": {
            Current_Block = [blockw03];
            Current_CallAction = function() {};
            Current_Frame = 1;
            Current_Physics = false;
            break;
        };
        case "blockw04": {
            Current_Block = [blockw04];
            Current_CallAction = function() {};
            Current_Frame = 1;
            Current_Physics = false;
            break;
        };
        case "blockw05": {
            Current_Block = [blockw05];
            Current_CallAction = function() {};
            Current_Frame = 1;
            Current_Physics = false;
            break;
        };
        case "blockw06": {
            Current_Block = [blockw06];
            Current_CallAction = function() {};
            Current_Frame = 1;
            Current_Physics = false;
            break;
        };
        case "blockw07": {
            Current_Block = [blockw07];
            Current_CallAction = function() {};
            Current_Frame = 1;
            Current_Physics = true;
            break;
        };
        case "blockw08": {
            Current_Block = [blockw08];
            Current_CallAction = function() {};
            Current_Frame = 1;
            Current_Physics = false;
            break;
        };
        case "blockw09": {
            Current_Block = [blockw09];
            Current_CallAction = function() {};
            Current_Frame = 1;
            Current_Physics = true;
            break;
        };
        case "blockw10": {
            Current_Block = [blockw10];
            Current_CallAction = function() {};
            Current_Frame = 1;
            Current_Physics = true;
            break;
        };
        case "blockw11": {
            Current_Block = [blockw11];
            Current_CallAction = function() {};
            Current_Frame = 1;
            Current_Physics = true;
            break;
        };
        case "block_n4": {
            Current_Block = [block_n4];
            Current_CallAction = function() {};
            Current_Frame = 1;
            Current_Physics = true;
            break;
        };
        case "Lava": {
            Current_Block = [LiquidLava0, LiquidLava1, LiquidLava2, LiquidLava3, LiquidLava4, LiquidLava5, LiquidLava6, LiquidLava7, LiquidLava8, LiquidLava9];
            Current_CallAction = function() {
                Mario.GetDamage();
            };
            Current_Frame = 5;
            Current_Physics = true;
            break;
        };
        case "block_n0": {
            Current_Block = [block_n0];
            Current_CallAction = function(block, n, str) {
                if(str === "Down") {
                    if(Blocks[block].images[0] !== block_n4) {
                        new Mushroom(Blocks[block].x, Blocks[block].y, 1, 1);
                        new Audio(Pickup.src).play();
                        Blocks[block].images = [block_n4];
                        Blocks[block].frame = 1;
                        Blocks[block].frames = 0;
                        Blocks[block].jy = 16;
                        requestAnimationFrame(() => Blocks[block].CallAction(block, n, str));
                    } else if(Blocks[block].jy > 0) {
                        Blocks[block].jy--;
                        Blocks[block].y -= 0.5;
                        requestAnimationFrame(() => Blocks[block].CallAction(block, n, str));
                    } else if(Blocks[block].jy > -16) {
                        Blocks[block].jy--;
                        Blocks[block].y += 0.5;
                        requestAnimationFrame(() => Blocks[block].CallAction(block, n, str));
                    }
                }
            };
            Current_Frame = 1;
            Current_Physics = true;
            break;
        };
        case "block_n1": {
            Current_Block = [block_n1];
            Current_CallAction = function(block, n, str) {
                if(str === "Down") {
                    if(Blocks[block].images[0] !== block_n4) {
                        new Mushroom(Blocks[block].x, Blocks[block].y, 1, 1);
                        new Audio(Pickup.src).play();
                        Blocks[block].images = [block_n4];
                        Blocks[block].frame = 1;
                        Blocks[block].frames = 0;
                        Blocks[block].jy = 16;
                        requestAnimationFrame(() => Blocks[block].CallAction(block, n, str));
                    } else if(Blocks[block].jy > 0) {
                        Blocks[block].jy--;
                        Blocks[block].y -= 0.5;
                        requestAnimationFrame(() => Blocks[block].CallAction(block, n, str));
                    } else if(Blocks[block].jy > -16) {
                        Blocks[block].jy--;
                        Blocks[block].y += 0.5;
                        requestAnimationFrame(() => Blocks[block].CallAction(block, n, str));
                    }
                }
            };
            Current_Frame = 1;
            Current_Physics = true;
            break;
        };
        case "block_n2": {
            Current_Block = [block_n2];
            Current_CallAction = function(block, n, str) {
                if(str === "Down") {
                    if(Blocks[block].images[0] !== block_n4) {
                        new Mushroom(Blocks[block].x, Blocks[block].y, 1, 1);
                        new Audio(Pickup.src).play();
                        Blocks[block].images = [block_n4];
                        Blocks[block].frame = 1;
                        Blocks[block].frames = 0;
                        Blocks[block].jy = 16;
                        requestAnimationFrame(() => Blocks[block].CallAction(block, n, str));
                    } else if(Blocks[block].jy > 0) {
                        Blocks[block].jy--;
                        Blocks[block].y -= 0.5;
                        requestAnimationFrame(() => Blocks[block].CallAction(block, n, str));
                    } else if(Blocks[block].jy > -16) {
                        Blocks[block].jy--;
                        Blocks[block].y += 0.5;
                        requestAnimationFrame(() => Blocks[block].CallAction(block, n, str));
                    }
                }
            };
            Current_Frame = 1;
            Current_Physics = true;
            break;
        };
        case "block_n3": {
            Current_Block = [block_n3];
            Current_CallAction = function(block, n, str) {
                if(str === "Down") {
                    if(Blocks[block].images[0] !== block_n4) {
                        new Mushroom(Blocks[block].x, Blocks[block].y, 1, 1);
                        new Audio(Pickup.src).play();
                        Blocks[block].images = [block_n4];
                        Blocks[block].frame = 1;
                        Blocks[block].frames = 0;
                        Blocks[block].jy = 16;
                        requestAnimationFrame(() => Blocks[block].CallAction(block, n, str));
                    } else if(Blocks[block].jy > 0) {
                        Blocks[block].jy--;
                        Blocks[block].y--;
                        requestAnimationFrame(() => Blocks[block].CallAction(block, n, str));
                    } else if(Blocks[block].jy > -16) {
                        Blocks[block].jy--;
                        Blocks[block].y++;
                        requestAnimationFrame(() => Blocks[block].CallAction(block, n, str));
                    }
                }
            };
            Current_Frame = 1;
            Current_Physics = true;
            break;
        };
        case "block_n5": {
            Current_Block = [block_n5];
            Current_CallAction = function() {};
            Current_Frame = 1;
            Current_Physics = true;
            break;
        };
        case "loot_block": {
            Current_Block = [lootblock0, lootblock1, lootblock2, lootblock3, lootblock4, lootblock5, lootblock6, lootblock7];
            Current_CallAction = function(block, n, str) {
                if(str === "Down") {
                    if(Blocks[block].frames !== 0) {
                        new Mushroom(Blocks[block].x, Blocks[block].y, 1, 1);
                        new Audio(Pickup.src).play();
                        Blocks[block].images = [block_n4];
                        Blocks[block].frame = 1;
                        Blocks[block].frames = 0;
                        Blocks[block].jy = 16;
                        requestAnimationFrame(() => Blocks[block].CallAction(block, n, str));
                    }
                    if(Blocks[block].jy > 0) {
                        Blocks[block].jy--;
                        Blocks[block].y -= 0.5;
                        requestAnimationFrame(() => Blocks[block].CallAction(block, n, str));
                    } else if(Blocks[block].jy > -16) {
                        Blocks[block].jy--;
                        Blocks[block].y += 0.5;
                        requestAnimationFrame(() => Blocks[block].CallAction(block, n, str));
                    }
                }
            };
            Current_Frame = 4;
            Current_Physics = true;
            break;
        };
    }
}

function SetPickable(str) {
    Current_Type = 1;
    switch(str) {
        case "Mushroom": {
            Current_Block = [mushroom, "Mushroom", "0, 1"];
            break;
        };
        case "BlockMushroom": {
            Current_Block = [mushroom, "Mushroom", "1, 1"];
            break;
        };
        case "Coin": {
            Current_Block = [ncoin0, "Coin", '0'];
            break;
        };
        case "RedCoin": {
            Current_Block = [rcoin0, "Coin", '1'];
            break;
        };
        case "Water": {
            Current_Block = [LWater, "LiquidWater", "1, 1"];
            break;
        };
        case "Lava": {
            Current_Block = [LiquidLava0, "LiquidLava", "1, 1"];
            break;
        };
        case "BlueCoopa": {
            Current_Block = [blue_coopa0, "BlueCoopa", ""];
            break;
        };
    };
}

function Draw() {
    for(let j = 0; j < ObjectsArray.length; j++) {
        if(
            ObjectsArray[j].x > CameraX - 94
            &&
            (
                ObjectsArray[j].y + ObjectsArray[j].height > CameraY - 132
                ||
                ObjectsArray[j].y < CameraY + 492
            )
            && 
            ObjectsArray[j].x < CameraX + 734
        ) {
            ObjectsArray[j].Draw();
        }
    }
    DrawText(8, 8, 'Room #O.O\nTest Room');
    if(!started) {
        ctx.fillStyle = "#ff005550";
        ctx.fillRect((mx - mx % 16) / 16 * 16, (my - my % 16) / 16 * 16, 16, 16);
    }
    for(let i = 0; i < Blocks.length; i++) {
        if(Blocks[i] !== null) {
            if(Blocks[i].x > CameraX - 94 && Blocks[i].y > CameraY - 132 && Blocks[i].x < CameraX + 734 && Blocks[i].y < CameraY + 492) {
                let j = 0;
                if(Blocks[i].frame > 1) {
                    j = (Blocks[i].frames - Blocks[i].frames % Blocks[i].frame) / Blocks[i].frame;
                }
                try {
                    ctx.drawImage(Blocks[i].images[j], Blocks[i].x, Blocks[i].y);
                } catch(e) {
                    ctx.fillStyle = "#ff00ff";
                    ctx.fillRect(Blocks[i].x, Blocks[i].y, Blocks[i].width, Blocks[i].height);
                }
                if(Blocks[i].frames < (Blocks[i].images.length - 1) * Blocks[i].frame) {
                    Blocks[i].frames++;
                } else {
                    Blocks[i].frames = 0;
                }
            }
        }
    }
}

function MapClass(classs, string, xx = 0, yy = 0) {
    let y = yy;
    let x = xx;
    for(let i = 0; i < string.length; i++) {
        x += 16;
        if(string[i] === '#') {
            eval("new " + classs + '(' + x + ',' + y + ')');
        } else if(string[i] === '\n') {
            y += 16;
            x = xx;
        }
    }
}

function MapFunc(images,
                string,
                width    = 16,
                height   = 16,
                xx       =  0,
                yy       =  0,
                frame    =  1,
                callback = function() {}) {
    let y = yy;
    let x = xx;
    for(let i = 0; i < string.length; i++) {
        x += 16;
        if(string[i] === '#') {

            CreateBlock(width, height, x, y, images, frame, callback);

        } else if(string[i] === '\n') {

            y += 16;
            x = xx;
        
        }
    }
}

function CalcPhysics() {
    Mario.CalcPhysics();
    isWater = false;
    for(let j = 0; j < ObjectsArray.length; j++) {
        if(
            ObjectsArray[j].x > CameraX - 94
            &&
            (
                ObjectsArray[j].y + ObjectsArray[j].height > CameraY - 132
                ||
                ObjectsArray[j].y < CameraY + 492
            )
            && 
            ObjectsArray[j].x < CameraX + 734
        ) {
            ObjectsArray[j].CalcPhysics();
        }
    }

    Water = isWater;
    if(Water) {
        Mario.jumpsound = JumpWater;
    } else {
        Mario.jumpsound = Jump;
    }
}

function Tick() {
    ctx.clearRect(CameraX - 62, CameraY - 100, 640, 360);
    if(started) {
        CalcPhysics();
    }
    let oldCameraX = CameraX, oldCameraY = CameraY;
    CameraX = Math.floor(Mario.x) - 320;
    CameraY = Math.floor(Mario.y) - 180;
    Vertex.CalcCoors();
    Vertex.DrawRearBackgrounds();
    Draw();
    Vertex.DrawFrontBackgrounds();
    let x = Math.floor(oldCameraX - CameraX);
    let y = Math.floor(oldCameraY - CameraY);
    ctx.translate(x, y);
    Mario.Draw();
    if(!started) {
        ctx.drawImage(Current_Block[0], mx, my / 16 * 16);
    }
    if(Mario.hp > 0) {
        requestAnimationFrame(Tick);
    }
};

document.onmousedown = e => {
    if(e.button === 0 && !started) {
        document.onmousemove = e => {
            mx = ((CameraX + e.x - 62) - (CameraX + e.x - 62) % 16) / 16 * 16;
            my = ((CameraY + e.y - 100) - (CameraY + e.y - 100) % 16) / 16 * 16;
            mx = Math.floor(mx / tx) + Math.floor(CameraX / tx * 2);
            my = Math.floor(my / ty) + Math.floor(CameraY / ty * 2);
            let ok = true;
            if(Current_Type === 0) {
                for(let i = 0; i < Blocks.length; i++) {
                    if(Blocks[i].x === (mx - mx % 16) / 16 * 16 && Blocks[i].y === (my - my % 16) / 16 * 16) {
                        ok = false;
                        break; 
                    }
                }
            } else if(Current_Type < 3) {
                if(Current_Block[1] === "LiquidWater") {
                    let mmy = 0;
                    for(let i = 0; i < Blocks.length; i++) {
                        if(Math.floor(Blocks[i].x) === (mx - mx % 16) / 16 * 16 && mmy < Blocks[i].y) {
                            mmy = Blocks[i].y - 16;
                        }
                    }
                    if(mmy > 0) {
                        Current_Block[2] = "1, " + Math.floor((mmy - ((my - my % 16) / 16 * 16)) / 16 + 1);
                    } else {
                        Current_Block[2] = "1, 1";
                    }
                } else if(Current_Block[1] === "LiquidLava") {
                    let mmy = 0;
                    for(let i = 0; i < Blocks.length; i++) {
                        if(Math.floor(Blocks[i].x) === (mx - mx % 16) / 16 * 16 && mmy < Blocks[i].y) {
                            mmy = Blocks[i].y - 16;
                        }
                    }
                    if(mmy > 0) {
                        Current_Block[2] = "1, " + Math.floor((mmy - ((my - my % 16) / 16 * 16)) / 16 + 1) + ",1";
                    } else {
                        Current_Block[2] = "1, 1, 1";
                    }
                }
                for(let i = 0; i < Blocks.length; i++) {
                    if(Blocks[i].images[0] === lootblock0 || Blocks[i].images[0] === block_n0 || Blocks[i].images[0] === block_n1 || Blocks[i].images[0] === block_n2 || Blocks[i].images[0] === block_n3) {
                        if(Blocks[i].x === (mx - mx % 16) / 16 * 16 && Blocks[i].y === (my - my % 16) / 16 * 16) {
                            switch(Current_Block[1]) {
                                case "Mushroom": {
                                    Blocks[i].CallAction = function(block, n, str) {
                                        if(str === "Down") {
                                            if(Blocks[block].frames !== 0) {
                                                new Mushroom(Blocks[block].x, Blocks[block].y, 1, 1);
                                                new Audio(Pickup.src).play();
                                                Blocks[block].images = [block_n4];
                                                Blocks[block].frame = 1;
                                                Blocks[block].frames = 0;
                                                Blocks[block].jy = 8;
                                                requestAnimationFrame(() => Blocks[i].CallAction(block, n, str));
                                            }
                                            if(Blocks[block].jy > 0) {
                                                Blocks[block].jy--;
                                                Blocks[block].y--;
                                                requestAnimationFrame(() => Blocks[i].CallAction(block, n, str));
                                            } else if(Blocks[block].jy > -8) {
                                                Blocks[block].jy--;
                                                Blocks[block].y++;
                                                requestAnimationFrame(() => Blocks[i].CallAction(block, n, str));
                                            }
                                        }
                                    };
                                    ok = false;
                                    break;
                                };

                                case "BlockMushroom": {
                                    Blocks[i].CallAction = function(block, n, str) {
                                        if(str === "Down") {
                                            if(Blocks[block].frames !== 0) {
                                                new Mushroom(Blocks[block].x, Blocks[block].y, 1, 1);
                                                new Audio(Pickup.src).play();
                                                Blocks[block].images = [block_n4];
                                                Blocks[block].frame = 1;
                                                Blocks[block].frames = 0;
                                                Blocks[block].jy = 8;
                                                requestAnimationFrame(() => Blocks[i].CallAction(block, n, str));
                                            }
                                            if(Blocks[block].jy > 0) {
                                                Blocks[block].jy--;
                                                Blocks[block].y--;
                                                requestAnimationFrame(() => Blocks[i].CallAction(block, n, str));
                                            } else if(Blocks[block].jy > -8) {
                                                Blocks[block].jy--;
                                                Blocks[block].y++;
                                                requestAnimationFrame(() => Blocks[i].CallAction(block, n, str));
                                            }
                                        }
                                    };
                                    ok = false;
                                    break;
                                };

                                case "Coin": {
                                    Blocks[i].CallAction = function(block, n, str) {
                                        if(str === "Down") {
                                            if(Blocks[block].frames !== 0) {
                                                Blocks[block].images = [block_n4];
                                                Blocks[block].frame = 1;
                                                Blocks[block].frames = 0;
                                                Blocks[block].jy = 8;
                                                Blocks[block].coin = new Coin(Blocks[block].x, Blocks[block].y, 1);
                                                requestAnimationFrame(() => Blocks[i].CallAction(block, n, str));
                                            } else if(Blocks[block].jy > 0) {
                                                Blocks[block].jy--;
                                                Blocks[block].y--;
                                                Blocks[block].coin.y -= 3;
                                                requestAnimationFrame(() => Blocks[i].CallAction(block, n, str));
                                            } else if(Blocks[block].jy > -8) {
                                                Blocks[block].jy--;
                                                Blocks[block].y++;
                                                Blocks[block].coin.y -= 3;
                                                requestAnimationFrame(() => Blocks[i].CallAction(block, n, str));
                                            } else if(Blocks[block].jy > -16) {
                                                Blocks[block].jy--;
                                                Blocks[block].coin.y -= 3;
                                                requestAnimationFrame(() => Blocks[i].CallAction(block, n, str));
                                            } else {
                                                Blocks[block].coin.Get();
                                            }
                                        }
                                    };
                                    ok = false;
                                    break;
                                };

                                case "RedCoin": {
                                    Blocks[i].CallAction = function(block, n, str) {
                                        if(str === "Down") {
                                            if(Blocks[block].frames !== 0) {
                                                Blocks[block].images = [block_n4];
                                                Blocks[block].frame = 1;
                                                Blocks[block].frames = 0;
                                                Blocks[block].jy = 8;
                                                Blocks[block].coin = new Coin(Blocks[block].x, Blocks[block].y);
                                                requestAnimationFrame(() => Blocks[i].CallAction(block, n, str));
                                            } else if(Blocks[block].jy > 0) {
                                                Blocks[block].jy--;
                                                Blocks[block].y--;
                                                Blocks[block].coin.y -= 3;
                                                requestAnimationFrame(() => Blocks[i].CallAction(block, n, str));
                                            } else if(Blocks[block].jy > -8) {
                                                Blocks[block].jy--;
                                                Blocks[block].y++;
                                                Blocks[block].coin.y -= 3;
                                                requestAnimationFrame(() => Blocks[i].CallAction(block, n, str));
                                            } else if(Blocks[block].jy > -16) {
                                                Blocks[block].jy--;
                                                Blocks[block].coin.y -= 3;
                                                requestAnimationFrame(() => Blocks[i].CallAction(block, n, str));
                                            } else {
                                                Blocks[block].coin.Get();
                                            }
                                        }
                                    };
                                    ok = false;
                                    break;
                                };
                            };
                            break; 
                        }
                    }
                }

                if(ok) {
                    for(let i = 0; i < ObjectsArray.length; i++) {
                        if(ObjectsArray[i].images !== null) {
                            if(Math.floor(ObjectsArray[i].x) === Math.floor((mx - mx % 16) / 16 * 16) && Math.floor(ObjectsArray[i].y) === Math.floor((my - my % 16) / 16 * 16)) {
                                ok = false;
                                break; 
                            }
                        }
                    }
                }
            } else {
                for(let i = 0; i < Blocks.length; i++) {
                    if(Math.floor(Blocks[i].x) === Math.floor((mx - mx % 16) / 16 * 16) && Math.floor(Blocks[i].y) === Math.floor((my - my % 16) / 16 * 16)) {
                        Blocks.splice(i, 1);
                        break; 
                    }
                }
                for(let i = 0; i < ObjectsArray.length; i++) {
                    if(ObjectsArray[i].images !== null) {
                        if(Math.floor(ObjectsArray[i].x) === Math.floor((mx - mx % 16) / 16 * 16) && Math.floor(ObjectsArray[i].y) === Math.floor((my - my % 16) / 16 * 16)) {  
                            ObjectsArray.splice(i, 1);
                            break; 
                        }
                    }
                }
                ok = false;
            }
            if(ok) {
                if(Current_Type === 0) {
                    CreateBlock(16, 16, (mx - mx % 16) / 16 * 16, (my - my % 16) / 16 * 16, Current_Block, Current_Frame, Current_Physics, Current_CallAction);
                } else if(Current_Type === 1) {
                    eval("new " + Current_Block[1] + '(' + (mx - mx % 16) / 16 * 16 + ',' + (my - my % 16) / 16 * 16 + ',' + Current_Block[2] + ')');
                }
            }
        }
    }
}

document.onmouseup = () => {
    document.onmousemove = e => {
        mx = ((CameraX + e.x - 62) - (CameraX + e.x - 62) % 16) / 16 * 16;
        my = ((CameraY + e.y - 100) - (CameraY + e.y - 100) % 16) / 16 * 16;
        mx = Math.floor(mx / tx) + Math.floor(CameraX / tx * 2);
        my = Math.floor(my / ty) + Math.floor(CameraY / ty * 2);
    }
}

document.onmousemove = e => {
    mx = ((CameraX + e.x - 62) - (CameraX + e.x - 62) % 16) / 16 * 16;
    my = ((CameraY + e.y - 100) - (CameraY + e.y - 100) % 16) / 16 * 16;
    mx = Math.floor(mx / tx) + Math.floor(CameraX / tx * 2);
    my = Math.floor(my / ty) + Math.floor(CameraY / ty * 2);
}

Run.onmousedown = function() {
    Run.style.animation = "0.8s ease-in-out 0s Hide";
    Run.style.zIndex = "0";
    Run.style.right = "-11%";
    Stop.style.animation = "0.8s ease-in-out 0s Show";
    Stop.style.zIndex = "1";
    Stop.style.right = "0";
    started = true;
    if(!ticked) {
        ticked = true;
        Tick();
    }
}

Stop.onmousedown = function() {
    Stop.style.animation = "0.8s ease-in-out 0s Hide";
    Stop.style.zIndex = "0";
    Stop.style.right = "-11%";
    Run.style.animation = "0.8s ease-in-out 0s Show";
    Run.style.zIndex = "1";
    Run.style.right = "0";
    if(Mario.hp === 0) {
        Mario.hp = 1;
        Tick();
    }
    started = false;
}