import type { SystemCase } from "@/content/systems/types";
export function SocialCard({system}: {system?: SystemCase}) {
  const accent=system?.accent==="blue"?"#a7c8dc":system?.accent==="green"?"#bfd2ad":"#edaa79";
  return <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",background:"#111515",color:"#f0f0e9",padding:60,fontFamily:"sans-serif",position:"relative"}}>
    <div style={{display:"flex",justifyContent:"space-between",fontSize:20,letterSpacing:3,color:"#a6b0ab"}}><span>THE BUILD ROOM / V2</span><span>EDUARDO MERINO</span></div>
    <div style={{display:"flex",flexDirection:"column",gap:22,maxWidth:960}}><div style={{display:"flex",fontSize:22,color:accent,letterSpacing:2}}>{system?.category.toUpperCase()??"SOFTWARE SYSTEMS & APPLIED AI"}</div><div style={{display:"flex",fontSize:system?80:72,lineHeight:1.05,letterSpacing:-4,maxWidth:930}}>{system?.name??"Complex problems. Working systems."}</div><div style={{display:"flex",fontSize:31,lineHeight:1.4,color:"#c4ccc7",maxWidth:950}}>{system?.summary??"I turn complex real-world problems into software systems that work."}</div></div>
    <div style={{display:"flex",alignItems:"center",gap:20,borderTop:"1px solid #35403c",paddingTop:24,color:accent,fontSize:19}}>{(system?.path??["Understand","Structure","Build","Verify"]).map((step,i)=><div key={step} style={{display:"flex",alignItems:"center",gap:16}}><div style={{width:18,height:18,background:i===3?accent:"#28342e",border:`1px solid ${accent}`,display:"flex"}}/>{step}{i<3&&<span style={{color:"#65756b",marginLeft:8}}>→</span>}</div>)}</div>
  </div>;
}
