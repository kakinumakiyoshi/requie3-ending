// ============================================================
//  上映モードの設定ファイル
//  映像やBGMを本番用に差し替えるときは、media フォルダの同じ名前のファイルを
//  置き換えるか、下のパスを書き換えてください。
// ============================================================
window.THEATER_CONFIG = {
  // 映像ファイル（mp4推奨）
  videos: {
    op: "media/op.mp4",                       // オープニング
    idle: "media/idle_loop.mp4",              // 待機・ゲーム中の背景（ループ再生）
    jonah_lights: "media/jonah_lights.mp4",   // ジョナEND：館に明かりが灯る
    legion_missile: "media/legion_missile.mp4" // レギオンEND：館にミサイル
  },

  // BGMファイル（mp3推奨・ループ再生）
  bgm: {
    idle: "media/bgm_idle.mp3",         // 待機中
    ending: "media/bgm_ending.mp3",     // エンディング本編
    epilogue: "media/bgm_epilogue.mp3"  // エピローグ
  },

  // どの章でどのBGMを流すか（上から順に見て、最初に当てはまったもの）
  //   seg：章のIDにこの文字が含まれていたら当てはまる（"" はすべてに当てはまる）
  sceneBgm: [
    { seg: "EPILOGUE_", bgm: "epilogue" },
    { seg: "", bgm: "ending" }
  ],

  // 映像を流すタイミング
  //   seg   ：章のID（正規表現）
  //   at    ："start"＝章の最初 / "end"＝章の最後 / それ以外の文字＝その文字を含む段落が出た直後
  //   video ：上の videos の名前
  cues: [
    { seg: "^MAIN_A_JOHN_COOK_END$", at: "一斉に全ての電灯が灯り", video: "jonah_lights" },
    { seg: "^MAIN_B_.*（その後）$", at: "start", video: "legion_missile" }
  ],

  // 背景用の静止画（ゆっくり動かして表示します）
  images: {
    town: "media/town.jpg"                    // シチリアの海とマフィアの街
  },

  // 効果音
  sounds: {
    timeUp: "media/chime.mp3"                 // タイマーが0になったとき
  },

  // 配役発表に出すキャラクター（この順番で1人ずつ出ます）
  characters: [
    { id: "luca",   name: "ルカ",     image: "media/chara_luca.jpg" },
    { id: "carlo",  name: "カルロ",   image: "media/chara_carlo.jpg" },
    { id: "dante",  name: "ダンテ",   image: "media/chara_dante.jpg" },
    { id: "bianca", name: "ビアンカ", image: "media/chara_bianca.jpg" },
    { id: "jonah",  name: "ジョナ",   image: "media/chara_jonah.jpg" },
    { id: "lucia",  name: "ルチア",   image: "media/chara_lucia.jpg" },
    { id: "biagio", name: "ビアージョ", image: "media/chara_biagio.jpg" }
  ],

  // ===== 進行表：上から順にモニターに流れます（コントロールの「次へ」で進む） =====
  //   type: "loop"   … 背景を流しっぱなし（bg に images か videos の名前）
  //         "cast"   … 配役発表（キャラ画像＋プレイヤー名）
  //         "video"  … 映像を1本流す（autoNext: true なら終わったら自動で次へ）
  //         "timer"  … 背景＋タイマー（minutes で時間）
  //         "ending" … エンディング（判定結果に合わせて上映）
  //   phase: フェーズ名（タイマーの上に小さく出ます） / showTitle: true で背景の上にシーン名を大きく出す
  scenes: [
    { type: "loop",   title: "開場・待機", bg: "idle", bgm: "idle" },
    // 1. オープニング
    { type: "video",  phase: "オープニング", title: "潜入", video: "op", autoNext: true },
    // 2. キャラクター選択・読み込み
    { type: "cast",   phase: "キャラクター選択", title: "配役発表", bgm: "idle" },
    { type: "timer",  phase: "キャラクター選択", title: "読み込み", minutes: 15, bg: "town", bgm: "idle" },
    // 3. ルール説明
    { type: "loop",   title: "ルール説明", bg: "town", bgm: "idle", showTitle: true },
    // 4. 第1フェーズ
    { type: "loop",   phase: "第1フェーズ", title: "イベント", bg: "town", bgm: "idle", showTitle: true },
    { type: "timer",  phase: "第1フェーズ", title: "捜査", minutes: 5,  bg: "town", bgm: "idle" },
    { type: "timer",  phase: "第1フェーズ", title: "議論", minutes: 20, bg: "town", bgm: "idle" },
    { type: "timer",  phase: "第1フェーズ", title: "告解", minutes: 5,  bg: "town", bgm: "idle" },
    // 5. 第2フェーズ
    { type: "loop",   phase: "第2フェーズ", title: "イベント", bg: "town", bgm: "idle", showTitle: true },
    { type: "timer",  phase: "第2フェーズ", title: "捜査", minutes: 5,  bg: "town", bgm: "idle" },
    { type: "timer",  phase: "第2フェーズ", title: "議論", minutes: 20, bg: "town", bgm: "idle" },
    { type: "timer",  phase: "第2フェーズ", title: "告解", minutes: 5,  bg: "town", bgm: "idle" },
    // 6. 第3フェーズ
    { type: "timer",  phase: "第3フェーズ", title: "イベント・休憩", minutes: 10, bg: "town", bgm: "idle" },
    { type: "timer",  phase: "第3フェーズ", title: "調査＆最終議論", minutes: 30, bg: "town", bgm: "idle" },
    // 7. クライマックスフェーズ
    { type: "loop",   title: "クライマックスフェーズ", bg: "town", bgm: "idle", showTitle: true },
    // 8. エンディング
    { type: "ending", title: "エンディング" }
  ],

  speed: 14 // 1秒あたりに出る文字数（コントロール画面で変更できます）
};
