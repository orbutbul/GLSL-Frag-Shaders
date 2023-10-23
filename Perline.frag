precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
#define MAX_ITER 100


float SmoothCubeInv(float y)
{
   if(y<=0.)return 0.;
   if(y>=1.)return 1.;
   return 0.5-sin(asin(1.-2.*y)/3.);
}
vec2 quintic(vec2 p) {
  return p * p * p * (10.0 + p * (-15.0 + p * 6.0));
}

vec2 randomVec(vec2 p) 
{
    p += .02;
    float x = dot(p, vec2(144.,456.));
    float y = dot(p, vec2(235.,532.));
    vec2 gradient = vec2(x,y);

    
    gradient = sin(gradient);
    gradient *= 13674.;
    gradient = sin(gradient);
    

    return (gradient);

}
float Perlin(vec2 uv, vec2 uvPos, float scale){
  //   return p * p * p * (10.0 + p * (-15.0 + p * 6.0));
  // uv = uv * uv * uv *(10. + uv* (-15. + uv *6.));

  uv *= scale;
  uv += uvPos;

  vec2 gridId = floor(uv);
  vec2 gridUv = fract(uv);

  vec2 botL = gridId + vec2(0.,0.);
  vec2 botR = gridId + vec2(1.,0.);
  vec2 topL = gridId + vec2(0.,1.);
  vec2 topR = gridId + vec2(1.,1.);

  vec2 gradBL= randomVec(botL);
  vec2 gradBR= randomVec(botR);
  vec2 gradTL= randomVec(topL);
  vec2 gradTR= randomVec(topR);

  vec2 distToBL = gridUv - vec2 (0.,0.);
  vec2 distToBR = gridUv - vec2 (1.,0.);
  vec2 distToTL = gridUv - vec2 (0.,1.);
  vec2 distToTR = gridUv - vec2(1.,1.);

  float dotBl = dot(gradBL,distToBL);
  float dotBr = dot(gradBR,distToBR);
  float dotTl = dot(gradTL,distToTL);
  float dotTr = dot(gradTR,distToTR);

  // gridUv = quintic(gridUv);
  // gridUv = smoothstep(0.,1.,gridUv);

  float b = mix (dotBl,dotBr,gridUv.x);
  float t = mix (dotTl,dotTr,gridUv.x);

  float perlin = mix(b,t,gridUv.y);


  return perlin;
}
float fractalPerlin(vec2 uv, vec2 uvPos, float scale, int octaves){
    float total = 0.0; 
    float frequency = 1.0;
    float amplitude = 1.0;
    float maxValue = 0.0;  //Used for normalizing result

    for(int i = 0; i < MAX_ITER; i++) {
        if (i>=octaves) break;
        total += Perlin((uv * frequency), uvPos, scale) * amplitude;

        maxValue += amplitude;

        amplitude /= 2.0;
        frequency *= 2.0;
    }
    
    return (total/maxValue)+.3;
}


void main()
{
    vec3 color = vec3(1.);
    vec2 uv = gl_FragCoord.xy/ u_resolution;


    // float slay = Perlin(uv,vec2(122.),1.+u_time);
    color = vec3(uv,1.);
    float slay = (fractalPerlin(uv,vec2(12.),12.,int(4)));
    color = vec3(slay);

    gl_FragColor= vec4(color,1.);
}