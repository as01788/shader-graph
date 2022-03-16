import { ShaderNode } from "../../../base";

export default class ChannelMixerNode extends ShaderNode {

    generateCode(): string {
        let data = `
            float t = 0.0;
            float freq = pow(2.0, float(0));
            float amp = pow(0.5, float(3-0));
            t += unity_valueNoise(float2(UV.x*Scale/freq, UV.y*Scale/freq))*amp;

            freq = pow(2.0, float(1));
            amp = pow(0.5, float(3-1));
            t += unity_valueNoise(float2(UV.x*Scale/freq, UV.y*Scale/freq))*amp;

            freq = pow(2.0, float(2));
            amp = pow(0.5, float(3-2));
            t += unity_valueNoise(float2(UV.x*Scale/freq, UV.y*Scale/freq))*amp;

            Out = t;
        `;
        return data;
    }
}