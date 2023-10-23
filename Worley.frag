precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;

vec2 noise2x2(vec2 p) {
  float x = dot(p, vec2(123.4, 234.5));
  float y = dot(p, vec2(345.6, 456.7));
  vec2 noise = vec2(x, y);
  noise = sin(noise);
  noise = noise * 43758.5453;
  noise = fract(noise);
  return noise;
}

void main (){
    vec2 uv = gl_FragCoord.xy / u_resolution;
    uv = gl_FragCoord.xy / u_resolution.y;

    float scaleVar = 22.;

    uv *= scaleVar;

    vec2 currentGridCoord = fract(uv);
    vec2 gridId = floor(uv);

    currentGridCoord -= .5;



    vec2 redGridUv = currentGridCoord;
    redGridUv = abs(redGridUv);
    float distanceToEdge = 2.0 * max(redGridUv.x,redGridUv.y);
    vec3 color = vec3(distanceToEdge,0.,0.);


    float pointsOnGrid = 0.;
    float minDistFromPixel = 100.;

    for(float i = -1.0; i <= 1.0; i++) {
        for(float j = -1.0; j <= 1.0; j++) {
            vec2 currentCoord = vec2(i,j);
            vec2 pointOnOtherGrid = currentCoord;

            vec2 noise = noise2x2(gridId + currentCoord);

            pointOnOtherGrid = currentCoord + sin(u_time * noise)*.5;

            float dist = length(currentGridCoord - pointOnOtherGrid);
            minDistFromPixel = min(dist, minDistFromPixel);
            pointsOnGrid += smoothstep(.95,.96,1. - dist);
            color = vec3(minDistFromPixel);
        }
    }
    

    float slay = minDistFromPixel;





    gl_FragColor=vec4(vec3(slay),1.);
}