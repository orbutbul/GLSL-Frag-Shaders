precision highp float;
uniform vec2 u_resolution;

float wavey(float axis, float axissub, float scale, float waviness){
    scale *= 6.28;
    return  sin(scale *axis- (waviness*  sin(scale * axissub)));
}

void main(){
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec3 col = vec3(0.);
    uv *= 1.;
    float newUv = smoothstep(0.9,.0,sin(uv.y - .1*sin(uv.x)));
    newUv = wavey(uv.x,uv.y,10.,3.);
    col.xy = uv;
    col = vec3(newUv);

    gl_FragColor= vec4(col,1.);
}