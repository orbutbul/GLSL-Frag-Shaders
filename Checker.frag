precision highp float;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
#define MAX_ITER 100

float checker(vec2 uv, float uvpos, float scale){
    uv *=scale;
    uv += uvpos;
    vec2 gridUv = fract(uv);

    float slayygridUv = step(.5,gridUv.x);
    slayygridUv +=step(.5,gridUv.y);
    if (slayygridUv >=2.){
        slayygridUv=0.;
    }
    return slayygridUv;
}

void main(){
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec3 color = vec3(uv,0.);
    float slay = checker(uv,0.,12.);
    color = vec3(slay);
    gl_FragColor = vec4(color,1.);
}