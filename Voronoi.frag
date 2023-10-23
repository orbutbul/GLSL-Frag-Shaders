precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
const float PHI = 1.61803398874989484820459; // Φ = Golden Ratio 

vec2 randomVec(vec2 p) 
{
    p += .02;
    float x = dot(p, vec2(156.,456.));
    float y = dot(p, vec2(234.,532.));
    vec2 gradient = vec2(x,y);

    
    gradient = sin(gradient);
    gradient *= 13674.;
    gradient = sin(gradient);
    

    return (gradient);

}

float voronoi(vec2 uv,float uvpos, float scale ){
    uv *= scale;
    uv += uvpos;
    float d= 0.;
    float minDist = 100.;
    vec2 gridUv = fract(uv)-.5;
    vec2 gridId = floor(uv);
    vec2 cid =   vec2(0);

        for(float y=-1.;y<=1.;y++){
            for(float x=-1.; x<=1.; x++){
                vec2 offs = vec2(x,y);

                vec2 n = randomVec(gridId+offs);
                vec2 p = offs+sin(n)*.5;
                float d = length(gridUv-p);

                if (d<minDist){
                    minDist =d;
                    cid = gridId + offs;
                }
            }
        }
    return minDist;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec3 color = vec3(0.4);;
    // uv -= 1.;

    color = vec3(uv,.0);

    float m =0.;
    float minDist = 100.;
    float cellIndex =0.;
    float slay = voronoi(uv , 1.8,.4);

    color = vec3(slay);
    // if (false){
    //     for (float i=0.; i<50.;i++){
    //         vec2 n = randomVec(vec2(i));
    //         vec2 p = sin(n*u_time);

    //         float d = length(uv-p);
    //         m+=smoothstep(0.021,0.00,d);

    //         if (d<minDist){
    //             minDist= d;
    //             cellIndex = cellIndex;
    //         }

    //     }
    // } else{
    //     vec2 gridUv = fract(uv)-.5;
    //     vec2 gridId = floor(uv);
    //     vec2 cid =   vec2(0);

    //     for(float y=-1.;y<=1.;y++){
    //         for(float x=-1.; x<=1.; x++){
    //             vec2 offs = vec2(x,y);

    //             vec2 n = randomVec(gridId+offs);
    //             vec2 p = offs+sin(n)*.5;
    //             float d = length(gridUv-p);

    //             if (d<minDist){
    //                 minDist =d;
    //                 cid = gridId + offs;
    //             }
    //         }
    //     }

    // }

    gl_FragColor= vec4(color,1.);
    
}