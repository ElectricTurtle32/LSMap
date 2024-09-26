class Cam {
    constructor(pos, angle, zoom) {
      this.position = pos;
      this.angle = angle;
      this.zoom = zoom;
    }
    rotatePoint(center, pos) {
        let cx = center.x;
        let cy = center.y;
        let x = pos.x;
        let y = pos.y;
        var radians = (Math.PI / 180) * this.angle,
            cos = Math.cos(radians),
            sin = Math.sin(radians),
            nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
            ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
        return createVector(nx, ny);
    }

    zoomPoint(center, pos) {
        let offsetx = pos.x - center.x;
        let offsety = pos.y - center.y;
        offsetx *= this.zoom;
        offsety *= this.zoom;
        let nx = center.x + offsetx;
        let ny = center.y + offsety;
        return createVector(nx, ny);
    }
}

