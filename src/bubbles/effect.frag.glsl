#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 outColor;

uniform vec2 u_resolution;
uniform float u_time;

const float INFINITY = 300.0;
const float EPSILON = 0.001;
const float PI = 3.14159;

float sdBox(vec3 p, vec3 b)
{
    return length(max(abs(p) - b, 0.0));
}

vec2 field(vec3 p) {
  float d = 0.0;
    
    // box
    {
        vec3 pp = p + vec3(
            0.0,
            cos(p.x*0.04 + u_time*4.0)*4.0,
            -1.0 + sin(p.x*0.1 - u_time*4.0)*0.5);
        float r = 1.;
        vec3 br = vec3(100.0, r, r);
        d = sdBox(pp, br);
        d -= 0.3; // rounding
        d *= 0.5; // fix marcher
    }
    
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
    const int ITERS = 200;
    
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
    vec3 lp1 = normalize(vec3(0.7, 0.6, -0.7));
    vec3 lp2 = vec3(0.0, -1.0, 0.0);
    vec3 lp3 = -lp1;
    
    float mat = pm.w;
    vec3 p = pm.xyz;
    float d = length(p);
    vec3 r = reflect(normalize(p-ro), n);

    vec3 amb = vec3(0.15, 0.16, 0.2);
    vec3 alb = vec3(1.0);
    vec3 salb = vec3(1.0);
    vec3 l3alb = vec3(1.0,0.7,0.5);
    
        // band
        amb = vec3(0.3,0.2,0.25);
        alb = vec3(0.4,0.4,0.4);
    
    float l1 = max(0.0, dot(n, lp1));
    float l2 = max(0.0, dot(n, lp2));
    float l3 = max(0.0, dot(n, lp3));
    
    float spec1 = pow(max(0.0, dot(r, lp1)), 50.0);

    return  amb * alb +
        	alb * l1 +
        	alb * l3 * l3alb * 0.15 +
        	salb * spec1;
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
  uv.x *= u_resolution.x / u_resolution.y;

  vec3 ro = vec3(0.0, 0.0, -10.0);
  vec3 rd = normalize(vec3(uv.x, uv.y, 1.8));

  vec4 hit = trace(ro, rd);
  vec4 col = shade(hit, ro, rd);

  outColor = col;
}