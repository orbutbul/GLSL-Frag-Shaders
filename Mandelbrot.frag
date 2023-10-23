precision highp float;
uniform vec2 u_resolution;


void main() {
    const int Iterations = 10;
    const float Threshold = 8.;

    vec3 color = vec3(1.);
    vec2 uv = gl_FragCoord.xy / u_resolution;
    // uv = gl_FragCoord.xy / u_resolution.y; 

    uv -=1.;

    color = vec3(uv,0.);

    vec2 z = vec2(0.,0.);
    float x = z.x;
    float y = z.y;

    bool isBounded = true;

    for (int i=0; i < Iterations; i++){
        
        if ((x * x + y * y) > Threshold){
            isBounded = false;
            break;
        }
        vec2 zNew;
        zNew.x = x * x - y * y;
        zNew.y =2. * x * y;

        zNew += uv;

        z = zNew;


    }

    if (isBounded){
        color=vec3(1.);
    }




    gl_FragColor= vec4(color,1.);
}