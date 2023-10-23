precision highp float;
uniform vec2 u_resolution;
float sinstriped(float axis,float scale){
    scale *=3.1415;
    return sin((axis* scale));
}
float sawstriped(float axis,float scale){
    return fract((axis* scale));
}


void main(){
    vec2 uv = gl_FragCoord.xy / u_resolution;
//    vec2 uv = gl_FragCoord.xy / u_resolution.y;


    vec3 color = vec3(1.);
    color = vec3(uv,0.);
    float newUv= sawstriped(uv.x,4.);
    color = vec3(newUv);

    gl_FragColor=vec4(color,1.);
}