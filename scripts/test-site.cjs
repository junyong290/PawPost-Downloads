const {chromium}=require('playwright');
const fs=require('fs');const path=require('path');
const out=path.resolve(process.env.QA_OUTPUT||'artifacts/web');fs.mkdirSync(out,{recursive:true});
const base=process.env.SITE_URL||'http://127.0.0.1:4173/';
const checks=[];let browser;
function assert(condition,label){if(!condition)throw Error(label);checks.push(label);}
(async()=>{
 browser=await chromium.launch({...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{}),headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000}});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base,{waitUntil:'networkidle'});await page.screenshot({path:path.join(out,'desktop-hero.png')});
 for(const width of [1440,1024,768,390,320]){
  await page.setViewportSize({width,height:900});await page.evaluate(()=>scrollTo(0,0));
  for(let y=0;y<await page.evaluate(()=>document.documentElement.scrollHeight);y+=700){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(50);}
  await page.waitForTimeout(750);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No horizontal overflow at '+width+'px');
  await page.screenshot({path:path.join(out,`page-${width}.png`),fullPage:true});
 }
 await page.setViewportSize({width:1440,height:1000});await page.locator('#demo').scrollIntoViewIfNeeded();
 await page.locator('#play-demo').focus();await page.keyboard.press('Enter');assert(await page.locator('#demo').evaluate(el=>el.classList.contains('playing')),'Keyboard starts paw demo');
 await page.waitForTimeout(950);await page.screenshot({path:path.join(out,'paw-grab.png')});
 await page.keyboard.press('Escape');assert(!(await page.locator('#demo').evaluate(el=>el.classList.contains('playing'))),'Escape cancels demo and frees button');
 await page.evaluate(()=>{
  window.__fileReads=0;window.__networkSends=0;
  for(const key of ['text','arrayBuffer','stream']){Blob.prototype[key]=function(){window.__fileReads++;throw Error('File content read');};}
  for(const key of ['readAsText','readAsArrayBuffer','readAsDataURL','readAsBinaryString']){FileReader.prototype[key]=function(){window.__fileReads++;throw Error('File content read');};}
  window.fetch=()=>{window.__networkSends++;throw Error('Unexpected request');};XMLHttpRequest.prototype.send=function(){window.__networkSends++;throw Error('Unexpected request');};
  navigator.sendBeacon=()=>{window.__networkSends++;return false;};
  const data=new DataTransfer();data.items.add(new File(['synthetic only'],'<img src=x onerror=alert(1)>.txt'));data.items.add(new File(['synthetic only'],'한글 사진.zip'));
  document.querySelector('#demo').dispatchEvent(new DragEvent('drop',{dataTransfer:data,bubbles:true,cancelable:true}));
 });
 assert((await page.locator('#demo-filename').textContent()).includes('<img'),'Filename is text, not executable markup');
 assert(await page.locator('#demo-filesubtitle').textContent()==='외 1개 파일 · 미리보기','Multiple-file count preserved');
 await page.waitForTimeout(2400);assert(await page.evaluate(()=>window.__fileReads===0&&window.__networkSends===0),'Dropped file contents never read or sent');
 assert(await page.locator('#play-demo').isEnabled(),'Animation restores ready state');
 await page.emulateMedia({reducedMotion:'reduce'});await page.locator('#play-demo').click();
 assert(!(await page.locator('#demo').evaluate(el=>el.classList.contains('playing'))),'Reduced motion prevents playback');
 await page.locator('[data-pick="arm64"]').click();assert(await page.locator('[data-platform="arm64"]').evaluate(el=>el.classList.contains('is-chosen')),'M-series platform selector highlights correct download');
 await page.locator('a[href="#mac-help"]').click();assert(await page.locator('#mac-help').evaluate(el=>el.open),'Mac warning opens install guidance');
 await page.goto(new URL('privacy.html',base).href);assert((await page.locator('main').textContent()).includes('파일 내용을 읽지'),'Privacy page describes metadata-only demo');
 await page.goto(new URL('oauth-public-access.html',base).href);assert((await page.locator('main').textContent()).includes('한 개'),'OAuth page distinguishes one-account evidence from unlimited claim');
 const mobile=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});await mobile.goto(base,{waitUntil:'networkidle'});await mobile.locator('#play-demo').tap();assert(await mobile.locator('#demo').evaluate(el=>el.classList.contains('playing')),'Touch button starts same no-upload demo');
 await mobile.waitForTimeout(2400);await mobile.screenshot({path:path.join(out,'mobile-demo.png')});
 const nojs=await browser.newPage({javaScriptEnabled:false});await nojs.goto(base);assert(await nojs.locator('[data-download]').count()===3,'All three downloads available without JavaScript');
 await nojs.close();await mobile.close();await page.goto(base,{waitUntil:'networkidle'});
 try{
  const AxeBuilder=require('@axe-core/playwright').default;
  for(const width of [1440,390]){
   await page.setViewportSize({width,height:900});await page.emulateMedia({reducedMotion:'reduce'});const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
   fs.writeFileSync(path.join(out,`axe-${width}.json`),JSON.stringify(result,null,2));assert(result.violations.length===0,`WCAG automated audit at ${width}px: zero violations`);
  }
 }catch(e){if(e.code==='MODULE_NOT_FOUND')throw Error('Install axe-core before accepting QA');throw e;}
 assert(errors.length===0,'No browser JavaScript errors');
 fs.writeFileSync(path.join(out,'site-checks.json'),JSON.stringify({passed:true,atUtc:new Date().toISOString(),base,checks,errors},null,2));console.log(JSON.stringify({passed:true,checks:checks.length,output:out}));
})().catch(e=>{fs.writeFileSync(path.join(out,'site-checks.json'),JSON.stringify({passed:false,error:e.stack,checks},null,2));console.error(e);process.exitCode=1;}).finally(async()=>{if(browser)await browser.close();});
