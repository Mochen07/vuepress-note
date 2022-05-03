import{r as t,o as u,a as r,b as n,e,w as o,F as p,d as s,c as i}from"./app.d2296390.js";import{_ as k}from"./plugin-vue_export-helper.21dcd24c.js";var b="/images/guide/github-actions.jpg";const m={},d=n("h1",{id:"github-actions",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#github-actions","aria-hidden":"true"},"#"),s(" Github Actions")],-1),h=n("h2",{id:"\u4ECB\u7ECD",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u4ECB\u7ECD","aria-hidden":"true"},"#"),s(" \u4ECB\u7ECD")],-1),_=s("github\u63D0\u4F9B\u7684\u9759\u6001\u9875\u9762\u90E8\u7F72\uFF0C\u7814\u7A76\u4E86\u4E00\u6CE2\u3002\u5E72\u8D27\u53EF\u4EE5\u53C2\u8003"),g={href:"http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html",target:"_blank",rel:"noopener noreferrer"},y=s("\u962E\u4E00\u5CF0"),f=s("\u5148\u751F\u7684\u6587\u6863\u6216\u8005\u53BB"),w={href:"https://github.com/features/actions",target:"_blank",rel:"noopener noreferrer"},v=s("github\u5B98\u65B9\u6587\u6863"),E=s("\u4E86\u89E3\u3002\u672C\u6587\u7AE0\u53EA\u7C97\u66B4\u7684\u5B9E\u73B0\u4E86\u529F\u80FD\u3002"),C=i('<h3 id="\u7B2C\u4E00\u6B65" tabindex="-1"><a class="header-anchor" href="#\u7B2C\u4E00\u6B65" aria-hidden="true">#</a> \u7B2C\u4E00\u6B65</h3><p><img src="'+b+`" alt="\u5165\u53E3"></p><ol><li><p><strong>\u751F\u6210\u79C1\u94A5(\u5982\u4E0A\u56FE1)</strong>\uFF1A<code>Settings</code> -&gt; <code>Developer settings</code> -&gt; <code>Personal access tokens</code> -&gt; \u70B9\u51FB<code>Generate new token</code>\u3002\uFF08\u521B\u5EFA\u7684\u65F6\u5019<code>\u52FE\u4E0Aworkflow</code>\u5373\u53EF\uFF09</p></li><li><p><strong>\u5C06\u79C1\u94A5\u5B58\u50A8\u5230\u5F53\u524D\u4ED3\u5E93(\u5982\u4E0A\u56FE2)</strong>\uFF1A<code>Settings</code> -&gt; <code>Secrets</code> -&gt; <code>Actions</code> -&gt; \u70B9\u51FB<code>New repository secret</code></p></li><li><p><strong>\u70B9\u5F00Actions(\u5982\u4E0A\u56FE3)</strong>\uFF1A\u70B9\u51FB<code>set up a workflow yourself</code>\u3002\uFF08\u6587\u4EF6\u4F4D\u7F6E\u4E3A\u9879\u76EE\uFF1Agithub-&gt;workflows-&gt;xx.yml\u3002\u76F4\u63A5\u521B\u5EFA\u4E5F\u884C\u3002\uFF09</p></li><li><p>\u5728\u9879\u76EE\u91CC\u9762\u7684<code>package.json</code>\uFF0C\u6DFB\u52A0\u5982\u4E0B\u5B57\u6BB5\uFF1A</p></li></ol><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token property">&quot;homepage&quot;</span><span class="token operator">:</span> <span class="token string">&quot;https://[username].github.io/github-actions-demo&quot;</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br></div></div><h3 id="\u7B2C\u4E8C\u6B65" tabindex="-1"><a class="header-anchor" href="#\u7B2C\u4E8C\u6B65" aria-hidden="true">#</a> \u7B2C\u4E8C\u6B65</h3>`,5),x=s("\u7F16\u5199yml "),A={href:"https://github.com/Mochen07/vuepress-note/tree/master/.github/workflows/ci",target:"_blank",rel:"noopener noreferrer"},I=s("\u6E90\u7801"),N=s("\u3002"),S={href:"https://github.com/ruanyf/github-actions-demo/blob/master/.github/workflows/ci.yml",target:"_blank",rel:"noopener noreferrer"},B=s("\u53C2\u8003"),j=n("div",{class:"language-yaml ext-yml line-numbers-mode"},[n("pre",{class:"language-yaml"},[n("code",null,[n("span",{class:"token key atrule"},"name"),n("span",{class:"token punctuation"},":"),s(` vuepress github actions
`),n("span",{class:"token key atrule"},"on"),n("span",{class:"token punctuation"},":"),s(`
  `),n("span",{class:"token key atrule"},"push"),n("span",{class:"token punctuation"},":"),s(`
    `),n("span",{class:"token key atrule"},"branches"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(` master
`),n("span",{class:"token key atrule"},"jobs"),n("span",{class:"token punctuation"},":"),s(`
  `),n("span",{class:"token key atrule"},"build-and-deploy"),n("span",{class:"token punctuation"},":"),s(`
    `),n("span",{class:"token key atrule"},"runs-on"),n("span",{class:"token punctuation"},":"),s(" ubuntu"),n("span",{class:"token punctuation"},"-"),s(`latest
    `),n("span",{class:"token key atrule"},"steps"),n("span",{class:"token punctuation"},":"),s(`
    `),n("span",{class:"token punctuation"},"-"),s(),n("span",{class:"token key atrule"},"name"),n("span",{class:"token punctuation"},":"),s(` Checkout
      `),n("span",{class:"token key atrule"},"uses"),n("span",{class:"token punctuation"},":"),s(` actions/checkout@v2
      `),n("span",{class:"token key atrule"},"with"),n("span",{class:"token punctuation"},":"),s(`
        `),n("span",{class:"token key atrule"},"persist-credentials"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token boolean important"},"false"),s(`
    `),n("span",{class:"token punctuation"},"-"),s(),n("span",{class:"token key atrule"},"name"),n("span",{class:"token punctuation"},":"),s(` Install and Build
      `),n("span",{class:"token key atrule"},"run"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token punctuation"},"|"),n("span",{class:"token scalar string"},`
        yarn install
        yarn run build`),s(`
    `),n("span",{class:"token punctuation"},"-"),s(),n("span",{class:"token key atrule"},"name"),n("span",{class:"token punctuation"},":"),s(` Deploy
      `),n("span",{class:"token key atrule"},"uses"),n("span",{class:"token punctuation"},":"),s(" JamesIves/github"),n("span",{class:"token punctuation"},"-"),s("pages"),n("span",{class:"token punctuation"},"-"),s("deploy"),n("span",{class:"token punctuation"},"-"),s(`action@releases/v3
      `),n("span",{class:"token key atrule"},"with"),n("span",{class:"token punctuation"},":"),s(`
        `),n("span",{class:"token key atrule"},"ACCESS_TOKEN"),n("span",{class:"token punctuation"},":"),s(" $"),n("span",{class:"token punctuation"},"{"),n("span",{class:"token punctuation"},"{"),s(" secrets.ACCESS_TOKEN "),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},"}"),s(`
        `),n("span",{class:"token key atrule"},"BRANCH"),n("span",{class:"token punctuation"},":"),s(" gh"),n("span",{class:"token punctuation"},"-"),s(`pages
        `),n("span",{class:"token key atrule"},"FOLDER"),n("span",{class:"token punctuation"},":"),s(` docs/.vuepress/dist
`)])]),n("div",{class:"line-numbers"},[n("span",{class:"line-number"},"1"),n("br"),n("span",{class:"line-number"},"2"),n("br"),n("span",{class:"line-number"},"3"),n("br"),n("span",{class:"line-number"},"4"),n("br"),n("span",{class:"line-number"},"5"),n("br"),n("span",{class:"line-number"},"6"),n("br"),n("span",{class:"line-number"},"7"),n("br"),n("span",{class:"line-number"},"8"),n("br"),n("span",{class:"line-number"},"9"),n("br"),n("span",{class:"line-number"},"10"),n("br"),n("span",{class:"line-number"},"11"),n("br"),n("span",{class:"line-number"},"12"),n("br"),n("span",{class:"line-number"},"13"),n("br"),n("span",{class:"line-number"},"14"),n("br"),n("span",{class:"line-number"},"15"),n("br"),n("span",{class:"line-number"},"16"),n("br"),n("span",{class:"line-number"},"17"),n("br"),n("span",{class:"line-number"},"18"),n("br"),n("span",{class:"line-number"},"19"),n("br"),n("span",{class:"line-number"},"20"),n("br"),n("span",{class:"line-number"},"21"),n("br"),n("span",{class:"line-number"},"22"),n("br"),n("span",{class:"line-number"},"23"),n("br")])],-1),R=n("div",{class:"language-yaml ext-yml line-numbers-mode"},[n("pre",{class:"language-yaml"},[n("code",null,[n("span",{class:"token key atrule"},"name"),n("span",{class:"token punctuation"},":"),s(" vuepress github actions "),n("span",{class:"token comment"},"# \u8BBE\u7F6E\u5F53\u524Dworkflow\u7684\u540D\u79F0\u3002\u5982\u679C\u5FFD\u7565\u9ED8\u8BA4\u4E3Aworkflow\u7684\u6587\u4EF6\u540D\u3002"),s(`
`),n("span",{class:"token key atrule"},"on"),n("span",{class:"token punctuation"},":"),s(`
  `),n("span",{class:"token key atrule"},"push"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token comment"},"# \u89E6\u53D1\u65B9\u5F0F"),s(`
    `),n("span",{class:"token key atrule"},"branches"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(" master "),n("span",{class:"token comment"},"# \u89E6\u53D1\u5206\u652F\u540D\u79F0"),s(`
`),n("span",{class:"token key atrule"},"jobs"),n("span",{class:"token punctuation"},":"),s(`
  `),n("span",{class:"token key atrule"},"build-and-deploy"),n("span",{class:"token punctuation"},":"),s(`
    `),n("span",{class:"token key atrule"},"runs-on"),n("span",{class:"token punctuation"},":"),s(" ubuntu"),n("span",{class:"token punctuation"},"-"),s("latest "),n("span",{class:"token comment"},"# \u8FD0\u884C\u5728\u865A\u62DF\u673A\u73AF\u5883ubuntu-latest"),s(`
    `),n("span",{class:"token key atrule"},"steps"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token comment"},"# job\u6B65\u9AA4"),s(`
    `),n("span",{class:"token punctuation"},"-"),s(),n("span",{class:"token key atrule"},"name"),n("span",{class:"token punctuation"},":"),s(" Checkout "),n("span",{class:"token comment"},"# \u7B2C\u4E00\u6B65\u83B7\u53D6\u6E90\u7801"),s(`
      `),n("span",{class:"token key atrule"},"uses"),n("span",{class:"token punctuation"},":"),s(" actions/checkout@v2 "),n("span",{class:"token comment"},"# \u4F7F\u7528\u7684action\u662Factions/checkout@v2"),s(`
      `),n("span",{class:"token key atrule"},"with"),n("span",{class:"token punctuation"},":"),s(`
        `),n("span",{class:"token key atrule"},"persist-credentials"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token boolean important"},"false"),s(),n("span",{class:"token comment"},"# If you're using actions/checkout@v2 you must set persist-credentials to false in most cases for the deployment to work correctly."),s(`
    `),n("span",{class:"token punctuation"},"-"),s(),n("span",{class:"token key atrule"},"name"),n("span",{class:"token punctuation"},":"),s(" Install and Build "),n("span",{class:"token comment"},"# \u7B2C\u4E8C\u6B65\u6784\u5EFA\u811A\u672C"),s(`
      `),n("span",{class:"token key atrule"},"run"),n("span",{class:"token punctuation"},":"),s(),n("span",{class:"token punctuation"},"|"),n("span",{class:"token scalar string"},`
        yarn install
        yarn run build`),s(`
    `),n("span",{class:"token punctuation"},"-"),s(),n("span",{class:"token key atrule"},"name"),n("span",{class:"token punctuation"},":"),s(" Deploy "),n("span",{class:"token comment"},"# \u7B2C\u4E09\u6B65\u90E8\u7F72"),s(`
      `),n("span",{class:"token key atrule"},"uses"),n("span",{class:"token punctuation"},":"),s(" JamesIves/github"),n("span",{class:"token punctuation"},"-"),s("pages"),n("span",{class:"token punctuation"},"-"),s("deploy"),n("span",{class:"token punctuation"},"-"),s("action@releases/v3 "),n("span",{class:"token comment"},"# \u4F7F\u7528\u7684action\u662FJamesIves/github-pages-deploy-action@releases/v3"),s(`
      `),n("span",{class:"token key atrule"},"with"),n("span",{class:"token punctuation"},":"),s(`
        `),n("span",{class:"token key atrule"},"ACCESS_TOKEN"),n("span",{class:"token punctuation"},":"),s(" $"),n("span",{class:"token punctuation"},"{"),n("span",{class:"token punctuation"},"{"),s(" secrets.ACCESS_TOKEN "),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token comment"},"# github \u5BC6\u94A5"),s(`
        `),n("span",{class:"token key atrule"},"BRANCH"),n("span",{class:"token punctuation"},":"),s(" gh"),n("span",{class:"token punctuation"},"-"),s("pages "),n("span",{class:"token comment"},"# \u53D1\u5E03\u5206\u652F"),s(`
        `),n("span",{class:"token key atrule"},"FOLDER"),n("span",{class:"token punctuation"},":"),s(" docs/.vuepress/dist "),n("span",{class:"token comment"},"# \u6784\u5EFA\u6210\u679C\u6240\u5728\u76EE\u5F55\u3002vue\u9879\u76EE\u901A\u5E38\u662Fdist"),s(`
`)])]),n("div",{class:"line-numbers"},[n("span",{class:"line-number"},"1"),n("br"),n("span",{class:"line-number"},"2"),n("br"),n("span",{class:"line-number"},"3"),n("br"),n("span",{class:"line-number"},"4"),n("br"),n("span",{class:"line-number"},"5"),n("br"),n("span",{class:"line-number"},"6"),n("br"),n("span",{class:"line-number"},"7"),n("br"),n("span",{class:"line-number"},"8"),n("br"),n("span",{class:"line-number"},"9"),n("br"),n("span",{class:"line-number"},"10"),n("br"),n("span",{class:"line-number"},"11"),n("br"),n("span",{class:"line-number"},"12"),n("br"),n("span",{class:"line-number"},"13"),n("br"),n("span",{class:"line-number"},"14"),n("br"),n("span",{class:"line-number"},"15"),n("br"),n("span",{class:"line-number"},"16"),n("br"),n("span",{class:"line-number"},"17"),n("br"),n("span",{class:"line-number"},"18"),n("br"),n("span",{class:"line-number"},"19"),n("br"),n("span",{class:"line-number"},"20"),n("br"),n("span",{class:"line-number"},"21"),n("br"),n("span",{class:"line-number"},"22"),n("br"),n("span",{class:"line-number"},"23"),n("br")])],-1),D=n("h3",{id:"\u603B\u7ED3",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u603B\u7ED3","aria-hidden":"true"},"#"),s(" \u603B\u7ED3")],-1),G=s("\u6839\u636E\u4E0A\u9762\u4E24\u4E2A\u6B65\u9AA4\uFF0C\u7ECF\u8FC7\u7279\u5B9A\u7684\u5206\u652F\u89E6\u53D1github actions\u6784\u5EFA\u5B8C\u6210\u4E4B\u540E\uFF0C\u5F97\u5230\u4E00\u4E2A"),K={href:"https://mochen07.github.io/vuepress-note/",target:"_blank",rel:"noopener noreferrer"},O=s("\u9875\u9762"),T=s("\u5C31\u53EF\u4EE5\u8BBF\u95EE\u5566\u3002\u64CD\u4F5C\u8FC7\u7A0B\u4E2D\u9047\u5230\u5982\u4E0B\u95EE\u9898\uFF1A"),q=s("github pages\u6837\u5F0F\u4E22\u5931\u3002\u53C2\u8003"),F={href:"https://v2.vuepress.vuejs.org/zh/reference/config.html#%E7%AB%99%E7%82%B9%E9%85%8D%E7%BD%AE",target:"_blank",rel:"noopener noreferrer"},L=s("\u6587\u6863"),V=s("\u89E3\u51B3"),J=s("workflow \u6587\u4EF6\u722C\u5751\uFF0C\u5DF2\u589E\u52A0\u76F8\u5173\u5907\u6CE8REMARK\u3002\u53EF\u53C2\u7167"),M={href:"https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html",target:"_blank",rel:"noopener noreferrer"},H=s("\u962E\u4E00\u5CF0"),$=s("\u7684[workflow \u6587\u4EF6]"),z={class:"custom-container tip"},P=n("p",{class:"custom-container-title"},"\u63D0\u793A",-1),Q=s("\u672C\u6587\u7AE0\u9971\u8179\uFF0C\u4F46\u4E0D"),U={href:"https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html",target:"_blank",rel:"noopener noreferrer"},W=s("\u8425\u517B"),X=s("\u3002");function Y(Z,nn){const a=t("ExternalLinkIcon"),c=t("CodeGroupItem"),l=t("CodeGroup");return u(),r(p,null,[d,h,n("p",null,[_,n("a",g,[y,e(a)]),f,n("a",w,[v,e(a)]),E]),C,n("blockquote",null,[n("p",null,[x,n("a",A,[I,e(a)]),N,n("a",S,[B,e(a)])])]),e(l,null,{default:o(()=>[e(c,{title:"INIT",active:""},{default:o(()=>[j]),_:1}),e(c,{title:"REMARK"},{default:o(()=>[R]),_:1})]),_:1}),D,n("p",null,[G,n("a",K,[O,e(a)]),T]),n("ol",null,[n("li",null,[n("p",null,[q,n("a",F,[L,e(a)]),V])]),n("li",null,[n("p",null,[J,n("a",M,[H,e(a)]),$])])]),n("div",z,[P,n("p",null,[Q,n("a",U,[W,e(a)]),X])])],64)}var an=k(m,[["render",Y]]);export{an as default};
