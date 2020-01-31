/*!
 *
 * js-audio-recorder - js audio recorder plugin
 *
 * @version v1.0.0
 * @homepage https://github.com/2fps/recorder
 * @author 2fps <echoweb@126.com> (https://www.zhuyuntao.cn)
 * @license MIT
 *
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Recorder=e():t.Recorder=e()}(this,function(){return function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){"use strict";function i(t,e,n){for(var i=0;i<n.length;i++)t.setUint8(e+i,n.charCodeAt(i))}Object.defineProperty(e,"__esModule",{value:!0}),e.compress=function(t,e,n){for(var i=e/n,o=Math.max(i,1),r=t.left,a=t.right,s=Math.floor((r.length+a.length)/i),u=new Float32Array(s),c=0,l=0;c<s;){var p=Math.floor(l);u[c]=r[p],c++,a.length&&(u[c]=a[p],c++),l+=o}return u},e.encodePCM=function(t,e,n){void 0===n&&(n=!0);var i=0,o=t.length*(e/8),r=new ArrayBuffer(o),a=new DataView(r);if(8===e)for(var s=0;s<t.length;s++,i++){var u=(c=Math.max(-1,Math.min(1,t[s])))<0?128*c:127*c;u=+u+128,a.setInt8(i,u)}else for(s=0;s<t.length;s++,i+=2){var c=Math.max(-1,Math.min(1,t[s]));a.setInt16(i,c<0?32768*c:32767*c,n)}return a},e.encodeWAV=function(t,e,n,o,r,a){void 0===a&&(a=!0);var s=n>e?e:n,u=r,c=new ArrayBuffer(44+t.byteLength),l=new DataView(c),p=o,f=0;i(l,f,"RIFF"),f+=4,l.setUint32(f,36+t.byteLength,a),i(l,f+=4,"WAVE"),i(l,f+=4,"fmt "),f+=4,l.setUint32(f,16,a),f+=4,l.setUint16(f,1,a),f+=2,l.setUint16(f,p,a),f+=2,l.setUint32(f,s,a),f+=4,l.setUint32(f,p*s*(u/8),a),f+=4,l.setUint16(f,p*(u/8),a),f+=2,l.setUint16(f,u,a),i(l,f+=2,"data"),f+=4,l.setUint32(f,t.byteLength,a),f+=4;for(var d=0;d<t.byteLength;)l.setUint8(f,t.getUint8(d)),f++,d++;return l}},function(t,e,n){"use strict";var i,o=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)});Object.defineProperty(e,"__esModule",{value:!0});var r=n(2),a=n(0),s=n(3),u=function(t){function e(e){void 0===e&&(e={});var n=t.call(this,e)||this;return n.isrecording=!1,n.ispause=!1,n.isplaying=!1,n}return o(e,t),e.prototype.setOption=function(t){void 0===t&&(t={}),this.setNewOption(t)},e.prototype.start=function(){return this.isrecording?Promise.reject():(this.isrecording=!0,this.startRecord())},e.prototype.pause=function(){this.isrecording&&!this.ispause&&(this.ispause=!0,this.pauseRecord())},e.prototype.resume=function(){this.isrecording&&this.ispause&&(this.ispause=!1,this.resumeRecord())},e.prototype.stop=function(){this.isrecording=!1,this.ispause=!1,this.stopRecord()},e.prototype.play=function(){this.stop(),this.isplaying=!0,this.onplay(),s.default.addPlayEnd(this.onplayend),s.default.play(this.getWAV().buffer)},e.prototype.getPlayTime=function(){return s.default.getPlayTime()},e.prototype.pausePlay=function(){!this.isrecording&&this.isplaying&&(this.isplaying=!1,this.onpauseplay(),s.default.pausePlay())},e.prototype.resumePlay=function(){this.isrecording||this.isplaying||(this.isplaying=!0,this.onresumeplay(),s.default.resumePlay())},e.prototype.stopPlay=function(){this.isrecording||(this.isplaying=!1,this.onstopplay(),s.default.stopPlay())},e.prototype.destroy=function(){return s.default.stopPlay(),this.destroyRecord()},e.prototype.getRecordAnalyseData=function(){return this.getAnalyseData()},e.prototype.getPlayAnalyseData=function(){return s.default.getAnalyseData()},e.prototype.getPCM=function(){this.stop();var t=this.getData();return t=a.compress(t,this.inputSampleRate,this.outputSampleRate),a.encodePCM(t,this.oututSampleBits,this.littleEdian)},e.prototype.getPCMBlob=function(){return new Blob([this.getPCM()])},e.prototype.downloadPCM=function(t){void 0===t&&(t="recorder");var e=this.getPCMBlob();r.downloadPCM(e,t)},e.prototype.getWAV=function(){var t=this.getPCM();return a.encodeWAV(t,this.inputSampleRate,this.outputSampleRate,this.config.numChannels,this.oututSampleBits,this.littleEdian)},e.prototype.getWAVBlob=function(){return new Blob([this.getWAV()],{type:"audio/wav"})},e.prototype.downloadWAV=function(t){void 0===t&&(t="recorder");var e=this.getWAVBlob();r.downloadWAV(e,t)},e}(n(5).default);e.default=u},function(t,e,n){"use strict";function i(t,e,n){var i=document.createElement("a");i.href=window.URL.createObjectURL(t),i.download=e+"."+n,i.click()}Object.defineProperty(e,"__esModule",{value:!0}),e.downloadWAV=function(t,e){void 0===e&&(e="recorder"),i(t,e,"wav")},e.downloadPCM=function(t,e){void 0===e&&(e="recorder"),i(t,e,"pcm")}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(4),o=null,r=0,a=0,s=null,u=null,c=null,l=!1,p=0,f=function(){};function d(){return l=!1,s.decodeAudioData(c.slice(0),function(t){(o=s.createBufferSource()).onended=function(){l||(p=s.currentTime-a+r,f())},o.buffer=t,o.connect(u),u.connect(s.destination),o.start(0,r),a=s.currentTime},function(t){i.throwError(t)})}var h=function(){function t(){}return t.play=function(t){return s||(s=new(window.AudioContext||window.webkitAudioContext),(u=s.createAnalyser()).fftSize=2048),this.stopPlay(),c=t,p=0,d()},t.pausePlay=function(){o&&o.disconnect(),r+=s.currentTime-a,l=!0},t.resumePlay=function(){return d()},t.stopPlay=function(){r=0,c=null,o&&o.stop()},t.getAnalyseData=function(){var t=new Uint8Array(u.frequencyBinCount);return u.getByteTimeDomainData(t),t},t.addPlayEnd=function(t){void 0===t&&(t=function(){}),f=t},t.getPlayTime=function(){var t=l?r:s.currentTime-a+r;return p||t},t}();e.default=h},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.throwError=function(t){throw new Error(t)}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(0),o=function(){function t(t){void 0===t&&(t={}),this.size=0,this.lBuffer=[],this.rBuffer=[],this.tempPCM=[],this.inputSampleBits=16,this.fileSize=0,this.duration=0;var e,n=new(window.AudioContext||window.webkitAudioContext);this.inputSampleRate=n.sampleRate,this.setNewOption(t),this.littleEdian=(e=new ArrayBuffer(2),new DataView(e).setInt16(0,256,!0),256===new Int16Array(e)[0]),this.initUserMedia()}return t.prototype.setNewOption=function(t){void 0===t&&(t={}),this.config={sampleBits:~[8,16].indexOf(t.sampleBits)?t.sampleBits:16,sampleRate:~[11025,16e3,22050,24e3,44100,48e3].indexOf(t.sampleRate)?t.sampleRate:this.inputSampleRate,numChannels:~[1,2].indexOf(t.numChannels)?t.numChannels:1},this.outputSampleRate=this.config.sampleRate,this.oututSampleBits=this.config.sampleBits},t.prototype.startRecord=function(){var t=this;return this.context&&this.destroyRecord(),this.initRecorder(),navigator.mediaDevices.getUserMedia({audio:!0}).then(function(e){t.audioInput=t.context.createMediaStreamSource(e),t.stream=e}).then(function(){t.audioInput.connect(t.analyser),t.analyser.connect(t.recorder),t.recorder.connect(t.context.destination)})},t.prototype.pauseRecord=function(){this.recorder.disconnect()},t.prototype.resumeRecord=function(){this.audioInput&&this.audioInput.connect(this.analyser),this.analyser.connect(this.recorder),this.recorder.connect(this.context.destination)},t.prototype.stopRecord=function(){this.audioInput&&this.audioInput.disconnect(),this.source&&this.source.stop(),this.recorder.disconnect()},t.prototype.destroyRecord=function(){return this.stopStream(),this.closeAudioContext()},t.prototype.getAnalyseData=function(){var t=new Uint8Array(this.analyser.frequencyBinCount);return this.analyser.getByteTimeDomainData(t),t},t.prototype.getData=function(){return this.flat()},t.prototype.clearRecordStatus=function(){this.lBuffer.length=0,this.rBuffer.length=0,this.size=0,this.fileSize=0,this.PCM=null,this.audioInput=null,this.duration=0},t.prototype.flat=function(){var t=null,e=new Float32Array(0);1===this.config.numChannels?t=new Float32Array(this.size):(t=new Float32Array(this.size/2),e=new Float32Array(this.size/2));for(var n=0,i=0;i<this.lBuffer.length;i++)t.set(this.lBuffer[i],n),n+=this.lBuffer[i].length;n=0;for(i=0;i<this.rBuffer.length;i++)e.set(this.rBuffer[i],n),n+=this.rBuffer[i].length;return{left:t,right:e}},t.prototype.initRecorder=function(){var t=this;this.clearRecordStatus(),this.context=new(window.AudioContext||window.webkitAudioContext),this.analyser=this.context.createAnalyser(),this.analyser.fftSize=2048;var e=this.context.createScriptProcessor||this.context.createJavaScriptNode;this.recorder=e.apply(this.context,[4096,this.config.numChannels,this.config.numChannels]),this.recorder.onaudioprocess=function(e){var n,i=e.inputBuffer.getChannelData(0),o=null;t.lBuffer.push(new Float32Array(i)),t.size+=i.length,2===t.config.numChannels&&(o=e.inputBuffer.getChannelData(1),t.rBuffer.push(new Float32Array(o)),t.size+=o.length),t.fileSize=Math.floor(t.size/Math.max(t.inputSampleRate/t.outputSampleRate,1))*(t.oututSampleBits/8),n=100*Math.max.apply(Math,i),t.duration+=4096/t.inputSampleRate,t.onprocess&&t.onprocess(t.duration),t.onprogress&&t.onprogress({duration:t.duration,fileSize:t.fileSize,vol:n})}},t.prototype.stopStream=function(){this.stream&&this.stream.getTracks&&(this.stream.getTracks().forEach(function(t){return t.stop()}),this.stream=null)},t.prototype.closeAudioContext=function(){return this.context.close&&"closed"!==this.context.state?this.context.close():new Promise(function(t){t()})},t.prototype.initUserMedia=function(){void 0===navigator.mediaDevices&&(navigator.mediaDevices={}),void 0===navigator.mediaDevices.getUserMedia&&(navigator.mediaDevices.getUserMedia=function(t){var e=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia;return e?new Promise(function(n,i){e.call(navigator,t,n,i)}):Promise.reject(new Error("浏览器不支持 getUserMedia !"))})},t.prototype.transformIntoPCM=function(t,e){var n=new Float32Array(t),o=new Float32Array(e),r=i.compress({left:n,right:o},this.inputSampleRate,this.outputSampleRate);return i.encodePCM(r,this.oututSampleBits,this.littleEdian)},t}();e.default=o}]).default});
//# sourceMappingURL=recorder.js.map
