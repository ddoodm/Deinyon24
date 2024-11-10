#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 outColor;

uniform vec2 u_resolution;
uniform float u_time;

const float INFINITY = 300.0;
const float EPSILON = 0.0001;
const float PI = 3.14159;

float sdBox(vec3 p, vec3 b)
{
    return length(max(abs(p) - b, 0.0));
}

vec2 field(vec3 p) {
  float d = 0.0;
    
        vec3 pp = p + vec3(
            0.0,
            cos(p.x*0.04 + u_time*4.0)*4.0,
            -1.0 + sin(p.x*0.1 - u_time*4.0)*0.5);
        float r = 3.;
        vec3 br = vec3(INFINITY, r, r);
        d = sdBox(pp, br);
        d -= 0.4; // rounding
    
    float mat = 1.;
    
    return vec2(d, mat);
}

vec3 normal(vec3 p)
{
    vec2 e = vec2(EPSILON, 0.0);
    return normalize(vec3(
    	field(p+e.xyy).x - field(p-e.xyy).x,
      field(p+e.yxy).x - field(p-e.yxy).x,
      field(p+e.yyx).x - field(p-e.yyx).x
	));
}

vec4 trace(vec3 ro, vec3 rd)
{
    const int ITERS = 400;
    
    vec3 p = ro;
    vec2 d;
    
    for(int i = 0; i < ITERS; i++)
    {
        d = field(p);
        
        if(d.x <= EPSILON) {
            return vec4(p, d.y);
        }
        if(d.x >= INFINITY) {
            return vec4(p, 0.0);
        }
        
        p += rd * d.x;
    }
    
    return vec4(p, d.y);
}

vec3 shadeSnake(vec4 pm, vec3 ro, vec3 n)
{
    vec3 amb = vec3(0.12, 0.10, 0.30) * 1.3;

    vec3 lp1 = normalize(vec3(-2.00, 1.0, 0.7));
    vec3 lp2 = normalize(vec3(1.0, -1.0, 0.));
    vec3 lp3 = normalize(vec3(15., 0.0, -1.0));
    
    float mat = pm.w;
    vec3 p = pm.xyz;
    float d = length(p);
    vec3 r = reflect(normalize(p-ro), n);

    vec3 alb = vec3(0.5);

    vec3 l1alb = vec3(0.24, 0.75, 0.99);
    vec3 l2alb = vec3(1.0, 0.6, 0.25);
    vec3 l3alb = vec3(1.0);

    vec3 salb = l1alb * 0.1;
    
    float l1 = max(0.0, dot(n, lp1));
    float l2 = max(0.0, dot(n, lp2));
    float l3 = max(0.0, dot(n, lp3));
    
    float spec3 = pow(max(0.0, dot(r, lp3)), 60.0);

    return  amb * alb +
        	alb * l1alb * l1 +
          alb * l2alb * l2 +
        	alb * l3alb * l3 +
        	salb * spec3;
}

vec4 shade(vec4 hit, vec3 ro, vec3 rd)
{
    vec4 col;
    vec3 p = hit.xyz;
    float d = length(p - ro);
    
    if(hit.w < 0.5) {
      col = vec4(0.0);
    } else {
    	vec3 n = normal(p);
      col = vec4(shadeSnake(hit, ro, n), 1.0);
    }
    
    return col;
}

void main() {
  vec2 uv = v_uv;
  uv.x *= log2(u_resolution.x / u_resolution.y) * 3.0;

  vec3 ro = vec3(0.0, 0.0, -10.0);
  vec3 rd = normalize(vec3(uv.x, uv.y, 0.8));

  vec4 hit = trace(ro, rd);
  vec4 col = shade(hit, ro, rd);

  outColor = col;
}