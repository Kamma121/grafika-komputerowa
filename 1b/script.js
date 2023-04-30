const vertexShaderTxt = `
    attribute vec2 aPosition;
    void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
    }
`

const fragmentShaderTxt = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(0.8, 0.7, 0.4, 0.9);
    }
`

function main() {
    const canvas = document.querySelector('#main-canvas');
    const gl = canvas.getContext('webgl');

    if (!gl) {
        alert("no webGL");
    }
    const hexagonVertices = [
        0.0, 0.5,
        -0.5, 0.25,
        -0.5, -0.25,
        0.0, -0.5,
        0.5, -0.25,
        0.5, 0.25,
    ];

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderTxt);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderTxt);
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(hexagonVertices), gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 6);
}

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
}

main();