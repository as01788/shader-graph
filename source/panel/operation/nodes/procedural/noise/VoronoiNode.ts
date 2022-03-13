import { ShaderNode } from "../../../base";

export default class VoronoiNode extends ShaderNode{

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
            for(int y=-1;y<=1;y++){
                for(int x=-1;x<=1;x++){
                    vec2 lattice = vec2(x,y);

                    vec4 m = vec4(15.27,47.63,99.41,89.98);
                    float frac1 = sin(mul(lattice+g,m))*46839.32;
                    lattice = frac(frac1);

                    vec2 offset = vec2(sin(lattice.y*+${angle})*0.5+0.5,cos(lattice.x*${angle})*0.5+0.5);
                    float d = distance(lattice + ${angle},f);
                    if(d < res.x){
                        res = vec3(d,offset.x,offset.y);
                        ${this.getOutputVarDefine(0)} = res.x;
                        ${this.getOutputVarDefine(1)} = res.y;
                    }
                }
            }
        `;

        return data;
    }
}