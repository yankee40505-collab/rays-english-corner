# 魏武之路 · HD-2D 改版進度（交接文件）

> 給下一個 session 接手用。讀完這份就能無縫繼續。
> 分支：`claude/battle-system-flow-7mccqf`　·　PR：[#8](https://github.com/yankee40505-collab/rays-english-corner/pull/8)
> 最後更新：2026-08-25

---

## 一、目標（使用者要什麼）

把現有的三國英語教學遊戲 `weiwu-2drpg.html` **大改「畫面風格」**：
- 保留三國主題（曹操・陳留起兵）與現有玩法（學堂上課／招募／考場／練兵）。
- 從**像素風**升級成 **HD-2D 手繪立體感城鎮**：角色在手繪城鎮中**走動**，走到建築可進入，觸發原本的教學流程。
- 使用者明確要「3D 大作、角色在城鎮走動」的感覺；**不要卡片形式**呈現走動角色（卡片只當美術參考／之後戰鬥敵人用）。
- 規則機制（回合制戰鬥、連擊、答錯懲罰）**不是這次重點**，這次先做視覺與走動城鎮。

### 技術方案結論
真 3D（WebGL/Three.js）成本太高、不適合這個教學單檔。改採 **HD-2D／手繪立體**：
手繪背景當場景 + 去背角色立繪走動 + 影子 + 景深平移／天空視差 + 地點穿梭（crossfade）。

---

## 二、美術素材（已在 repo `images/`，語意化命名）

使用者用 ChatGPT 產圖、上傳到 GitHub，已整理歸位並 commit：

### 角色卡（金框英雄卡，1086×1448，戰鬥／敵人用，**非走動用**）
| 檔名 | 內容 |
|---|---|
| `card-caocao.png` | 曹操 Cao Cao（Legendary Hero） |
| `card-xunyu.png` | 荀彧 Xun Yu（Strategist） |
| `card-zhangjiao.png` | 張角 天公將軍（敵方頭目） |
| `card-zhangbao.png` | 張寶 地公將軍 |
| `card-zhangliang.png` | 張梁 人公將軍 |
| `card-huangjin-lishi.png` | 黃巾力士 狂戰先鋒 |
| `card-huangjin-shushi.png` | 黃巾術士 符咒妖道 |
| `card-huangjin-soldier.png` | 黃巾軍士兵 Yellow Turban Soldier |
| `card-huangjin-archer.png` | 黃巾軍弓兵 Yellow Turban Archer |

### 主角走動立繪（**透明去背**，走動用）
| 檔名 | 內容 |
|---|---|
| `player-caocao.png` | 曹操全身站姿，透明背景，面向鏡頭（黑金藍甲）。目前走動系統的玩家角色。 |

### NPC 全身立繪（1086×1448，**站在村子背景裡、未去背**）
| 檔名 | 內容 |
|---|---|
| `npc-scholar.png` | 書生／少年（持竹簡書） |
| `npc-farmer.png` | 農夫（鋤頭＋稻束） |
| `npc-herbwoman.png` | 藥販婦人（藥草籃） |
| `npc-elder.png` | 老者（杖＋竹簡） |

### 場景背景（1448×1086）
| 檔名 | 內容 |
|---|---|
| `bg-inn.png` | 客棧／街心（完整街景：二層樓、紅燈籠、桌客、馬廄、村民）→ 城鎮主場景 |
| `bg-academy.png` | 學堂（書桌、掛軸、告示牌、長凳） |
| `bg-training.png` | 練兵場（兵器架、鼓、箭靶、旗） |
| `bg-apothecary.png` | 藥鋪（白底去背；掛藥草、藥罐、石臼）**原型尚未使用** |

---

## 三、已完成

1. **素材整理**：18 張（去 1 張重複荀彧卡）→ 語意化命名，commit `b183205`。
2. **主角去背立繪** `player-caocao.png`，commit `fd17606`。
3. **HD-2D 走動城鎮原型** → `weiwu-townscape-proto.html`（在 repo 根目錄，引用 `images/`）。
   - 三地點穿梭：練兵場 ◀ 陳留街心 ▶ 學堂（crossfade）。
   - 曹操立繪走動：走路上下微晃 bob、橢圓影子、背景景深平移、天空視差。
   - 建築中間按 Enter「進入」→ 彈出面板（目前是說明佔位，之後接真流程）。
   - 操作：鍵盤 ◀▶ 或 A/D 走；Enter／空白鍵 進入或前往鄰近地點；也有畫面下方按鈕。
   - **注意**：這是原型，非正式遊戲；尚未接回 `weiwu-2drpg.html` 的存檔／資源／任務系統。

### 原型怎麼看
直接用瀏覽器開 `weiwu-townscape-proto.html`（需能讀到同層 `images/`；若本機直接雙開檔案圖不出來，用簡易伺服器：`python3 -m http.server` 後開 `http://localhost:8000/weiwu-townscape-proto.html`）。

---

## 四、待辦（下一步）

**使用者最後停在這裡：要求先做這份進度 md，準備換新視窗繼續。**
上一則我問他：原型手感 OK 就「正式接進遊戲」，還是「原型再調」。**尚未回覆，接手時先問他要哪個。**

### 主線待辦
1. **接進正式遊戲**：把 `weiwu-2drpg.html` 的像素 overworld 換成本原型的手繪走動城鎮。
   - 現有 scene：`chenliu` / `academy`（見檔案 `SCENES`、`scene` 變數、`/* ── 移動 ── */`、`/* ── 繪製 ── */` 區塊）。
   - 建築入口接回既有函式：學堂 `openAcademyMenu()`、練兵 `openTraining()`、考場 `openExamIntro()`、招募 `talkDun()/startRecruit()`。
   - **務必保留**：存檔（`makeSaveData`/`NEW_STATE`/slots）、資源（gold/food/army/exp）、主線任務（`questState()`）、城門過關（`openGate()`）。
2. **NPC 上街**：把 4 張 NPC 立繪去背後擺到街上當可對話村民（需要去背——目前它們有村子背景。可請使用者出去背版，或程式去背）。
3. **戰鬥系統**（之前討論過、未做）：回合制、選招式→出題→判定→血量。金框角色卡正好當戰鬥中敵我頭像。設計要點見下。

### 還缺的美術（要請使用者生）
- NPC 去背站姿（書生／農夫／老者／藥販）→ 街上村民。
- （可選）曹操**側面走路**立繪 → 走動更自然（目前只有正面站姿，走動用翻轉代替）。
- （可選）更多場景／城門／地圖。

### 之前談定的戰鬥設計原則（供實作參考）
- 現有遊戲哲學是「**答錯零懲罰**」（學堂／練兵／招募都不扣）。戰鬥首次引入「答錯→扣血」要小心。
- 建議：血量對應大數值（如 `army` 兵力）、單題傷害佔比小；**連擊加倍傷害、答錯只歸零連擊不重罰**；答錯**立刻給解析**（沿用 `quizBlock` 的 `.why`）。
- 失敗補救：不要 Game Over 重來，改「救場題」或「敗北轉練習＋推薦回學堂」。

---

## 五、環境與注意事項

- **Git**：開發分支 `claude/battle-system-flow-7mccqf`，PR #8 已開，往這分支推 commit 會自動更新 PR。**不要另開 PR**。
- **GitHub 寫入權限**：一度 403（Claude App 對 `yankee40505-collab` 沒 write），使用者已授權，現在可 push。
- **檔案很大**：`weiwu-2drpg.html` 約 3124 行、單檔 500KB+。用 offset/limit 讀，別整檔讀。
  - 有幾行是超長 minified 行（約 L2707–2712，音效/資料），grep 時會噴大量雜訊，記得排除。
- **圖片工具**：容器無 imagemagick；`pip install Pillow` 後用 PIL 處理（縮圖／去背／base64 嵌入）。
- **給使用者看預覽**：原型用 SendUserFile（display:render）送；因 render 環境不一定能讀相對路徑的圖，**預覽版要把圖 base64 內嵌**（repo 版則用相對路徑即可）。內嵌版做法：Pillow 縮圖→base64 data URI→塞進 HTML。
- **使用者語言**：全程用**繁體中文**溝通。使用者是英語老師（非工程背景），說明要白話、給明確步驟。

---

## 六、關鍵檔案地圖

| 檔案 | 用途 |
|---|---|
| `weiwu-2drpg.html` | 正式遊戲（要改的主目標） |
| `weiwu-townscape-proto.html` | HD-2D 走動城鎮原型（新，引用 images/） |
| `weiwu-hd2d-progress.md` | 本文件 |
| `images/card-*.png` | 角色／敵人金框卡 |
| `images/player-caocao.png` | 主角走動立繪（去背） |
| `images/npc-*.png` | NPC 立繪（未去背） |
| `images/bg-*.png` | 場景背景 |
