import { Camera, Mesh, Program, Renderer, Sphere, Transform } from "ogl";

// The hero's liquid glass drop. A sphere displaced by slow noise in the vertex shader, shaded as
// glass in the fragment shader: light bent through it from a soft studio environment, deeper color
// at the rim where the glass is thick, and crisp highlights on top. Loaded after the page is up
// (Blob.jsx). The frame at START_TIME is exported as the static image, so handing over from the
// image to the live drop shows no jump.
export const START_TIME = 123;

const vertex = /* glsl */ `
  attribute vec3 position;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uRipple;
  uniform vec2 uLean;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vObject;

  // 3D simplex noise (Ashima Arts / Stefan Gustavson, MIT).
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  // How far the surface moves along direction p: slow morphing, a lean toward the pointer, and a
  // ripple that runs across the drop when the pointer moves fast.
  float displacement(vec3 p) {
    // The noise is so wide that small steps in time move the whole shape, so time runs very slowly.
    float t = uTime * 0.3;
    float a = t * 0.04;
    vec3 q = vec3(p.x * cos(a) - p.z * sin(a), p.y, p.x * sin(a) + p.z * cos(a));
    float d = snoise(q * 0.46 + vec3(0.0, 0.0, t * 0.07)) * 0.24;
    d += snoise(q * 0.9 + vec3(t * 0.05, -t * 0.04, 4.0)) * 0.035;
    float pull = length(uLean);
    if (pull > 0.001) {
      vec3 toward = normalize(vec3(uLean, 0.45));
      // A wide, smooth lobe with no edge, so leaning can't crease the surface.
      float k = 0.5 + 0.5 * dot(p, toward);
      d += k * k * k * pull * 0.17;
      d += sin(dot(p, toward) * 6.0 - uTime * 11.0) * uRipple * 0.016 * k;
    }
    return d;
  }
  vec3 surface(vec3 p) { return p * (1.0 + displacement(p)); }

  void main() {
    vec3 p = normalize(position);
    vec3 s = surface(p);
    // The normal, from two nearby points on the moved surface.
    vec3 helper = abs(p.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
    vec3 a = normalize(cross(p, helper));
    vec3 b = cross(p, a);
    float e = 0.02;
    vec3 sa = surface(normalize(p + a * e));
    vec3 sb = surface(normalize(p + b * e));
    vec3 n = normalize(cross(sb - s, sa - s));
    if (dot(n, p) < 0.0) n = -n;
    vec4 view = modelViewMatrix * vec4(s, 1.0);
    vNormal = mat3(modelViewMatrix) * n;
    vView = view.xyz;
    vObject = s;
    gl_Position = projectionMatrix * view;
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  uniform float uDark;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vView;
  varying vec3 vObject;

  const vec3 INDIGO = vec3(0.263, 0.220, 0.792);
  const vec3 LIGHT = vec3(0.506, 0.549, 0.973);
  const vec3 LAVENDER = vec3(0.890, 0.878, 1.000);
  const vec3 DEEP = vec3(0.115, 0.085, 0.470);

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(-vView);
    float facing = clamp(dot(N, V), 0.0, 1.0);
    float edge = 1.0 - facing;

    // Looking through a glass drop works like a lens: the view bends hard, so the world turns upside
    // down. The top of the drop shows the deep floor, the bottom shows gathered light.
    vec3 bent = normalize(-V * 0.32 - N);
    float h = bent.y * 0.5 + 0.5;
    h += 0.05 * sin(vObject.x * 1.5 + uTime * 0.13) + 0.04 * sin(vObject.y * 2.1 - uTime * 0.1);
    vec3 body = mix(INDIGO, LIGHT, smoothstep(0.16, 0.56, h));
    body = mix(body, LAVENDER, smoothstep(0.5, 0.86, h));

    // Thin in the middle, so more white comes through; thick at the rim, so the color runs deep.
    float thin = smoothstep(0.5, 1.0, facing);
    body = mix(body, mix(body, vec3(1.0), 0.34), thin * thin);
    body = mix(body, mix(INDIGO, DEEP, 0.25), pow(edge, 3.0) * 0.86);

    // Light gathered by the lens: a fine crescent just inside the lower rim.
    float band = smoothstep(0.5, 0.74, edge) * (1.0 - smoothstep(0.76, 0.93, edge));
    float crescent = band * smoothstep(0.05, -0.7, N.y) * smoothstep(-0.9, 0.2, N.x + 0.25);

    // The skin: a soft window with a falloff (never a flat white shape), a wide sheen around it,
    // and a thin bright line at the very edge.
    vec3 R = reflect(-V, N);
    vec3 L = normalize(vec3(-0.5, 0.68, 0.54));
    float toLight = max(dot(R, L), 0.0);
    float window = smoothstep(0.86, 1.0, toLight);
    window *= window;
    float sheen = pow(toLight, 7.0);
    float fresnel = pow(edge, 6.0);
    vec3 color = body;
    color = mix(color, vec3(1.0), sheen * 0.3);
    color = mix(color, vec3(1.0), window * 0.82);
    color = mix(color, vec3(0.93, 0.93, 1.0), crescent * 0.72);
    color += LAVENDER * fresnel * 0.55;

    // Dark mode: deeper body, brighter light.
    vec3 night = body * body * vec3(0.62, 0.62, 0.95);
    night = mix(night, LIGHT, sheen * 0.3);
    night = mix(night, vec3(0.94, 0.95, 1.0), window * 0.86);
    night = mix(night, vec3(0.74, 0.77, 1.0), crescent * 0.85);
    night += LIGHT * fresnel * 1.2 + LIGHT * pow(edge, 2.4) * 0.16;
    color = mix(color, night, uDark);

    // White shows through the thin middle in light mode; on black the drop stays dense.
    float alpha = mix(mix(0.9, 1.0, smoothstep(0.0, 0.45, edge + window)), 1.0, uDark);
    gl_FragColor = vec4(color * alpha, alpha);
  }
`;

export function createBlob(canvas, { dark = false, lowPower = false, preserve = false } = {}) {
  const renderer = new Renderer({
    canvas,
    alpha: true,
    premultipliedAlpha: true,
    antialias: true,
    depth: true,
    dpr: 1,
    preserveDrawingBuffer: preserve,
    powerPreference: lowPower ? "low-power" : "default",
  });
  const { gl } = renderer;
  gl.clearColor(0, 0, 0, 0);

  const camera = new Camera(gl, { fov: 28, near: 0.1, far: 20 });
  camera.position.set(0, 0, 6.4);
  const scene = new Transform();
  const geometry = lowPower ? new Sphere(gl, { widthSegments: 96, heightSegments: 72 }) : new Sphere(gl, { widthSegments: 192, heightSegments: 140 });
  const uniforms = { uTime: { value: START_TIME }, uDark: { value: dark ? 1 : 0 }, uLean: { value: [0, 0] }, uRipple: { value: 0 } };
  const program = new Program(gl, { vertex, fragment, uniforms, transparent: true, cullFace: gl.BACK, depthTest: true });
  const mesh = new Mesh(gl, { geometry, program });
  mesh.setParent(scene);

  const resize = (size, dpr) => {
    renderer.dpr = dpr;
    renderer.setSize(size, size);
    camera.perspective({ aspect: 1 });
  };
  const render = () => renderer.render({ scene, camera });

  return { gl, uniforms, resize, render, destroy: () => gl.getExtension("WEBGL_lose_context")?.loseContext() };
}

// The running drop. Phones and low-power devices draw fewer pixels at 30fps. If a device still can't
// keep up, it drops resolution once, then stops on the current frame instead of hurting the page.
export function runBlob(canvas, { dark, lowPower, size, onFirstFrame, onContextLost }) {
  const blob = createBlob(canvas, { dark, lowPower });
  const { uniforms } = blob;
  const device = window.devicePixelRatio || 1;
  let dpr = Math.min(device, lowPower ? 1.5 : 2);
  let cssSize = size;
  blob.resize(cssSize, dpr);

  let raf = 0;
  let active = false;
  let frozen = false;
  let first = true;
  let last = 0;
  let drawn = 0;
  let time = START_TIME;
  let darkTarget = dark ? 1 : 0;
  // Pointer lean: a soft spring toward the pointer. Ripple: kicked by fast moves, then dies away.
  const target = [0, 0];
  const lean = [0, 0];
  const velocity = [0, 0];
  let ripple = 0;
  // Quality watch: frames over budget, measured in windows.
  const budget = lowPower ? 48 : 30;
  let spent = 0;
  let counted = 0;

  const frame = (now) => {
    raf = requestAnimationFrame(frame);
    const elapsed = now - last;
    if (lowPower && elapsed < 30) return;
    last = now;
    const dt = Math.min(elapsed / 1000, 0.05);
    time += dt;

    for (const i of [0, 1]) {
      velocity[i] += (target[i] - lean[i]) * 16 * dt;
      velocity[i] *= Math.exp(-5.5 * dt);
      lean[i] += velocity[i] * dt;
    }
    ripple *= Math.exp(-1.5 * dt);
    uniforms.uTime.value = time;
    uniforms.uLean.value = lean;
    uniforms.uRipple.value = ripple;
    uniforms.uDark.value += (darkTarget - uniforms.uDark.value) * Math.min(dt * 8, 1);
    blob.render();

    if (first) {
      first = false;
      requestAnimationFrame(onFirstFrame);
    }
    if (++drawn > 20 && elapsed < 500) {
      spent += elapsed;
      if (++counted === 40) {
        if (spent / counted > budget) {
          if (dpr > 1) {
            dpr = 1;
            blob.resize(cssSize, dpr);
          } else {
            frozen = true;
            setActive(false);
          }
        }
        spent = 0;
        counted = 0;
      }
    }
  };

  function setActive(on) {
    const run = on && !frozen;
    if (run === active) return;
    active = run;
    if (run) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    } else cancelAnimationFrame(raf);
  }

  canvas.addEventListener("webglcontextlost", (e) => {
    e.preventDefault();
    frozen = true;
    setActive(false);
    onContextLost();
  });

  return {
    setActive,
    setDark: (on) => {
      darkTarget = on ? 1 : 0;
      if (!active && !first) {
        uniforms.uDark.value = darkTarget;
        blob.render();
      }
    },
    setSize: (next) => {
      cssSize = next;
      blob.resize(cssSize, dpr);
      if (!active && !first) blob.render();
    },
    setPointer: (x, y, speed) => {
      target[0] = x;
      target[1] = y;
      ripple = Math.max(ripple, Math.min(speed, 1));
    },
    destroy: () => {
      setActive(false);
      blob.destroy();
    },
  };
}
