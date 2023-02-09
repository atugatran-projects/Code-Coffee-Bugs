const Controls = () => {
    // A btn
    A = add([
        text("(A)    reset"),
        // opacity(0.6),
        scale(3),
        pos(40, 21),
        fixed(),
        color(0, 0, 0),
    ]);
    // Arrow btn
    Arrow = add([
        text("(Arrow keys) start"),
        // opacity(0.8),
        scale(3),
        pos(40, 50),
        color(0, 0, 0),
    ]);
    // full screen
    add([
        text("(f) fullscreen"),
        // opacity(0.8),
        scale(3),
        pos(40, 85),
        color(0, 0, 0),
    ]);
};

module.exports = { Controls }