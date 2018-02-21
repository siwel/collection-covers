import {CustomPIXIComponent} from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import { SketchPicker } from 'react-color';

const TYPE = "Background";
export const behavior = {
    customDisplayObject: props => new PIXI.Container(),
    customApplyProps: function (instance, oldProps, newProps) {

       console.log("customApplyProps");
        const {x, y, width, height, texture, type, forceSize, color} = newProps;



        let sprite = new PIXI.Sprite(texture);
        let mask = new PIXI.Graphics().beginFill(color).drawRect(0, 0, width, height).endFill();


        instance.x = x;
        instance.y = y;
        instance.mask = mask;
        instance.addChild(mask);
        instance.addChild(sprite);

        let sp = {x: sprite.width, y: sprite.height};
        if (forceSize) sp = forceSize;
        let winratio = width / height;
        let spratio = sp.x / sp.y;
        let scale = 1;
        let pos = new PIXI.Point(0, 0);
        if (type === 'cover' ? (winratio > spratio) : (winratio < spratio)) {
            //photo is wider than background
            scale = width / sp.x;
            pos.y = -((sp.y * scale) - height) / 2
        } else {
            //photo is taller than background
            scale = height / sp.y;
            pos.x = -((sp.x * scale) - width) / 2
        }

        sprite.scale = new PIXI.Point(scale, scale);
        sprite.position = pos;
    }
};
export default CustomPIXIComponent(behavior, TYPE);