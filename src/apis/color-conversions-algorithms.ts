function num2hex(x:number): string
{
    const expanded = '00' + x.toString(16);
    return expanded.slice(-2);
}

/**
 * Converts an HSV color value to a string #rrggbb. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  string          The RGB representation as #rrggbb
 */
export function hsvToHex(h: number, s: number, v: number): string
{

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    let r=0, g=0, b=0;
    switch (i % 6)
    {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
    }

    r*=255;
    g*=255;
    b*=255;
    const hexR = num2hex(r);
    const hexG = num2hex(g);
    const hexB = num2hex(b);
    return `#${hexR}${hexG}${hexB}`;
}


 // currentHue = 0.127;
 // CONJ_PHI =  0.618033988749895;
export function getColor(iter: number): string
{
    const hue = (0.127 + iter * 0.618033988749895) % 1;
    const [h,s,v] = [hue*360, 0.5, 0.95];
    return hsvToHex(h,s,v);
}

