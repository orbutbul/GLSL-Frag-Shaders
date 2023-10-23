 precision highp float;
uniform vec2 u_resolution ;
uniform float u_time;
uniform vec2 u_mouse;
#define MAX_ITER 100

vec2 quintic(vec2 p) {
  return p * p * p * (10.0 + p * (-15.0 + p * 6.0));
}

// float whiteNoiseMoment(vec2 p, float seed){
//     for(int i = 0; i < 9; i++) {
//         seed = mod((seed * 15382.)  + p.y, 22423453.);

        
//     }

//     seed = sin(seed)* 19323.4* p.x;

//     seed = fract(seed);

//     seed = sin(seed) * 19932. * p.y;
    
//     return fract(seed);


// }
const float PHI = 1.61803398874989484820459; // Φ = Golden Ratio 

float gold_noise(in vec2 xy)
{
    return fract(tan(distance(xy*PHI, xy)*1938324.)*xy.x);
}

float whitenoise2x1 (vec2 p){

    
    float rand= dot(p, vec2(13.554,78.));

    rand = sin(rand);

    rand=fract(rand);

    rand *= 2434.34;
    rand = sin(fract(rand));
    

    return rand;

}

float valueFunction(vec2 uv, vec2 uvpos, float scale) {
    uv *= scale;

    vec2 gridUv= fract(uv);
    vec2 gridId = floor(uv);
    
    gridUv = quintic(gridUv);


    float botLeft = gold_noise(gridId);

    float botRight = gold_noise(gridId + vec2(1.0,0.0) );

    float topLeft = gold_noise(gridId + vec2(.0,1.0) );

    float topRight = gold_noise(gridId + vec2(1.0,1.0) );

    float b = mix(botLeft, botRight, gridUv.x);


    float t = mix(topLeft,topRight,gridUv.x);

    float vn = mix(b,t, gridUv.y) * (1.);

    int i =0;
    

    return vn;
}

float fractalValueNoise(vec2 uv, vec2 uvpos, float scale,int octaves){
    
    float total = 0.0; 
    float frequency = 1.0;
    float amplitude = 1.0;
    float maxValue = 0.0;  //Used for normalizing result

    for(int i = 0; i < MAX_ITER; i++) {
        if (i>=octaves) break;
        total += valueFunction((uv * frequency), uvpos, scale) * amplitude;

        maxValue += amplitude;

        amplitude /= 2.0;
        frequency *= 2.0;
    }
    
    return (total/maxValue);

    return 1.;
}

void main() {

    float scalevar= 12.;

    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec2 m = u_mouse;




    float valueNoise = valueFunction(uv,vec2(1.),scalevar);

    float fractalValue = fractalValueNoise(uv,vec2(1.),12.,12);

    // float slay =whiteNoiseMoment(uv, 1945322.);
    // uv = smoothstep(vec2(0),vec2(1),uv);

    // vec3 color = vec3(0.12, 0.47, 0.18);
    // float noise = whitenoise2x1(uv);
    valueNoise = smoothstep(0.,1.,valueNoise);

    vec3 color = vec3(fractalValue);



    gl_FragColor = vec4(vec3(color),1.);
}



