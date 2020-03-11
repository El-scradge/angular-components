import { Injectable } from '@angular/core';

@Injectable

export class HelperService {
  
  hexToHsl(hex, darken?) {

      let h, s, l;
      // converts the hex to RGB values
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      const rgb = result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;

      // next convert the rgb to HSL
      const rgbArray = []
      rgbArray.push(rgb.r / 255);
      rgbArray.push(rgb.g / 255);
      rgbArray.push(rgb.b / 255);

      // find the min and max values;
      const max = rgbArray.reduce(function(a, b) {
        return Math.max(a, b);
      });
      const min = rgbArray.reduce(function(a, b) {
        return Math.min(a, b);
      });

      // caluclate luminence
      l = ((min + max) / 2);

      // calculate saturation
      s = l > .5 ? (max - min) / (2.0 - max - min) : (max - min) / (max + min);

      // calculate hue
      // if the colour value of the max is the same as the min there is no saturation so the hue is 0, or no colour

      switch (max) {
        case min: h = 0; break;
        case rgbArray[0]:  h = (rgbArray[1] - rgbArray[2]) / (max - min); break;
        case rgbArray[1]: h = (rgbArray[2] - rgbArray[0]) / (max - min); h = h + 2.0; break;
        case rgbArray[2]: h = (rgbArray[0] - rgbArray[1]) / (max - min); h = h + 4.0; break;
        default: h = 0; break;
      }

      h = h <= 0 ? h + 360 : h;

      h = h * 60;

      // round up to ints and make percentages

      h = Math.floor(h);
      s = Math.floor(s * 100) ;
      l = Math.floor(l * 100) ;

      l = darken && l > darken ? l - darken : l;

      return `hsl(${h},${s}%,${l}%)`;
    }
  }
