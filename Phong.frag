precision highp float;
uniform vec2 u_resolution;

varying vec4 v_normal;

void main() {

    vec2 uv = gl_FragCoord.xy / u_resolution;
    
    //      lighting
    vec3 lighting = vec3(0.);

    //  ambientlight
    vec3 ambientLight = vec3 (.5);
    lighting = ambientLight;

    //  diffuse (lambertian?) lighitng

    //get normal
    vec3 normal = normalize(v_normal.xyz);
    //get light color and source
    vec3 lightColor = vec3(1.);
    vec3 lightSource = vec3(1.,0.,1.);
    //get the dot product of the normal and the light source to see how bright something should be based on how the vectors are aligned
    float diffuseStrength = max(0.0,dot(lightSource,normal));
    //multiply by color to get vec3 for lighting and also to have color
    vec3 diffuse = diffuseStrength * lightColor;

    lighting = ambientLight * 0. + diffuse;

    //  Specular lighting

    vec3 cameraSource = vec3(0.,0.,1.);
    vec3 viewSource = vec3(normalize(cameraSource));
    vec3 reflectSource = normalize(reflect(-lightSource,normal));

    float specularStrength = max(0.,dot(viewSource,reflectSource));
    specularStrength = pow(specularStrength,64.);
    vec3 specular = lightColor * specularStrength;

    lighting = specular;

    //model color and lighting applied
    vec3 modelColor = vec3 (0.5);
    vec3 color = modelColor * lighting;
    gl_FragColor = vec4(color,1.);

}