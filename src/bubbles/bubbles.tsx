import React from 'react';
import vertexShaderSource from './quad.vert.glsl';
import fragmentShaderSource from './effect.frag.glsl';

export const Bubbles = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    let program: WebGLProgram;
    let uResolutionLocation: WebGLUniformLocation;
    let uTimeLocation: WebGLUniformLocation;

    let startTime = performance.now();

    const init = (canvas: HTMLCanvasElement, gl: WebGL2RenderingContext) => {
        program = initShaderProgram(gl, vertexShaderSource, fragmentShaderSource);
        gl.useProgram(program);

        const quadVertices = new Float32Array([
            -1.0, -1.0,
             1.0, -1.0,
            -1.0,  1.0,
             1.0,  1.0,
          ]);

          const positionBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

          const positionLocation = gl.getAttribLocation(program, "a_position");
          gl.enableVertexAttribArray(positionLocation);
          gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

          uResolutionLocation = gl.getUniformLocation(program, 'u_resolution')!;
          uTimeLocation = gl.getUniformLocation(program, 'u_time')!;
    };

    const render = (canvas: HTMLCanvasElement, gl: WebGL2RenderingContext) => {
        const { width, height } = canvas;

        const currentTime = performance.now();
        const elapsedTime = (currentTime - startTime) / 1000;
        gl.uniform1f(uTimeLocation, elapsedTime);

        gl.clearColor(0,0,0,0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const ro = new ResizeObserver(entries => {
        entries.forEach(e => {
            const canvas = e.target as HTMLCanvasElement;
            canvas.width = e.contentRect.width;
            canvas.height = e.contentRect.height;
            
            const gl = canvas.getContext('webgl2');
            if (!gl) {
                return;
            }

            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform2f(uResolutionLocation, canvas.width, canvas.height);

            render(canvas, gl);
        });
    });

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        ro.observe(canvas);

        const ctx = canvas.getContext('webgl2');
        if (!ctx) {
            return;
        }

        init(canvas, ctx);

        let raf = -1;
        const loop = () => {
            render(canvas, ctx);
            raf = requestAnimationFrame(loop);
        };
        loop();
        
        return () => {
            clearInterval(raf);
        };
    }, [canvasRef]);

    return (
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    )
};

function initShaderProgram(gl: WebGL2RenderingContext, vsSource: string, fsSource: string): WebGLProgram {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  
    const shaderProgram = gl.createProgram();
    if (!shaderProgram) {
        throw new Error('Unable to create shader program');
    }

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
  
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error("Unable to initialize the shader program:", gl.getProgramInfoLog(shaderProgram));
      gl.deleteProgram(shaderProgram);
      throw new Error();
    }
    return shaderProgram;
  }
  
  function loadShader(gl: WebGL2RenderingContext, type: GLenum, source: string): WebGLShader {
    const shader = gl.createShader(type);
    if (!shader) {
        throw new Error('Unable to create shader');
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);
  
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("An error occurred compiling the shaders:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      throw new Error();
    }
    return shader;
  }