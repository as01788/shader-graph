import { ShaderNode } from "../../../base";

export default class VoronoiNode extends ShaderNode {

    generateCode(): string {
        let uv = this.getInputValue(0);
        let angle = this.getInputValue(1);
        let cell = this.getInputValue(2);

        let data = `
            vec2 uvc = v_uv * ${cell};
            vec2 g = floor(uvc);
            vec2 f = frac(uvc);
            float t = 8.0;
            vec3 res = vec3(8.0,.0,.0);
            float x = .0;
            float y = .0;
            for(float y=-1.;y<=1.;y++){
                for(float x=-1.;x<=1.;x++){
                    vec2 lattice = vec2(x,y);

                    mat2 m = mat2(15.27,47.63,99.41,89.98);
                    vec2 o = (lattice+g) * m;
                    float f1 = sin(o.x);
                    float f2 = sin(o.y);
                    lattice = frac(vec2(f1,f2)*46839.32);

                    vec2 offset = vec2(sin(lattice.y*+${angle})*0.5+0.5,cos(lattice.x*${angle})*0.5+0.5);
                    float d = distance(lattice + ${angle},f);
                    if(d < res.x){
                        res = vec3(d,offset.x,offset.y);
                        x = res.x;
                        y = res.y;
                    }
                }
            }
        `;

        return data;
    }
}