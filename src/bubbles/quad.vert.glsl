#version 300 es
in vec2 a_position;
out vec2 v_uv;

void main() {
  v_uv = a_position;
  gl_Position = vec4(a_position, 0, 1);
}
