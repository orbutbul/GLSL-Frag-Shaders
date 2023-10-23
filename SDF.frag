precision highp float;
uniform float u_time;
uniform vec2 u_resolution;

#define BLACK           vec3(0.0, 0.0, 0.0)
#define WHITE           vec3(1.0, 1.0, 1.0)
#define RED             vec3(1.0, 0.0, 0.0)
#define GREEN           vec3(0.0, 1.0, 0.0)
#define BLUE            vec3(0.0, 0.0, 1.0)
#define YELLOW          vec3(1.0, 1.0, 0.0)
#define CYAN            vec3(0.0, 1.0, 1.0)
#define MAGENTA         vec3(1.0, 0.0, 1.0)
#define ORANGE          vec3(1.0, 0.5, 0.0)
#define PURPLE          vec3(1.0, 0.0, 0.5)
#define LIME            vec3(0.5, 1.0, 0.0)
#define ACQUA           vec3(0.0, 1.0, 0.5)
#define VIOLET          vec3(0.5, 0.0, 1.0)
#define AZUR            vec3(0.0, 0.5, 1.0)


float sdfCircle(vec2 p, float r){

    return length(p)-r;
}

void main() {

    vec2 uv = gl_FragCoord.xy / u_resolution;
    uv -= .5;
    uv *= (u_resolution/100.);


    vec3 color = vec3(1.);
    color = PURPLE;

    float radius = 3.5;
    vec2 center = vec2(0.,0.);

    float distanceToCircle = sdfCircle(uv, radius);
    color = distanceToCircle > 0.0 ? ORANGE : BLUE;
    // color *= exp(distanceToCircle);  
    color = color * (1.0 - exp(-2.0 * abs(distanceToCircle)));

    color = color * 0.8 + color * 0.2 * sin (50.*distanceToCircle- u_time*25.);




    
    gl_FragColor= vec4(color,1.);
}