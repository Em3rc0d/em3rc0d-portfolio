import { AmbientLight, BoxGeometry, DirectionalLight, Group, Mesh, MeshStandardMaterial, OrthographicCamera, Scene, SRGBColorSpace, WebGLRenderer } from "three";
import { coreModules, scenePolicy } from "./core-model";

export interface SceneRuntime { attach(slot: HTMLElement | null): void; dispose(): void; }
type Quality = "BALANCED" | "LOW" | "STATIC";
export function createScene(host: HTMLDivElement): SceneRuntime {
  const canvas = document.createElement("canvas");
  // Probe before constructing Three.js so unsupported WebGL keeps a clean fallback.
  const context = canvas.getContext("webgl2", { alpha: true, antialias: true, powerPreference: "low-power" });
  if (!context) return { attach() { host.dataset.quality = "STATIC"; host.dataset.reason = "WEBGL_UNAVAILABLE"; }, dispose() {} };
  const renderer = new WebGLRenderer({ canvas, context, alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setClearColor(0x111515, 0);
  host.append(canvas);
  const scene = new Scene();
  const camera = new OrthographicCamera(-4.3,4.3,4.3,-4.3,.1,50);
  camera.position.set(7,5.4,7); camera.lookAt(0,0,0);
  const light = new DirectionalLight(0xf2eee3,4); light.position.set(2,7,4); scene.add(light);
  const rim = new DirectionalLight(0xb8d7ee,2); rim.position.set(-5,2,-3); scene.add(rim);
  scene.add(new AmbientLight(0xd5dfd5,1.6));
  const group = new Group(); scene.add(group);
  const geometry = new BoxGeometry(.93,.93,.93);
  const metal = new MeshStandardMaterial({ color: 0x74827b, metalness: .72, roughness: .32 });
  const alternate = new MeshStandardMaterial({ color: 0x9da79f, metalness: .65, roughness: .38 });
  const copper = new MeshStandardMaterial({ color: 0xe3a170, emissive: 0x6c3114, emissiveIntensity: .2, metalness: .6, roughness: .3 });
  const modules = coreModules.map(m => { const mesh = new Mesh(geometry,m.core ? copper : m.index % 3 === 0 ? alternate : metal); group.add(mesh); return {mesh,...m}; });
  let slot: HTMLElement | null = null;
  let frame = 0, start = 0, runningUntil = 0, slowFrames = 0, rendered = 0;
  let visible = false, lost = false, disposed = false;
  let quality: Quality = "BALANCED";
  let pointerX = 0, pointerY = 0, scrollProgress = 0;
  let currentX = 0, currentY = 0;
  let sizeKey = "";
  const resize = new ResizeObserver(() => position());
  const intersection = new IntersectionObserver(entries => { visible = entries.some(entry => entry.isIntersecting); if (visible) request(400); else cancel(); });
  function cancel() { cancelAnimationFrame(frame); frame = 0; }
  function position() {
    if (!slot || disposed) return;
    const rect = slot.getBoundingClientRect();
    host.style.transform = `translate(${rect.left}px,${rect.top}px)`;
    host.style.width = `${rect.width}px`; host.style.height = `${rect.height}px`;
    const dpr = quality === "LOW" ? 1 : Math.min(devicePixelRatio || 1, innerWidth < 768 ? scenePolicy.mobileDpr : scenePolicy.desktopDpr);
    const key = `${Math.round(rect.width)}:${Math.round(rect.height)}:${dpr}`;
    if (key !== sizeKey && rect.width > 0 && rect.height > 0) {
      sizeKey = key; renderer.setPixelRatio(dpr); renderer.setSize(rect.width,rect.height,false);
      const aspect = rect.width / rect.height; camera.left = -4.05*aspect; camera.right = 4.05*aspect; camera.top=4.05;camera.bottom=-4.05;camera.updateProjectionMatrix();
    }
    scrollProgress = Math.max(0,Math.min(1,-rect.top / Math.max(1,rect.height)));
    request(220);
  }
  function request(duration = 220) {
    if (!slot || !visible || document.hidden || lost || disposed || quality === "STATIC") return;
    runningUntil = Math.max(runningUntil,performance.now()+duration);
    if (!frame) frame = requestAnimationFrame(render);
  }
  function render(now: number) {
    frame=0;
    if (!slot || !visible || document.hidden || lost || disposed || quality === "STATIC") return;
    const before = performance.now();
    const progress = Math.min(1,(now-start)/scenePolicy.duration);
    const ease = 1-Math.pow(1-progress,3);
    const spread = 1+(1-ease)*.85;
    currentX += (pointerX-currentX)*.12; currentY += (pointerY-currentY)*.12;
    group.rotation.y = currentX*.13+scrollProgress*.1;
    group.rotation.x = currentY*.08;
    modules.forEach(m => { m.mesh.position.set(m.x*spread,m.y*spread,m.z*spread); });
    renderer.render(scene,camera);
    slot.dataset.sceneReady = "true"; host.style.opacity = "1"; host.dataset.quality = quality;
    host.dataset.triangles = String(renderer.info.render.triangles); host.dataset.drawCalls = String(renderer.info.render.calls); host.dataset.frames = String(++rendered); host.dataset.dpr=String(renderer.getPixelRatio());
    const cost = performance.now()-before; host.dataset.frameCostMs = cost.toFixed(2);
    slowFrames = cost > 28 ? slowFrames+1 : Math.max(0,slowFrames-1);
    if (slowFrames > 12) {
      slowFrames=0;
      if (quality === "BALANCED") { quality="LOW"; position(); }
      else { quality="STATIC"; slot.dataset.sceneReady="false"; host.style.opacity="0"; host.dataset.quality="STATIC"; return; }
    }
    if (now < runningUntil || progress < 1) frame=requestAnimationFrame(render);
  }
  const pointer = (event: PointerEvent) => {
    if (!slot || event.pointerType === "touch") return;
    const r=slot.getBoundingClientRect();
    if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) { if(!pointerX&&!pointerY)return;pointerX=pointerY=0; }
    else { pointerX=(event.clientX-r.left)/r.width-.5; pointerY=(event.clientY-r.top)/r.height-.5; }
    request(400);
  };
  const visibility = () => { if(document.hidden)cancel();else request(220); };
  const contextLost = (event: Event) => { event.preventDefault(); lost=true;cancel();if(slot)slot.dataset.sceneReady="false";host.style.opacity="0";host.dataset.quality="STATIC"; };
  const contextRestored = () => { lost=false;request(220); };
  window.addEventListener("scroll",position,{passive:true});window.addEventListener("resize",position);window.addEventListener("pointermove",pointer,{passive:true});document.addEventListener("visibilitychange",visibility);canvas.addEventListener("webglcontextlost",contextLost);canvas.addEventListener("webglcontextrestored",contextRestored);
  return {
    attach(next) { if(slot) {slot.dataset.sceneReady="false";resize.unobserve(slot);intersection.unobserve(slot);} cancel();slot=next;visible=false;host.style.opacity="0";if(next){ start=performance.now();runningUntil=start+scenePolicy.duration;resize.observe(next);intersection.observe(next);position(); } },
    dispose() { disposed=true;cancel();resize.disconnect();intersection.disconnect();window.removeEventListener("scroll",position);window.removeEventListener("resize",position);window.removeEventListener("pointermove",pointer);document.removeEventListener("visibilitychange",visibility);canvas.removeEventListener("webglcontextlost",contextLost);canvas.removeEventListener("webglcontextrestored",contextRestored);geometry.dispose();metal.dispose();alternate.dispose();copper.dispose();renderer.dispose();renderer.forceContextLoss();canvas.remove();if(slot)slot.dataset.sceneReady="false"; },
  };
}
