import{w as h,B as i}from"./button-DW2OhPK9.js";import{l as e,q as p,r as c,t as d}from"./chunk-SYFQ2XB5-DqPEAYc-.js";import{c as g,C as u,a as j,b as N,T as f,S as b,D as v}from"./card-CKSfeZTm.js";/**
 * @license lucide-react v0.471.2 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]],m=g("ArrowLeft",y),k=({children:r,className:t="",variant:a="default"})=>{const n="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",l={default:"bg-purple-100 text-purple-800",secondary:"bg-gray-100 text-gray-800"};return e.jsx("span",{className:`${n} ${l[a]} ${t}`,children:r})};function w(r){const t=r.command.split(" "),a=t[0],n=t.slice(1);return`goose://extension?${[`cmd=${encodeURIComponent(a)}`,...n.map(s=>`arg=${encodeURIComponent(s)}`),`description=${encodeURIComponent(r.description)}`,...r.environmentVariables.filter(s=>s.required).map(s=>`env=${encodeURIComponent(`${s.name}=${s.description}`)}`)].join("&")}`}const I=h(function(){const{id:t}=p(),[a,n]=c.useState(null);c.useState(!0);const l="https://block.github.io/goose/v1/extensions/servers.json";return c.useEffect(()=>{fetch(l).then(s=>s.json()).then(s=>{const o=s.find(x=>x.id===t);o&&n(o)})},[t]),a?e.jsx("div",{className:"container mx-auto",children:e.jsxs("div",{className:"flex gap-8 max-w-5xl mx-auto",children:[e.jsx("div",{children:e.jsx(d,{to:"/",children:e.jsxs(i,{className:"flex items-center gap-2",children:[e.jsx(m,{className:"h-4 w-4"}),"Back"]})})}),e.jsxs(u,{className:"p-8 w-full",children:[e.jsx(j,{className:"flex items-center",children:e.jsx("div",{className:"flex items-center gap-2",children:e.jsx("h1",{className:"font-medium text-5xl text-textProminent detail-page-server-name",children:a.name})})}),e.jsxs(N,{className:"space-y-6",children:[e.jsx("div",{children:e.jsx("p",{className:"text-xl text-textSubtle",children:a.description})}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-2 text-textStandard",children:[e.jsx(f,{className:"h-4 w-4"}),e.jsx("h4",{className:"font-medium",children:"Command"})]}),e.jsxs("code",{className:"block bg-gray-100 dark:bg-gray-900 p-2 rounded text-sm dark:text-gray-300",children:['goose session --with-extension "',a.command,'"']})]}),a.environmentVariables.length>0&&e.jsxs("div",{className:"space-y-4",children:[e.jsx("h2",{className:"text-lg font-medium dark:text-gray-300",children:"Environment Variables"}),e.jsx("div",{className:"",children:a.environmentVariables.map(s=>e.jsxs("div",{className:"border-b border-borderSubtle pb-4 mb-4 last:border-0",children:[e.jsx("div",{className:"text-sm dark:text-gray-300",children:s.name}),e.jsx("div",{className:"text-gray-600 dark:text-gray-400 text-sm mt-1",children:s.description}),s.required&&e.jsx(k,{variant:"secondary",className:"mt-2",children:"Required"})]},s.name))})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400",children:[e.jsx(b,{className:"h-4 w-4"}),e.jsxs("span",{children:[a.githubStars," on Github"]})]}),e.jsx("a",{href:w(a),target:"_blank",rel:"noopener noreferrer",className:"no-underline",children:e.jsxs(i,{size:"icon",variant:"link",className:"group/download flex items-center justify-center text-xs leading-[14px] text-textSubtle px-0 transition-all",title:"Install with Goose",children:[e.jsx("span",{children:"Install"}),e.jsx(v,{className:"h-4 w-4 ml-2 group-hover/download:text-[#FA5204]"})]})})]})]})]})]})}):e.jsxs("div",{className:"max-w-4xl mx-auto",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-6",children:[e.jsx(d,{to:"/",children:e.jsxs(i,{className:"",children:[e.jsx(m,{className:"h-4 w-4"}),"Back"]})}),e.jsxs("div",{className:"text-sm text-gray-500 dark:text-gray-400",children:[e.jsx(d,{to:"/",className:"hover:text-accent dark:hover:text-accent/90",children:"Goose Extensions"})," ","/"]})]}),e.jsxs("div",{className:"animate-pulse",children:[e.jsx("div",{className:"h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"}),e.jsx("div",{className:"h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"}),e.jsx("div",{className:"h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"})]})]})});export{I as default};
