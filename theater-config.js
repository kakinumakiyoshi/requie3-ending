// ============================================================
//  上映モードの設定ファイル
//  映像やBGMを本番用に差し替えるときは、media フォルダの同じ名前のファイルを
//  置き換えるか、下のパスを書き換えてください。
// ============================================================
window.THEATER_CONFIG = {
  // 映像ファイル（mp4推奨）
  videos: {
    op: "media/op.mp4",                       // オープニング（今は AE で仕上げる前の Blender の連番をまとめた仮）
    wait: "media/wait_loop.mp4",              // 待機：館と月、霧と窓の灯りがゆれる60秒ループ（OP の1コマ目と同じ絵）
    idle: "media/idle_loop.mp4",              // 待機・ゲーム中の背景（ループ再生）
    jonah_lights: "media/jonah_lights.mp4",   // ジョナEND：光の中の人影 → 館の窓が全部光る
    jonah_exit: "media/jonah_exit.mp4",       // ジョナEND：扉が開いて、館のあるじが外へ出てくる
    legion_missile: "media/legion_missile.mp4", // レギオンEND：館の屋根にミサイル → 黒煙
    legion_moonlight: "media/legion_moonlight.mp4" // レギオンEND：地下の天井の穴から月明かり（外へ出られる＝助けが来た）
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
    // ジョナEND：電灯が灯る段落のあと／館のあるじが外へ出る段落のあと
    { seg: "^MAIN_A_JOHN_COOK_END$", at: "一斉に全ての電灯が灯り", video: "jonah_lights" },
    { seg: "^MAIN_A_JOHN_COOK_END$", at: "1階のドアから悠々と外へ出て", video: "jonah_exit" },
    // レギオンEND：「ドォーン！」で屋上が爆発する段落のあと、ミサイル → 地下の天井の穴から月明かり（続けて流す）
    { seg: "^MAIN_B_", at: "ドォーン", video: "legion_missile" },
    { seg: "^MAIN_B_", at: "ドォーン", video: "legion_moonlight" }
  ],

  // 背景用の静止画（ゆっくり動かして表示します）
  images: {
    town: "media/town.jpg",                   // シチリアの海とマフィアの街（前の仮素材）
    title_wait: "media/title_wait.png",       // 待機画面の文字（REQUIEⅢ・開演まで しばらくお待ちください）を重ねる透明画像
    masks: "media/masks_table.jpg",           // キャラクター選択：円卓の上に7つのマスク（名前は出さない）
    p1_investigate: "media/p1_investigate.jpg", // 第1フェーズ 調査：2階の間取り＋大広間（不透明度35%）
    p1_discuss: "media/p1_discuss.jpg",       // 第1フェーズ 議論：大広間
    p2_investigate: "media/p2_investigate.jpg", // 第2フェーズ 調査：1階の間取り＋リビング（懐中電灯）
    p2_discuss: "media/p2_discuss.jpg",       // 第2フェーズ 議論：リビング（ランタン・暖炉・ろうそく）
    p3_discuss: "media/p3_discuss.jpg"        // 第3フェーズ：地下の円卓（緑のランタン）
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
  //   still: true … 背景を動かさない・暗くしない（作った背景はこれ） / overlay: 背景の上に重ねる images の名前
  //   timerPos: "right"＝右下（調査の間取り）／"top"＝上（第3フェーズ）／書かない＝真ん中
  scenes: [
    { type: "loop",   title: "開場・待機", bg: "wait", still: true, overlay: "title_wait", bgm: "idle" },
    // 1. オープニング
    { type: "video",  phase: "オープニング", title: "潜入", video: "op", autoNext: true },
    // 2. キャラクター選択・読み込み
    { type: "cast",   phase: "キャラクター選択", title: "配役発表", bgm: "idle" },
    { type: "timer",  phase: "キャラクター選択", title: "読み込み", minutes: 15, bg: "masks", still: true, timerPos: "right", bgm: "idle" },
    // 3. ルール説明
    { type: "loop",   title: "ルール説明", bg: "wait", still: true, bgm: "idle", showTitle: true },
    // 4. 第1フェーズ（2階）
    { type: "loop",   phase: "第1フェーズ", title: "イベント", bg: "p1_discuss", still: true, bgm: "idle", showTitle: true },
    { type: "timer",  phase: "第1フェーズ", title: "調査", minutes: 5,  bg: "p1_investigate", still: true, timerPos: "right", bgm: "idle" },
    { type: "timer",  phase: "第1フェーズ", title: "議論", minutes: 20, bg: "p1_discuss", still: true, bgm: "idle" },
    { type: "timer",  phase: "第1フェーズ", title: "告解", minutes: 5,  bg: "p1_discuss", still: true, bgm: "idle" },
    // 5. 第2フェーズ（1階）
    { type: "loop",   phase: "第2フェーズ", title: "イベント", bg: "p2_discuss", still: true, bgm: "idle", showTitle: true },
    { type: "timer",  phase: "第2フェーズ", title: "調査", minutes: 5,  bg: "p2_investigate", still: true, timerPos: "right", bgm: "idle" },
    { type: "timer",  phase: "第2フェーズ", title: "議論", minutes: 20, bg: "p2_discuss", still: true, bgm: "idle" },
    { type: "timer",  phase: "第2フェーズ", title: "告解", minutes: 5,  bg: "p2_discuss", still: true, bgm: "idle" },
    // 6. 第3フェーズ（地下）
    { type: "timer",  phase: "第3フェーズ", title: "イベント・休憩", minutes: 10, bg: "p3_discuss", still: true, timerPos: "top", bgm: "idle" },
    { type: "timer",  phase: "第3フェーズ", title: "調査＆最終議論", minutes: 30, bg: "p3_discuss", still: true, timerPos: "top", bgm: "idle" },
    // 7. クライマックスフェーズ
    { type: "loop",   title: "クライマックスフェーズ", bg: "p3_discuss", still: true, bgm: "idle", showTitle: true },
    // 8. エンディング
    { type: "ending", title: "エンディング" }
  ],


  stillBrightness: 1.35, // 作った背景（still: true の場面）の明るさ。1＝そのまま、大きいほど明るい
  speed: 14 // 1秒あたりに出る文字数（コントロール画面で変更できます）
};
