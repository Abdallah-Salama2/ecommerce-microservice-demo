globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"ae-hLVBrSrDdpIw3Xl0dJPRkupPepQ\"",
		"mtime": "2026-08-24T19:51:52.962Z",
		"size": 174,
		"path": "../public/robots.txt"
	},
	"/assets/admin-5ZsABp33.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-3VWDo9rIcHMkjMiBLTIK7CT/lxA\"",
		"mtime": "2026-08-25T20:42:22.261Z",
		"size": 154,
		"path": "../public/assets/admin-5ZsABp33.js"
	},
	"/assets/admin._authenticated-C-rIUnIK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f2-vOmgAchMVQHs3w9j6hyz5iXv+Cg\"",
		"mtime": "2026-08-25T20:42:22.263Z",
		"size": 4850,
		"path": "../public/assets/admin._authenticated-C-rIUnIK.js"
	},
	"/assets/admin._authenticated.customers-spIunMAc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5e7-KL9Qye+HK1eTDVIsAkZx+IIGT8U\"",
		"mtime": "2026-08-25T20:42:22.270Z",
		"size": 1511,
		"path": "../public/assets/admin._authenticated.customers-spIunMAc.js"
	},
	"/assets/admin.login-DtZX9B5W.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fae-vseGEHUOyvKzMD0S84rLm7qsBis\"",
		"mtime": "2026-08-25T20:42:22.309Z",
		"size": 4014,
		"path": "../public/assets/admin.login-DtZX9B5W.js"
	},
	"/assets/admin._authenticated.categories-DwqFbjdS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23ce-CdseP1SreOoyY0Y37FeNVdGMg9Y\"",
		"mtime": "2026-08-25T20:42:22.266Z",
		"size": 9166,
		"path": "../public/assets/admin._authenticated.categories-DwqFbjdS.js"
	},
	"/assets/admin._authenticated.orders-Dw1NIQ04.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b79-pdw2lFUtYkMot2wjIMBwwVhfbgE\"",
		"mtime": "2026-08-25T20:42:22.278Z",
		"size": 7033,
		"path": "../public/assets/admin._authenticated.orders-Dw1NIQ04.js"
	},
	"/assets/admin._authenticated.orders._id-DP01q5CH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2839-i+421IZDOLOb60f3xQMdzBtBlhQ\"",
		"mtime": "2026-08-25T20:42:22.281Z",
		"size": 10297,
		"path": "../public/assets/admin._authenticated.orders._id-DP01q5CH.js"
	},
	"/assets/admin._authenticated.index-ctoiRqqc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d64-+6EmYO/3q+LoNPLiMNN/pC4NhvU\"",
		"mtime": "2026-08-25T20:42:22.274Z",
		"size": 7524,
		"path": "../public/assets/admin._authenticated.index-ctoiRqqc.js"
	},
	"/assets/admin._authenticated.products.index-RcDjNHpV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ec6-j00pEUd13vSLq5HT8aT7WmoIzws\"",
		"mtime": "2026-08-25T20:42:22.297Z",
		"size": 7878,
		"path": "../public/assets/admin._authenticated.products.index-RcDjNHpV.js"
	},
	"/assets/admin._authenticated.products-5ZsABp33.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-3VWDo9rIcHMkjMiBLTIK7CT/lxA\"",
		"mtime": "2026-08-25T20:42:22.285Z",
		"size": 154,
		"path": "../public/assets/admin._authenticated.products-5ZsABp33.js"
	},
	"/assets/admin._authenticated.products.new-BndUlYv4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"189e-q2opiDbo1aCmD2pUAiaUSk2L0CA\"",
		"mtime": "2026-08-25T20:42:22.301Z",
		"size": 6302,
		"path": "../public/assets/admin._authenticated.products.new-BndUlYv4.js"
	},
	"/assets/admin._authenticated.products._id.edit-CI5z7dwt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28fe-grBc8Svpnt88YZS8qvdvL5uyQ5s\"",
		"mtime": "2026-08-25T20:42:22.286Z",
		"size": 10494,
		"path": "../public/assets/admin._authenticated.products._id.edit-CI5z7dwt.js"
	},
	"/assets/admin._authenticated.products._slug.edit-CoFp-1iu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28f2-1qH+aO9aOVRHzXTUssCGF178kFw\"",
		"mtime": "2026-08-25T20:42:22.293Z",
		"size": 10482,
		"path": "../public/assets/admin._authenticated.products._slug.edit-CoFp-1iu.js"
	},
	"/assets/admin._authenticated.settings-snj1pGtY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5f3-IBMf85I0yS4lXcaYbYvdeB0Aexg\"",
		"mtime": "2026-08-25T20:42:22.305Z",
		"size": 1523,
		"path": "../public/assets/admin._authenticated.settings-snj1pGtY.js"
	},
	"/assets/badge-CZF1Z62Z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"446-+ug1APC1FsDkG3auUnR8Gykp8Ec\"",
		"mtime": "2026-08-25T20:42:22.312Z",
		"size": 1094,
		"path": "../public/assets/badge-CZF1Z62Z.js"
	},
	"/assets/button-T_WNUjWa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10eb-ocludfhwaQMdvIS62/UfLyjwclw\"",
		"mtime": "2026-08-25T20:42:22.317Z",
		"size": 4331,
		"path": "../public/assets/button-T_WNUjWa.js"
	},
	"/assets/card-CP3YPohy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"41c-RnNQiUfxULjCY0bNKMRFp0xGu8E\"",
		"mtime": "2026-08-25T20:42:22.320Z",
		"size": 1052,
		"path": "../public/assets/card-CP3YPohy.js"
	},
	"/assets/chevron-left-DRqxBXhO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-EtqFzVb0Sr/lXz/iUYRU2gxNFfI\"",
		"mtime": "2026-08-25T20:42:22.325Z",
		"size": 130,
		"path": "../public/assets/chevron-left-DRqxBXhO.js"
	},
	"/assets/chevron-right-CiB0sxbF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-H4rcRj/AfetaNcGyATp2RahZK8g\"",
		"mtime": "2026-08-25T20:42:22.326Z",
		"size": 130,
		"path": "../public/assets/chevron-right-CiB0sxbF.js"
	},
	"/assets/clock-CBB2sXtE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-AmXsTjNDAW0JFq9iXFcHcyRrTi0\"",
		"mtime": "2026-08-25T20:42:22.327Z",
		"size": 169,
		"path": "../public/assets/clock-CBB2sXtE.js"
	},
	"/assets/createLucideIcon-CEGepnBf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ab-9w7034WUPiHI10TPGK6P975saJ0\"",
		"mtime": "2026-08-25T20:42:22.334Z",
		"size": 1195,
		"path": "../public/assets/createLucideIcon-CEGepnBf.js"
	},
	"/assets/content-card-Dq9Ap9s5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b4-ST52rdhnfGZ92cDRwaJopPljVkU\"",
		"mtime": "2026-08-25T20:42:22.329Z",
		"size": 692,
		"path": "../public/assets/content-card-Dq9Ap9s5.js"
	},
	"/assets/dist-CZKa7ujC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"281-dWmGaC5xCDzn/v7UumBLJuMvluo\"",
		"mtime": "2026-08-25T20:42:22.338Z",
		"size": 641,
		"path": "../public/assets/dist-CZKa7ujC.js"
	},
	"/assets/dist-FnkxFnIm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e98-jkbueOjNX5ujHNQAUtGffU0JhOc\"",
		"mtime": "2026-08-25T20:42:22.343Z",
		"size": 7832,
		"path": "../public/assets/dist-FnkxFnIm.js"
	},
	"/assets/eye-CVjNKSD9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-Y15rbr1yf39dFSuFKA9LMlDamew\"",
		"mtime": "2026-08-25T20:42:22.347Z",
		"size": 256,
		"path": "../public/assets/eye-CVjNKSD9.js"
	},
	"/assets/eye-off-B25l5zcw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ae-80Xv0IXSEFyVyJ2hM0VA/3gbMyw\"",
		"mtime": "2026-08-25T20:42:22.349Z",
		"size": 430,
		"path": "../public/assets/eye-off-B25l5zcw.js"
	},
	"/assets/field-C3Mg-GHg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"482-mvhN2Md4VrELM6ilm2BWE7C+a/0\"",
		"mtime": "2026-08-25T20:42:22.350Z",
		"size": 1154,
		"path": "../public/assets/field-C3Mg-GHg.js"
	},
	"/assets/folder-tree-Co1zOdob.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1df-ZCQ/WOFJ6Ka4HOGRBhjdXC+fYV8\"",
		"mtime": "2026-08-25T20:42:22.354Z",
		"size": 479,
		"path": "../public/assets/folder-tree-Co1zOdob.js"
	},
	"/assets/heart-Dr04W9tl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"102-FTVguFHh1ddBrRAyh7TEDEtlmcM\"",
		"mtime": "2026-08-25T20:42:22.355Z",
		"size": 258,
		"path": "../public/assets/heart-Dr04W9tl.js"
	},
	"/assets/hero-C8oi5OaW.jpg": {
		"type": "image/jpeg",
		"etag": "\"f75b-NbFUozV5G1xpyjbsIZIi5Rj2JSI\"",
		"mtime": "2026-08-25T20:42:22.426Z",
		"size": 63323,
		"path": "../public/assets/hero-C8oi5OaW.jpg"
	},
	"/assets/jsx-runtime-Cltr0gcK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20ee-ObwGPj96dlkL76iVLbX2wLAXzuw\"",
		"mtime": "2026-08-25T20:42:22.356Z",
		"size": 8430,
		"path": "../public/assets/jsx-runtime-Cltr0gcK.js"
	},
	"/assets/Match-C0VHaIY6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bddd-FGqNTNyMjL8swoFwAs+4Ofra+qw\"",
		"mtime": "2026-08-25T20:42:22.172Z",
		"size": 48605,
		"path": "../public/assets/Match-C0VHaIY6.js"
	},
	"/assets/matchContext-qESg7g4D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29c-k8oj2CsjfOV0/evjJYp1TZ1TQww\"",
		"mtime": "2026-08-25T20:42:22.366Z",
		"size": 668,
		"path": "../public/assets/matchContext-qESg7g4D.js"
	},
	"/assets/link-DJgS9BZb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1120-yFQ8gvslyRLdhVgs4rkYTDfOGTQ\"",
		"mtime": "2026-08-25T20:42:22.361Z",
		"size": 4384,
		"path": "../public/assets/link-DJgS9BZb.js"
	},
	"/assets/package-BFdnWmXL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"174-aOv7uaI8EtaoAJbt961Mm6TNSow\"",
		"mtime": "2026-08-25T20:42:22.370Z",
		"size": 372,
		"path": "../public/assets/package-BFdnWmXL.js"
	},
	"/assets/plus-BMevohuW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14f-jBzawzQx3uInhu7iXp/ho44qKSk\"",
		"mtime": "2026-08-25T20:42:22.371Z",
		"size": 335,
		"path": "../public/assets/plus-BMevohuW.js"
	},
	"/assets/price-tag-BvSshM4q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"595-T7QetnP3NHJ9IOjPsq+obNnfn08\"",
		"mtime": "2026-08-25T20:42:22.373Z",
		"size": 1429,
		"path": "../public/assets/price-tag-BvSshM4q.js"
	},
	"/assets/protected-route-B9QXBHSx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21e-SkFEc2ScJbNkrHoZmhnIOzrC2Ws\"",
		"mtime": "2026-08-25T20:42:22.380Z",
		"size": 542,
		"path": "../public/assets/protected-route-B9QXBHSx.js"
	},
	"/assets/react-dom-B-pPXn5B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dda-JJCAW1qCTm6YAIvIVKIVaZC3lTg\"",
		"mtime": "2026-08-25T20:42:22.382Z",
		"size": 3546,
		"path": "../public/assets/react-dom-B-pPXn5B.js"
	},
	"/assets/search-B10CUpjR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-3DqTlc8U1f/UJVNuEwVGPSFg+Zw\"",
		"mtime": "2026-08-25T20:42:22.386Z",
		"size": 174,
		"path": "../public/assets/search-B10CUpjR.js"
	},
	"/assets/product-card-BS8GkY-T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"104d-WzlN4y/KqJ6yRPvwjhi6f7u3UeY\"",
		"mtime": "2026-08-25T20:42:22.378Z",
		"size": 4173,
		"path": "../public/assets/product-card-BS8GkY-T.js"
	},
	"/assets/settings-BsoJLd_R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e7-JlxgQ9QRjwEV4qOxLkwICKIsW7k\"",
		"mtime": "2026-08-25T20:42:22.390Z",
		"size": 487,
		"path": "../public/assets/settings-BsoJLd_R.js"
	},
	"/assets/section-BQ6SFejq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2ea-LizHcEOGe8hJfNqMl4lOvq0xeL8\"",
		"mtime": "2026-08-25T20:42:22.387Z",
		"size": 746,
		"path": "../public/assets/section-BQ6SFejq.js"
	},
	"/assets/shopping-cart-6snUewls.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"124-s5C0SziO54d5h383/SrhZE6SAhc\"",
		"mtime": "2026-08-25T20:42:22.394Z",
		"size": 292,
		"path": "../public/assets/shopping-cart-6snUewls.js"
	},
	"/assets/index-E12XfZso.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64cc3-RyhA9DGdbDTNmmS5W7I9L7ERdus\"",
		"mtime": "2026-08-25T20:42:22.167Z",
		"size": 412867,
		"path": "../public/assets/index-E12XfZso.js"
	},
	"/assets/stock-badge-5Yze7GHM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b3-pvZqRtzs9jZTCO0P4ia751DY5EI\"",
		"mtime": "2026-08-25T20:42:22.399Z",
		"size": 435,
		"path": "../public/assets/stock-badge-5Yze7GHM.js"
	},
	"/assets/shield-check-DxYS0T48.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"140-mSKGKjS6ZEizPZ2/XyesCaU2bI8\"",
		"mtime": "2026-08-25T20:42:22.393Z",
		"size": 320,
		"path": "../public/assets/shield-check-DxYS0T48.js"
	},
	"/assets/skeletons-DzoDDDKy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f3a-UNHLW6R22QxeTudIW1raDR+Cyjg\"",
		"mtime": "2026-08-25T20:42:22.395Z",
		"size": 3898,
		"path": "../public/assets/skeletons-DzoDDDKy.js"
	},
	"/assets/styles-vRToi67Y.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"17765-SKIPbFWWSdTYGNcEoiBM1Y/QtHA\"",
		"mtime": "2026-08-25T20:42:22.430Z",
		"size": 96101,
		"path": "../public/assets/styles-vRToi67Y.css"
	},
	"/assets/sun-CqmDmBx9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44d-c/AbfXbOK3TvfW/AX9e2+suRvOU\"",
		"mtime": "2026-08-25T20:42:22.400Z",
		"size": 1101,
		"path": "../public/assets/sun-CqmDmBx9.js"
	},
	"/assets/trash-2-BsJixwp9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"148-kz7k3BKHD1cOy6m7tt2hHFqSaeo\"",
		"mtime": "2026-08-25T20:42:22.404Z",
		"size": 328,
		"path": "../public/assets/trash-2-BsJixwp9.js"
	},
	"/assets/types-BZ_LtlRG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c5-FCZIQYDzl+PkkPN8Et7BRIuuZUs\"",
		"mtime": "2026-08-25T20:42:22.406Z",
		"size": 453,
		"path": "../public/assets/types-BZ_LtlRG.js"
	},
	"/assets/triangle-alert-Dp-47cjm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-aPTfi9+vAUzDeaS53dO2P5cMCfw\"",
		"mtime": "2026-08-25T20:42:22.405Z",
		"size": 265,
		"path": "../public/assets/triangle-alert-Dp-47cjm.js"
	},
	"/assets/upload-Cs-PGo9_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"469-odXXqodwMTq9gRUhzRTOyp+0YQQ\"",
		"mtime": "2026-08-25T20:42:22.408Z",
		"size": 1129,
		"path": "../public/assets/upload-Cs-PGo9_.js"
	},
	"/assets/use-api-Cui2tURT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3aa2-hPn9hKGFLlCd5QWP83Fi2j+MQ00\"",
		"mtime": "2026-08-25T20:42:22.412Z",
		"size": 15010,
		"path": "../public/assets/use-api-Cui2tURT.js"
	},
	"/assets/user-dmWph8jC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-msTozB54YMCdQI76vDh9PV7MCOI\"",
		"mtime": "2026-08-25T20:42:22.419Z",
		"size": 196,
		"path": "../public/assets/user-dmWph8jC.js"
	},
	"/assets/users-ByQQ79Dh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-D4tkZLwnv3uIaly6ENwmKRNmiAQ\"",
		"mtime": "2026-08-25T20:42:22.420Z",
		"size": 306,
		"path": "../public/assets/users-ByQQ79Dh.js"
	},
	"/assets/x-_CKTk_uH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-CuIL3t3oFedpuLZG2cTjjUn7Srw\"",
		"mtime": "2026-08-25T20:42:22.420Z",
		"size": 154,
		"path": "../public/assets/x-_CKTk_uH.js"
	},
	"/assets/_storefront-Bv2a2hmX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"94b6-0DpdNLY0WjkfKRe+al9qcvToVZY\"",
		"mtime": "2026-08-25T20:42:22.176Z",
		"size": 38070,
		"path": "../public/assets/_storefront-Bv2a2hmX.js"
	},
	"/assets/zod-DEM7Yz8V.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c7d-OjcfVwi7BHGjqBSvXo4S5hyZp10\"",
		"mtime": "2026-08-25T20:42:22.421Z",
		"size": 31869,
		"path": "../public/assets/zod-DEM7Yz8V.js"
	},
	"/assets/_storefront.about-z16Sieo-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5106-pJP1APLOJbF9rMuFc7HM8+Hh9HI\"",
		"mtime": "2026-08-25T20:42:22.181Z",
		"size": 20742,
		"path": "../public/assets/_storefront.about-z16Sieo-.js"
	},
	"/assets/_storefront.account.wishlist-Cw27I35X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bf5-QcO6P2rjMzPEVNWe2S7tIWlu8hI\"",
		"mtime": "2026-08-25T20:42:22.184Z",
		"size": 3061,
		"path": "../public/assets/_storefront.account.wishlist-Cw27I35X.js"
	},
	"/assets/_storefront.cart-C68m6sqd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1cc5-Dz4Tjb2DmtzVA/HCo00rLpwRTbY\"",
		"mtime": "2026-08-25T20:42:22.188Z",
		"size": 7365,
		"path": "../public/assets/_storefront.cart-C68m6sqd.js"
	},
	"/assets/_storefront.categories-Ck3wm_E5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dee-S3Zc4XOlWJrWQPJX6IcY1yE9TlQ\"",
		"mtime": "2026-08-25T20:42:22.193Z",
		"size": 3566,
		"path": "../public/assets/_storefront.categories-Ck3wm_E5.js"
	},
	"/assets/_storefront.category._slug-DmowcvRb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14a6-94K2Hak2GFo4MS564O9NPff4Sf0\"",
		"mtime": "2026-08-25T20:42:22.196Z",
		"size": 5286,
		"path": "../public/assets/_storefront.category._slug-DmowcvRb.js"
	},
	"/assets/_storefront.checkout-B4-UxJZ8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2feb-Ag0uP9SPyJaVzBqkW5i7vhgQ0IU\"",
		"mtime": "2026-08-25T20:42:22.200Z",
		"size": 12267,
		"path": "../public/assets/_storefront.checkout-B4-UxJZ8.js"
	},
	"/assets/_storefront.dashboard-oOtO9sOJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16a9-Q/LYXVyHixFDuGnPiJ2oJELKFBc\"",
		"mtime": "2026-08-25T20:42:22.205Z",
		"size": 5801,
		"path": "../public/assets/_storefront.dashboard-oOtO9sOJ.js"
	},
	"/assets/_storefront.forgot-password-BxifdwwR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6c8-R4MdvcJ38ftRrZzn3vr4y6YTMDk\"",
		"mtime": "2026-08-25T20:42:22.209Z",
		"size": 1736,
		"path": "../public/assets/_storefront.forgot-password-BxifdwwR.js"
	},
	"/assets/_storefront.index-g_3epaXS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"23e7-kExmOn6QgDw7Dezh0ZaxngyTshw\"",
		"mtime": "2026-08-25T20:42:22.213Z",
		"size": 9191,
		"path": "../public/assets/_storefront.index-g_3epaXS.js"
	},
	"/assets/_storefront.login-e7hOmvrO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bdc-nleKcBqQqkKdmlei0619ppulLMU\"",
		"mtime": "2026-08-25T20:42:22.217Z",
		"size": 3036,
		"path": "../public/assets/_storefront.login-e7hOmvrO.js"
	},
	"/assets/_storefront.order-confirmation._id-B-gzwvAr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16ae-58owzBPrRUyaCeXwzxUr+4bhgx0\"",
		"mtime": "2026-08-25T20:42:22.222Z",
		"size": 5806,
		"path": "../public/assets/_storefront.order-confirmation._id-B-gzwvAr.js"
	},
	"/assets/_storefront.product._slug-Dec4UlXY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a30-V7KCrWT1w0Bnq/zz+FZ2ymKlcQ8\"",
		"mtime": "2026-08-25T20:42:22.232Z",
		"size": 6704,
		"path": "../public/assets/_storefront.product._slug-Dec4UlXY.js"
	},
	"/assets/_storefront.privacy-C73uUEXS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15f7-doh1cX/Po4k2EcHiuYojdwicc5Q\"",
		"mtime": "2026-08-25T20:42:22.227Z",
		"size": 5623,
		"path": "../public/assets/_storefront.privacy-C73uUEXS.js"
	},
	"/assets/useStore-D-4ReuTk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4af0-rc3wtf3jY9TfJ/YAIbkp0ufikZo\"",
		"mtime": "2026-08-25T20:42:22.415Z",
		"size": 19184,
		"path": "../public/assets/useStore-D-4ReuTk.js"
	},
	"/assets/_storefront.register-CLs__jCC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bce-RviWR/Whsh7gUb6lm4cpqxUu5ow\"",
		"mtime": "2026-08-25T20:42:22.235Z",
		"size": 3022,
		"path": "../public/assets/_storefront.register-CLs__jCC.js"
	},
	"/assets/_storefront.reset-password-V1Jnv_UR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b0e-7xJuqtFGuczFTdEPP2Alzm+qQic\"",
		"mtime": "2026-08-25T20:42:22.239Z",
		"size": 2830,
		"path": "../public/assets/_storefront.reset-password-V1Jnv_UR.js"
	},
	"/assets/_storefront.returns-u7-llNwu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109c-XuusOVDO9V+xT48Ov4N3BQMnK10\"",
		"mtime": "2026-08-25T20:42:22.243Z",
		"size": 4252,
		"path": "../public/assets/_storefront.returns-u7-llNwu.js"
	},
	"/assets/_storefront.search-DuKmMuQl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec3-1ZhLFmKynnAlADcWhyWNzjnfofQ\"",
		"mtime": "2026-08-25T20:42:22.247Z",
		"size": 3779,
		"path": "../public/assets/_storefront.search-DuKmMuQl.js"
	},
	"/assets/_storefront.shop-DnsSQrcP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15bd-0/Wt3Xy0lEURlN/JFuU9WGDjqx0\"",
		"mtime": "2026-08-25T20:42:22.254Z",
		"size": 5565,
		"path": "../public/assets/_storefront.shop-DnsSQrcP.js"
	},
	"/assets/_storefront.shipping-policy-Bx3RgVNV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1156-yAlEzz7c7BJofxSY8F35MVUIkBQ\"",
		"mtime": "2026-08-25T20:42:22.250Z",
		"size": 4438,
		"path": "../public/assets/_storefront.shipping-policy-Bx3RgVNV.js"
	},
	"/assets/_storefront.terms-DTZY6WWl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1571-i206LToXnWw+i9KDgPKBcpGiVMg\"",
		"mtime": "2026-08-25T20:42:22.258Z",
		"size": 5489,
		"path": "../public/assets/_storefront.terms-DTZY6WWl.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_HoY4Oq = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_HoY4Oq
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
