precision highp float;
uniform vec2 u_resolution;

float hexDist(vec2 p){
    p = abs(p);
    float c = dot(p,normalize(vec2(1.,1.73)));
    c = max(c,p.x);
    return c;
    }

vec4 hexcoord(vec2 uv, float scale){

uv *= scale;
    vec2 ratio = vec2(1.,1.73);
    vec2 hratio = ratio/2.;
    vec2 gva = mod((uv ),ratio)-hratio;
    vec2 gvb = mod((uv - hratio),ratio)-hratio;

    vec2 gv;
    if (length(gva)< length(gvb)){
        gv=gva;
    }
    else{
        gv=gvb;}
    float x = atan(gv.x,gv.y);
    float y = .5 - hexDist(gv);
    vec2 id = uv -gv;
    return vec4(x,y,id.x,id.y);

}

void main(){

    vec2 uv = (gl_FragCoord.xy /( u_resolution.xy));
    uv -= .5;
    uv.x *= u_resolution.x/u_resolution.y;
    float scale = 7.;


    vec3 color = vec3(0.);

    float slay = hexDist(uv);
    // color = vec3(slay);
    vec4 dlsu = hexcoord(uv,4.);
    color.r = step(.1,dlsu.y);



    gl_FragColor = vec4(color,1.);
}